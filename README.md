
# 🥗 FoodLog | Elite Nutrition Tracking

A high-performance, mobile-first Progressive Web App (PWA) designed for elite nutrition logging.

## 🚀 Deployment to GitHub Pages

To access this as a mobile app on your phone, follow these steps:

1. **Create a GitHub Repository**:
   - Go to [github.com/new](https://github.com/new).
   - Name it `food-log` (or anything you prefer).
   - Set it to **Public**.

2. **Upload the Files**:
   - In your new repository, click **"uploading an existing file"**.
   - Drag and drop **all** the files from this project (index.html, index.tsx, App.tsx, etc.).
   - Commit the changes.

3. **Enable GitHub Pages**:
   - Go to the **Settings** tab of your repository.
   - Click on **Pages** in the left sidebar.
   - Under "Build and deployment" > "Branch", select `main` (or `master`) and click **Save**.
   - GitHub will give you a link like `https://yourusername.github.io/food-log/`.

4. **Install on Mobile**:
   - Open that link on your phone.
   - **iOS**: Tap "Share" -> "Add to Home Screen".
   - **Android**: Tap the three dots -> "Install App".

## 🛠 How to Continue Editing

Since this project uses a "No-Build" architecture (ES6 modules and Import Maps), you can edit it directly without complex tools:

- **Adding Meals**: Update `constants.ts` to change the default list.
- **Visuals**: All styling is handled via Tailwind CSS classes in the components.
- **Persistence**: All data is saved to your browser's `localStorage`. To prevent data loss, use the **System Backup** feature I added to the History tab.

## 📦 File Structure
- `index.html`: Main entry and PWA metadata.
- `App.tsx`: State management and main layout.
- `components/`: Modular UI elements.
- `constants.ts`: Your meal protocol definitions.
- `manifest.json`: Configuration for the mobile app icon/behavior.
