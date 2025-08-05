import React from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useWalletPay } from './hooks/useWalletFunctions';
import Navigation from './src/Navigation';

const {width} = Dimensions.get('window');

export default function App() {

return (
  <Navigation/>
)
  
}

// ...styles and export unchanged...
