import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';

const ProfileScreen = () => {
  return (
    <SafeAreaProvider>
        <View style={styles.container}>
            <Text>Profile Screen</Text>
            <TouchableOpacity onPress={() => Alert.alert('Edit Profile')}>
            <Text>Edit Profile</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1},

});

export default ProfileScreen