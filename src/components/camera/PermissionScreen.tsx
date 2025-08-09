import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PermissionScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Camera permission is required.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' },
  text: { color: 'white', fontSize: 16 },
});

export default PermissionScreen;


