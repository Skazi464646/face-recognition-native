import { useMemo, useState } from 'react';

const useFaceDetection = () => {
  const [isFaceDetected, setIsFaceDetected] = useState<boolean>(false);
  const [detectionScore, setDetectionScore] = useState<number>(0);

  const instructionText = useMemo(
    () => (isFaceDetected ? 'Hold steady' : 'Align your face within the frame'),
    [isFaceDetected]
  );

  const instructionColor = isFaceDetected ? '#4ade80' : '#ffffff';
  const frameColor = isFaceDetected ? '#22c55e' : '#ffffff';
  const instructionOpacity = isFaceDetected ? 1 : 0.9;
  const frameOpacity = isFaceDetected ? 1 : 0.6;

  // Temporary trigger until we wire a real frame processor
  const simulateFaceDetection = () => {
    const detected = !isFaceDetected;
    setIsFaceDetected(detected);
    setDetectionScore(detected ? 0.92 : 0);
  };

  return {
    instructionText,
    instructionColor,
    frameColor,
    instructionOpacity,
    frameOpacity,
    isFaceDetected,
    detectionScore,
    simulateFaceDetection,
  };
};

export default useFaceDetection;


