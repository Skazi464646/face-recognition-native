import React from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';

type Props = {
  headerStyle?: any;
  frameStyle?: any;
  scanningStyle?: any;
  buttonStyle?: any;
  captureButtonStyle?: any;
  isCapturing: boolean;
  onCapturePress: () => void;
  instructionText: string;
  instructionColor: string;
  frameColor: string;
  instructionOpacity: number;
  frameOpacity: number;
  isFaceDetected: boolean;
  detectionScore: number;
  onStartDetection: () => void;
};

const CameraOverlay: React.FC<Props> = ({
  isCapturing,
  onCapturePress,
  instructionText,
  instructionColor,
  frameColor,
  instructionOpacity,
  frameOpacity,
  onStartDetection,
}) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ position: 'absolute', top: 60, width: '100%', alignItems: 'center' }}>
        <Text style={{ color: instructionColor, opacity: instructionOpacity }}>{instructionText}</Text>
      </View>

      {/* Oval frame (bigger) */}
      <View
        style={{
          position: 'absolute',
          top: '12%',
          left: '8%',
          right: '8%',
          height: '55%',
          borderWidth: 3,
          borderColor: frameColor,
          opacity: frameOpacity,
          borderRadius: 9999,
        }}
      />

      <View style={{ position: 'absolute', bottom: 60, width: '100%', alignItems: 'center' }}>
        {/* Native-like capture button: outer ring + inner circle */}
        <Pressable onPress={onCapturePress} style={{ opacity: isCapturing ? 0.6 : 1 }} hitSlop={10}>
          <View
            style={{
              width: 84,
              height: 84,
              borderRadius: 42,
              borderWidth: 5,
              borderColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent',
            }}
          >
            <View
              style={{
                width: 66,
                height: 66,
                borderRadius: 33,
                backgroundColor: 'white',
              }}
            />
          </View>
        </Pressable>
        <TouchableOpacity onPress={onStartDetection} style={{ marginTop: 16 }}>
          <Text style={{ color: 'white' }}>Toggle Detection (temp)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CameraOverlay;


