// Navigation.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import WalletScreen from './screens/WalletScreen';
import CameraScreen from './screens/CameraScreen';
import ProfileScreen from './ProfileScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
              let name = route.name === 'Wallet' ? 'account-balance-wallet' : 'camera-alt';
              return <Icon name={name} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Wallet" component={WalletScreen} />
          <Tab.Screen name="Camera" component={CameraScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
