import React, { useMemo } from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { Camera } from 'react-native-vision-camera';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';


// Components
import PermissionScreen from '../components/camera/PermissionScreen';
import CameraOverlay from '../components/camera/CameraOverlay';
import PhotoPreview from '../components/camera/PhotoPreview';
import { styles as componentStyles } from '../components/camera/styles';

// Hooks
import useCamera from '../hooks/useCamera';
import useFaceRecognition from '../hooks/useFaceRecognition';
import useFaceDetection from '../hooks/useFaceDetection';
import useAnimations from '../hooks/useAnimations';

const CameraScreen: React.FC = () => {
  // Custom hooks
  const cameraHook = useCamera();
  const faceRecognitionHook = useFaceRecognition();
  const faceDetectionHook = useFaceDetection();
  const animationsHook = useAnimations(cameraHook.hasPermission, cameraHook.captureScale);

  // Memoized image URI
  const imageUri = useMemo(() => {
    if (!cameraHook.capturedPhoto) return null;
    return cameraHook.capturedPhoto.startsWith('file://')
      ? cameraHook.capturedPhoto
      : `file://${cameraHook.capturedPhoto}`;
  }, [cameraHook.capturedPhoto]);

  // Handler functions
  const handleRetakePhoto = () => {
    cameraHook.retakePhoto();
    faceRecognitionHook.resetState();
  };

  const handleRegisterSuccess = () => {
    handleRetakePhoto();
  };

  const handleVerifySuccess = () => {
    ;
  };

  const handleVerifyFailure = () => {
    handleRetakePhoto();
  };

  const handleNameConfirm = () => {
    if (!cameraHook.capturedPhoto) return;
    faceRecognitionHook.handleNameConfirm(
      cameraHook.capturedPhoto,
      faceRecognitionHook.personName,
      handleRegisterSuccess
    );
  };

  const handleVerifyPress = () => {
    if (!cameraHook.capturedPhoto) return;
    faceRecognitionHook.verifyFace(
      cameraHook.capturedPhoto,
      handleVerifySuccess,
      handleVerifyFailure
    );
  };

  // Permission screen
  if (!cameraHook.hasPermission) {
    return <PermissionScreen />;
  }

  // Photo preview screen
  if (cameraHook.showPreview && cameraHook.capturedPhoto) {
    return (
      <PhotoPreview
        imageUri={imageUri}
        isLoading={faceRecognitionHook.isLoading}
        loadingType={faceRecognitionHook.loadingType}
        showNameInput={faceRecognitionHook.showNameInput}
        personName={faceRecognitionHook.personName}
        onRetakePhoto={handleRetakePhoto}
        onRegisterPress={faceRecognitionHook.handleRegisterPress}
        onVerifyPress={handleVerifyPress}
        onPersonNameChange={faceRecognitionHook.setPersonName}
        onNameConfirm={handleNameConfirm}
        onNameCancel={() => faceRecognitionHook.setShowNameInput(false)}
      />
    );
  }

  // Main camera screen
  return (
    <SafeAreaView style={componentStyles.container}>

      <View style={componentStyles.cameraContainer}>
        {/* Camera View */}
        {cameraHook.device && (
          <Camera
            ref={cameraHook.camera}
            style={StyleSheet.absoluteFill}
            device={cameraHook.device}
            isActive={true}
            photo={true}
          />
        )}

        {/* Dark overlay for better contrast */}
        <LinearGradient
          colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.1)', 'rgba(0,0,0,0.4)']}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />

        {/* Camera Overlay */}
        <CameraOverlay
          headerStyle={animationsHook.headerStyle}
          frameStyle={animationsHook.frameStyle}
          scanningStyle={animationsHook.scanningStyle}
          buttonStyle={animationsHook.buttonStyle}
          captureButtonStyle={animationsHook.captureButtonStyle}
          isCapturing={cameraHook.isCapturing}
          onCapturePress={cameraHook.capturePhoto}
          instructionText={faceDetectionHook.instructionText}
          instructionColor={faceDetectionHook.instructionColor}
          frameColor={faceDetectionHook.frameColor}
          instructionOpacity={faceDetectionHook.instructionOpacity}
          frameOpacity={faceDetectionHook.frameOpacity}
          isFaceDetected={faceDetectionHook.isFaceDetected}
          detectionScore={faceDetectionHook.detectionScore}
          onStartDetection={faceDetectionHook.simulateFaceDetection}
        />
      </View>
    </SafeAreaView>
  );
};


export default CameraScreen;