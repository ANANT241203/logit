# logit

# Logit App

## Project Overview
Logit is a mobile app designed for friends to easily share and rank their favorite media interests, presented via both a traditional feed and an interactive mind-map interface.

## Project Structure

### `app/`
- **index.tsx**: Entry point of the application. Contains logic to toggle between `FeedScreen` and `MapScreen`.
- **_layout.tsx**: Implements bottom-tab navigation containing three primary tabs:
  - **Feed**: Displays the main content feed.
  - **Add**: Placeholder for adding new content.
  - **Profile**: Placeholder for user profiles.
- **add.tsx**: Placeholder file displaying a minimal "Add" screen.
- **profile.tsx**: Placeholder file displaying a minimal "Profile" screen.

### `components/`
- **FeedScreen.tsx**: Renders a detailed feed layout where friends' ranked media interests appear. Includes a button for toggling to the Map View.
- **MapScreen.tsx**: Displays a visually interactive mind-map with nodes representing friends and media items. Nodes are interconnected with lines, clickable, and reveal additional details via interactive popups. Includes a button to toggle back to Feed View.

## Key Functionalities

- **Toggle Between Views**:
  - The user can seamlessly toggle between a List View (FeedScreen) and a Map View (MapScreen) from the integrated toggle buttons located in the search bar of each view.

- **Interactive Nodes**:
  - Nodes on the MapScreen represent either media items or friends. Clicking these nodes will show relevant pop-up details about the media or friend.

## How to Run the App Locally (After Downloading from GitHub)

### Step 1: Prerequisites
Ensure you have the following installed:
- Node.js (Recommended version: 18 or above)
- npm (Usually included with Node.js installation)
- Expo CLI (`npm install -g expo-cli`)

### Step 2: Download & Navigate
Clone or download the repository from GitHub.

```bash
cd path/to/logit_app
```

### Step 3: Install Dependencies
Run the following command in the project's root folder to install all required dependencies:

```bash
npm install
```

### Step 4: Launch the App
Run the app on your device using Expo:

```bash
npm start
```

### Step 5: Run on Your Phone
- Install the **Expo Go** app from the App Store (iOS) or Google Play Store (Android).
- Scan the QR code displayed in your terminal or browser to launch the app on your device.

---

Enjoy using Logit!
