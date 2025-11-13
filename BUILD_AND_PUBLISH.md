# Build & Publish — Control Quality (Android AAB)

This guide assumes you have a React Native project set up. The package in this folder contains the App.js and assets to replace in a freshly created React Native project (see README.md).

## Prerequisites (on your computer)
- Node.js (>=16)
- Java JDK 11 or 17
- Android Studio + Android SDK (with command-line tools)
- `npx` available (comes with Node)

## 1) Create a new React Native project (if you haven't)
```bash
npx react-native init ControlQualityApp
cd ControlQualityApp
```

## 2) Replace App.js and assets
Copy the files from `ControlQuality_Project/` into the new RN project root, replacing `App.js` and adding the `assets/` folder and other files provided.

## 3) Create a signing key (keystore)
Run (change alias and keystore name as you like):
```bash
keytool -genkey -v -keystore controlquality-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias controlquality_key
```
You'll be prompted to set a password and some metadata. Keep the keystore file and passwords safe — you'll need them to sign updates in the future.

## 4) Place the keystore in your RN project
Move `controlquality-keystore.jks` into `android/app/` folder.

## 5) Configure Gradle signing (android/gradle.properties or android/app/build.gradle)
Open `android/gradle.properties` and add (or edit):
```
MYAPP_UPLOAD_STORE_FILE=controlquality-keystore.jks
MYAPP_UPLOAD_KEY_ALIAS=controlquality_key
MYAPP_UPLOAD_STORE_PASSWORD=your_keystore_password_here
MYAPP_UPLOAD_KEY_PASSWORD=your_key_password_here
```
**Important:** For security, don't commit real passwords to version control. Use environment variables on CI or local `~/.gradle/gradle.properties` to store passwords instead.

In `android/app/build.gradle`, add signing config if not present (usually RN templates have it). Example snippet inside `android` block:
```gradle
signingConfigs {
    release {
        storeFile file(MYAPP_UPLOAD_STORE_FILE)
        storePassword MYAPP_UPLOAD_STORE_PASSWORD
        keyAlias MYAPP_UPLOAD_KEY_ALIAS
        keyPassword MYAPP_UPLOAD_KEY_PASSWORD
    }
}
buildTypes {
    release {
        signingConfig signingConfigs.release
        minifyEnabled false
        // other options...
    }
}
```

## 6) Build the AAB
From the `android` directory run:
```bash
cd android
./gradlew bundleRelease
```
The signed `.aab` will be created at:
```
android/app/build/outputs/bundle/release/app-release.aab
```

## 7) Upload to Play Console
- Login to Google Play Console with `ControlQualitySP@gmail.com`
- Create a new app, fill the metadata (name: Control Quality), upload the AAB, screenshots, privacy policy URL (you can host the `privacy_policy.html` on a simple hosting or upload a link), and fill content rating and pricing settings.
- Submit the app for review.

## 8) If you need help
If any step fails I can guide you step-by-step or troubleshoot build errors (send me the terminal output).