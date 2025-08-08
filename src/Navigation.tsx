// Navigation.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from './screens/HomeScreen';
import WalletScreen from './screens/WalletScreen';
import CameraScreen from './screens/CameraScreen';
import ProfileScreen from './screens/ProfileScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color, size, focused }) => {
              let name;
              switch (route.name) {
                case 'Home':
                  name = focused ? 'diamond' : 'home';
                  break;
                case 'Markets':
                  name = 'show-chart';
                  break;
                case 'Trade':
                  name = 'refresh';
                  break;
                case 'Futures':
                  name = 'description';
                  break;
                case 'Assets':
                  name = 'account-balance-wallet';
                  break;
                default:
                  name = 'home';
              }
              return <Icon name={name} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#ffd700',
            tabBarInactiveTintColor: '#666',
            tabBarStyle: {
              backgroundColor: '#0f0f23',
              borderTopWidth: 1,
              borderTopColor: 'rgba(255, 255, 255, 0.1)',
              paddingBottom: 8,
              paddingTop: 8,
              height: 88,
            },
            tabBarItemStyle: {
              paddingVertical: 4,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '600',
              marginTop: 2,
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Markets" component={CameraScreen} />
          <Tab.Screen name="Trade" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
