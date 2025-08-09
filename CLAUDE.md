# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core React Native Commands
```bash
# Start Metro bundler
npm start

# Build and run on iOS
npm run ios

# Build and run on Android  
npm run android

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
- `CameraScreen.tsx` - Main camera interface with Vision Camera integration
- `useFaceRecognition.ts` - Handles API calls to face recognition backend (register/verify endpoints)
- `useFaceDetection.ts` - Client-side face detection simulation and UI feedback
- `useCamera.ts` - Camera permissions, photo capture, and device management

**API Integration:**
- Backend endpoint: `http://192.168.1.158:8000/api/faces/`
- POST `/register` - Register new face with image upload
- POST `/verify` - Verify existing face against database
- Uses FormData for multipart image uploads with threshold parameter (0.6)

### Navigation Structure
- **Navigation.tsx** - Bottom tab navigation with 3 main tabs:
  - Home: `HomeScreen` - Main dashboard
  - Markets: `CameraScreen` - Face recognition camera interface  
  - Trade: `ProfileScreen` - User profile

### Component Organization
```
src/
├── screens/           # Main screen components
├── components/        # Reusable UI components
│   ├── camera/       # Camera-specific components
│   └── index.ts      # Component exports
└── hooks/            # Custom React hooks for business logic
```

### Key Dependencies
- **Vision Camera**: `react-native-vision-camera` for camera functionality
- **Navigation**: React Navigation v6 with bottom tabs
- **Animations**: React Native Reanimated for smooth animations
- **Icons**: React Native Vector Icons (MaterialIcons)
- **HTTP**: Built-in fetch API for backend communication

## Face Recognition Implementation Details

### Camera Permission Flow
1. Check camera permissions in `useCamera.ts`
2. Show `PermissionScreen` if not granted
3. Initialize camera device and capture capabilities

### Face Registration Process
1. Capture photo via Vision Camera
2. Show `PhotoPreview` with register/verify options
3. Call `callRegisterFace()` in `useFaceRecognition.ts`
4. Upload image as FormData to `/api/faces/register` endpoint
5. Handle success/error responses with alerts

### Face Verification Process  
1. Capture photo and preview
2. Call `callVerifyFace()` in `useFaceRecognition.ts`
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