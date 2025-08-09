import { useState } from 'react';

type LoadingType = 'register' | 'verify' | null;

const useFaceRecognition = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingType, setLoadingType] = useState<LoadingType>(null);
  const [showNameInput, setShowNameInput] = useState<boolean>(false);
  const [personName, setPersonName] = useState<string>('');

  const resetState = () => {
    setIsLoading(false);
    setLoadingType(null);
    setShowNameInput(false);
    setPersonName('');
  };

  const handleRegisterPress = () => {
    setShowNameInput(true);
  };

  const handleNameConfirm = async (
    photoPath: string,
    name: string,
    onSuccess?: () => void
  ) => {
    setIsLoading(true);
    setLoadingType('register');
    try {
      // Placeholder for API call
      await new Promise((r) => setTimeout(r, 800));
      onSuccess && onSuccess();
    } finally {
      setIsLoading(false);
      setLoadingType(null);
      setShowNameInput(false);
      setPersonName('');
    }
  };

  const verifyFace = async (
    photoPath: string,
    onSuccess?: () => void,
    onFailure?: () => void
  ) => {
    setIsLoading(true);
    setLoadingType('verify');
    try {
      // Placeholder for API call
      await new Promise((r) => setTimeout(r, 800));
      onSuccess && onSuccess();
    } catch {
      onFailure && onFailure();
    } finally {
      setIsLoading(false);
      setLoadingType(null);
    }
  };

  return {
    isLoading,
    loadingType,
    showNameInput,
    setShowNameInput,
    personName,
    setPersonName,
    handleRegisterPress,
    handleNameConfirm,
    verifyFace,
    resetState,
  };
};

export default useFaceRecognition;


