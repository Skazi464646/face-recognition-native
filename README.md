# FaceID React Native App

A modern React Native application with Face ID integration and advanced UI components.

## Features

### Exchange View with Card Flipping Animation

The ExchangeView component now includes:

1. **Card Flipping Animation**: 
   - Smooth 3D flip animation using React Native Reanimated
   - Toggle between trading interface and quick actions
   - Scale and rotation animations for enhanced UX

2. **Trading Interface**:
   - Buy/Sell sections with real-time price display
   - Percentage-based amount selection (25%, 50%, 75%, 100%)
   - Input validation and error handling
   - Available balance display

3. **Multiple View Modes**:
   - **Trading**: Buy/sell interface with percentage buttons
   - **Portfolio**: Asset overview with balances
   - **Order Book**: Market depth visualization

4. **Industry-Standard UI**:
   - Dark theme with gradient backgrounds
   - Professional color scheme (green for buy, red for sell)
   - Responsive design with proper spacing
   - Interactive elements with visual feedback

### How to Use

1. Navigate to the Exchange tab in the app
2. Click the "Flip Card" button to toggle between trading and quick actions
3. Use the view toggle buttons to switch between Trading, Portfolio, and Order Book
4. Enter amounts manually or use percentage buttons for quick selection
5. Tap Buy/Sell buttons to execute trades (demo mode)

### Technical Implementation

- **Animations**: React Native Reanimated for smooth 60fps animations
- **State Management**: React hooks for local state
- **Styling**: StyleSheet with industry-standard design patterns
- **Validation**: Input validation with user-friendly error messages

## Getting Started

```bash
# Install dependencies
npm install

# Run on iOS
npx react-native run-ios

# Run on Android
npx react-native run-android
```

## Dependencies

- React Native Reanimated
- React Native Linear Gradient
- React Native Vector Icons
- React Navigation

## Project Structure

```
src/
├── screens/
│   ├── HomeScreen.tsx      # Main screen with segment control
│   ├── ExchangeView.tsx    # Enhanced exchange interface
│   └── ...
├── components/
│   └── ...
└── ...
```
