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
            tabBarIcon: ({ color, size }) => {
              let name;
              switch (route.name) {
                case 'Home':
                  name = 'home';
                  break;
                case 'Wealth':
                  name = 'bar-chart';
                  break;
                case 'Transfer':
                  name = 'swap-vert';
                  break;
                case 'Services':
                  name = 'apps';
                  break;
                case 'Explore':
                  name = 'grid-on';
                  break;
                default:
                  name = 'home';
              }
              return <Icon name={name} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#667eea',
            tabBarInactiveTintColor: '#9ca3af',
            tabBarStyle: {
              backgroundColor: 'rgba(255, 255, 255, 0.98)',
              borderTopWidth: 0,
              paddingBottom: 12,
              paddingTop: 8,
              height: 70,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -4 },
              shadowOpacity: 0.15,
              shadowRadius: 12,
              elevation: 12,
              borderRadius: 20,
              marginHorizontal: 16,
              marginBottom: 8,
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Wealth" component={CameraScreen} />
          <Tab.Screen name="Transfer" component={ProfileScreen} />
          <Tab.Screen name="Services" component={WalletScreen} />
          <Tab.Screen name="Explore" component={CameraScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
