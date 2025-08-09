import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
  imageUri: string | null;
  isLoading: boolean;
  loadingType: 'register' | 'verify' | null;
  showNameInput: boolean;
  personName: string;
  onRetakePhoto: () => void;
  onRegisterPress: () => void;
  onVerifyPress: () => void;
  onPersonNameChange: (text: string) => void;
  onNameConfirm: () => void;
  onNameCancel: () => void;
};

const PhotoPreview: React.FC<Props> = ({
  imageUri,
  isLoading,
  loadingType,
  showNameInput,
  personName,
  onRetakePhoto,
  onRegisterPress,
  onVerifyPress,
  onPersonNameChange,
  onNameConfirm,
  onNameCancel,
}) => {
  return (
    <View style={styles.container}>
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
      )}

      <View style={styles.actions}>
        <TouchableOpacity onPress={onRetakePhoto} style={styles.button}>
          <Text style={styles.buttonText}>Retake</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onRegisterPress} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onVerifyPress} style={styles.button}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>

      {isLoading && (
        <Text style={styles.loading}>{loadingType === 'register' ? 'Registering...' : 'Verifying...'}</Text>
      )}

      {showNameInput && (
        <View style={{ marginTop: 12 }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Name: {personName || '(enter in code)'}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8 }}>
            <TouchableOpacity onPress={onNameConfirm} style={styles.buttonSmall}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onNameCancel} style={styles.buttonSmall}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' },
  image: { width: '90%', height: '60%', borderRadius: 12 },
  actions: { flexDirection: 'row', marginTop: 16 },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#111827',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#374151',
    marginHorizontal: 6,
  },
  buttonSmall: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#111827',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#374151',
    marginHorizontal: 6,
  },
  buttonText: { color: 'white' },
  loading: { color: 'white', marginTop: 12 },
});

export default PhotoPreview;


