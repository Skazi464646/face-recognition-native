import { useState } from 'react';
import { Alert } from 'react-native';

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

  const callRegisterFace = async (imageUri: any) => {
    try {
      // Create form data
      const formData = new FormData();

      // Append the image file
      formData.append('image', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'unknown.jpg'
      });

      // Append threshold
      formData.append('threshold',  0.6);

      const response = await fetch("http://192.168.1.158:8000/api/faces/register", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error verifying face:', error);
      throw error;
    }
  }

  const callVerifyFace = async (imageUri: any) => {
    try {
      // Create form data
      const formData = new FormData();


      // Append the image file
      formData.append('image', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'captured_image.jpg'
      });
      // Append threshold
      formData.append('threshold',  0.6);
      const response = await fetch("http://192.168.1.158:8000/api/faces/verify", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }


      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error verifying face:', error);
      throw error;
    }
  };


  const handleRegisterPress = (imageUri: string) => {
    debugger
    callRegisterFace(imageUri).then((data) => {
      if(data.message === 'Face registered successfully') {
        Alert.alert('Registration Successful', 'Face registered successfully.');
      } else {
        Alert.alert('Registration Failed', 'Failed to register face. Please try again.');
      }
    })
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
    callVerifyFace(photoPath).then((data) => {
        if (data.is_match) {
        Alert.alert('Verification Successful', 'Face verified successfully.'); 
        }else {
          Alert.alert('Verification Failed', 'Face verification failed. Please try again.');
        }
      });
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


