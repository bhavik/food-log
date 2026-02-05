'use strict';

const admin = require('firebase-admin');
const path = require('path');

// Use the service account JSON in this folder (rename to service-account.json or set filename below)
const serviceAccountPath = path.join(__dirname, 'foodlog-44dff-firebase-adminsdk-fbsvc-9ec0c023b1.json');
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const auth = admin.auth();

async function setRoleClaim() {
  let nextPageToken;
  do {
    const listResult = await auth.listUsers(1000, nextPageToken);
    nextPageToken = listResult.pageToken;
    for (const user of listResult.users) {
      try {
        await auth.setCustomUserClaims(user.uid, { role: 'authenticated' });
        console.log('Set role for', user.email || user.uid);
      } catch (e) {
        console.error('Failed for', user.uid, e.message);
      }
    }
  } while (nextPageToken);
  console.log('Done.');
}

setRoleClaim().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
