import { useMemo } from 'react';
import { Animated } from 'react-native';

const useAnimations = (hasPermission: boolean, captureScale: number) => {
  // Minimal placeholder animated styles
  const headerStyle = useMemo(() => ({ opacity: hasPermission ? 1 : 0 }), [hasPermission]);
  const frameStyle = useMemo(() => ({ opacity: 1 }), []);
  const scanningStyle = useMemo(() => ({ opacity: 0.8 }), []);
  const buttonStyle = useMemo(() => ({ opacity: 1 }), []);
  const captureButtonStyle = useMemo(() => ({ transform: [{ scale: captureScale || 1 }] }), [captureScale]);

  return {
    headerStyle,
    frameStyle,
    scanningStyle,
    buttonStyle,
    captureButtonStyle,
  };
};

export default useAnimations;


