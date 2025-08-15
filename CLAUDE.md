# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core React Native Commands
```bash
# Start Metro bundler
npm start

# Build and run on iOS
npm run ios
# Alternative: npx react-native run-ios

# Build and run on Android  
npm run android
# Alternative: npx react-native run-android

# Run tests
npm test

# Lint code
npm run lint
```

### iOS Development
```bash
# Clean and rebuild iOS
cd ios && rm -rf build && cd .. && npm run ios

# Install iOS dependencies
cd ios && pod install && cd ..

# Reset Metro cache
npx react-native start --reset-cache
```

### Android Development
```bash
# Clean Android build
cd android && ./gradlew clean && cd .. && npm run android
```

## Project Architecture

### Face Recognition System
This is a React Native app with integrated face recognition capabilities that connects to a Python FastAPI backend for face detection and verification.

**Core Face Recognition Flow:**
- `src/screens/CameraScreen.tsx` - Main camera interface with Vision Camera integration
- `src/hooks/useFaceRecognition.ts` - Handles API calls to face recognition backend (register/verify endpoints)
- `src/hooks/useFaceDetection.ts` - Client-side face detection simulation and UI feedback
- `src/hooks/useCamera.ts` - Camera permissions, photo capture, and device management

**API Integration:**
- Backend endpoint: `http://192.168.1.158:8000/api/faces/`
- POST `/register` - Register new face with image upload
- POST `/verify` - Verify existing face against database
- Uses FormData for multipart image uploads with threshold parameter (0.6)

### Navigation Structure
- **src/Navigation.tsx** - Bottom tab navigation with 3 main tabs:
  - Home: `HomeScreen` - Main dashboard
  - Markets: `CameraScreen` - Face recognition camera interface  
  - Profile: `ProfileScreen` - User profile

### Component Organization
```
src/
├── screens/           # Main screen components
├── components/        # Reusable UI components
│   ├── camera/       # Camera-specific components (CameraOverlay, PermissionScreen, PhotoPreview)
│   ├── exchange/     # Trading/exchange UI components
│   ├── profile/      # Profile-related components
│   └── index.ts      # Component exports
└── hooks/            # Custom React hooks for business logic
```

### Key Dependencies
- **Vision Camera**: `react-native-vision-camera` for camera functionality
- **Navigation**: React Navigation v6 with bottom tabs
- **Animations**: React Native Reanimated v4 for smooth animations
- **Icons**: React Native Vector Icons (MaterialIcons)
- **HTTP**: Axios and built-in fetch API for backend communication
- **Styling**: React Native Linear Gradient for UI effects

## Face Recognition Implementation Details

### Camera Permission Flow
1. Check camera permissions in `useCamera.ts`
2. Show `PermissionScreen` if not granted
3. Initialize camera device and capture capabilities

### Face Registration Process
1. Capture photo via Vision Camera
2. Show `PhotoPreview` with register/verify options
3. Call `handleRegisterPress()` which uses `callRegisterFace()` in `useFaceRecognition.ts`
4. Upload image as FormData to `/api/faces/register` endpoint
5. Handle success/error responses with alerts

### Face Verification Process  
1. Capture photo and preview
2. Call `verifyFace()` which uses `callVerifyFace()` in `useFaceRecognition.ts`
3. Upload image to `/api/faces/verify` endpoint
4. Process match results and show verification status

### Important Configuration
- **Backend URL**: Currently hardcoded to `192.168.1.158:8000` - update for different environments
- **Detection Threshold**: Set to 0.6 for face matching confidence
- **Image Format**: JPEG format with multipart upload

## Development Notes

### TypeScript Configuration
- Extends `@react-native/typescript-config`
- Strict typing for face recognition hooks and camera interfaces

### Testing
- Jest configured with React Native preset
- Test files in `__tests__/` directory

### Code Style
- ESLint configuration extends `@react-native/eslint-config`
- Prettier for code formatting

### Project Requirements
- Node.js >= 18 (specified in package.json engines)
- React Native 0.80.2
- React 19.1.0

## Troubleshooting

### Common Issues
1. **Camera not working**: Check iOS/Android permissions in device settings
2. **Face recognition API fails**: Verify backend server is running and IP address is correct
3. **iOS build issues**: Run `cd ios && pod install` after dependency changes
4. **Metro bundler cache**: Clear with `npx react-native start --reset-cache`

### Backend Requirements
- Python FastAPI server with face recognition endpoints
- Server must be accessible from mobile device network
- Endpoints should accept multipart/form-data image uploads