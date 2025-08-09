import React from 'react';
import { StatusBar } from 'react-native';
import Navigation from './src/Navigation';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


export default function App() {

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }} edges={['top']}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <Navigation />
      </SafeAreaView>
    </SafeAreaProvider>
  )

}

// ...styles and export unchanged...
