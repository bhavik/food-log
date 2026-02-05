# FoodLog – per-user setup (Firebase + Supabase)

## 1. Environment variables

Create a `.env` file in the project root (it is gitignored). You need:

### Firebase (Auth)

From [Firebase Console](https://console.firebase.google.com/) → Project settings → General → Your apps:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=... (e.g. your-project.firebaseapp.com)
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

Enable **Google** (or Email) sign-in in Firebase → Authentication → Sign-in method.

### Supabase (database)

From [Supabase](https://supabase.com) → Project → Settings → API:

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=...
```

### Supabase JWT for Firebase (required for saving when signed in)

Supabase must accept your Firebase id token and treat the user as `authenticated`. Do both steps below.

#### Step A: Register Firebase in Supabase

1. Open **[Supabase Dashboard](https://supabase.com/dashboard)** → your project.
2. Go to **Authentication** → **Providers** (or **Auth** → **Third-party** in the left sidebar).
3. Find **Third-Party Auth** (or **Third-Party Providers**) and click **Add provider** / **Add integration**.
4. Select **Firebase**.
5. Enter your **Firebase Project ID** (same as `VITE_FIREBASE_PROJECT_ID` in `.env`).  
   Find it in [Firebase Console](https://console.firebase.google.com/) → Project settings → General.
6. Save.

Supabase will then accept JWTs issued by that Firebase project.

#### Step B: Add the `role: 'authenticated'` claim in Firebase

Supabase uses the JWT’s `role` claim to grant the Postgres `authenticated` role. Firebase id tokens don’t include `role` by default, so you must set it.

**Option 1 – One-time script (good for a few users or testing)**  
Run a script once to set the claim for all **existing** users. New users will need the same claim (run the script again later, or use Option 2).

1. In a **Node.js** project (or a new folder), install:  
   `npm install firebase-admin`
2. In Firebase Console → Project settings → **Service accounts** → **Generate new private key** (JSON). Save it securely (e.g. `firebase-service-account.json` in the script folder, and add it to `.gitignore`).
3. Create a file `set-role-claim.js`:

```js
'use strict';
const { initializeApp } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');

initializeApp({ credential: require('firebase-admin').credential.cert(require('./firebase-service-account.json')) });

async function setRoleClaim() {
  let nextPageToken;
  do {
    const { users, pageToken } = await getAuth().listUsers(1000, nextPageToken);
    nextPageToken = pageToken;
    for (const user of users) {
      try {
        await getAuth().setCustomUserClaims(user.uid, { role: 'authenticated' });
        console.log('Set role for', user.email || user.uid);
      } catch (e) {
        console.error('Failed for', user.uid, e.message);
      }
    }
  } while (nextPageToken);
  console.log('Done.');
}

setRoleClaim().then(() => process.exit(0));
```

4. Run: `node set-role-claim.js`
5. **Important:** Each user must sign out and sign in again (or refresh the id token) so their next token includes the new claim. In the app, sign out and sign in with Google again.

**Option 2 – Cloud Function for new users (recommended for production)**  
So every **new** user gets the claim automatically:

1. In your Firebase project, set up Cloud Functions (e.g. `firebase init functions`).
2. Add an **Auth blocking function** (requires [Identity Platform](https://cloud.google.com/identity-platform)) or an **onCreate** trigger that sets custom claims via the Admin SDK.  
   Example for **Identity Platform** blocking (Gen 2):

```js
import { beforeUserCreated, beforeUserSignedIn } from 'firebase-functions/v2/identity';

export const beforeCreated = beforeUserCreated((event) => ({
  customClaims: { role: 'authenticated' },
}));

export const beforeSignedIn = beforeUserSignedIn((event) => ({
  customClaims: { role: 'authenticated' },
}));
```

3. Deploy: `firebase deploy --only functions`
4. Run the one-time script from Option 1 for **existing** users.

After Step A and Step B, the app’s Firebase id token will be accepted by Supabase and `auth.jwt()->>'sub'` in your RLS policies will be the Firebase UID.

**Quick check:** Sign in with Google in the app, then log a food item. In Supabase → Table Editor → `food_logs`, you should see a new row with your Firebase UID in `user_id`. If inserts still fail, open the browser Console (F12) and look for Supabase errors; confirm the Firebase integration and role claim steps above.

## 2. Run the migration

Apply the tables and RLS in Supabase:

- **Supabase Dashboard:** SQL Editor → paste and run the contents of `supabase/migrations/20250203000000_food_logs.sql`.
- Or with Supabase CLI: `supabase db push` (from project root).

## 3. Behavior

- **Not signed in:** Logs and custom items are stored in **localStorage** (same as before).
- **Signed in:** Data is loaded from and saved to **Supabase** (food_logs + user_food_items). Header shows “Sign out”; you’ll see “Syncing…” once on load.
- Use **Sign in with Google** in the header to test. After sign-in, data is scoped to that user.
