import React, { useEffect } from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

// Import custom components
import Header from '../components/Header';
import CardsSection from '../components/CardsSection';
import InfoBlocks from '../components/InfoBlocks';
import FloatingActionButton from '../components/FloatingActionButton';
import QuickActions from '../components/QuickActions';

const HomeScreen: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  // Reanimated shared values for entrance animations
  const headerOpacity = useSharedValue(0);
  const headerTranslateY = useSharedValue(50);
  const contentOpacity = useSharedValue(0);
  const contentScale = useSharedValue(0.95);

  // Animated styles using worklets
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: headerOpacity.value,
      transform: [{ translateY: headerTranslateY.value }],
    };
  });

  const contentAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: contentOpacity.value,
      transform: [{ scale: contentScale.value }],
    };
  });

  // Entrance animations
  useEffect(() => {
    headerOpacity.value = withSpring(1, { damping: 15, stiffness: 100 });
    headerTranslateY.value = withSpring(0, { damping: 15, stiffness: 100 });
    contentOpacity.value = withTiming(1, { duration: 800 });
    contentScale.value = withSpring(1, { damping: 15, stiffness: 100 });
  }, []);

  // Event handlers
  const handleProfilePress = () => {
    Alert.alert('Profile', 'Profile settings');
  };

  const handleEyePress = () => {
    Alert.alert('Visibility', 'Toggle visibility');
  };

  const handleSearchPress = () => {
    Alert.alert('Search', 'Open search');
  };

  const handleCardsPress = () => {
    Alert.alert('Cards', 'View all cards');
  };

  const handleFABPress = () => {
    // Navigate to Wealth screen (existing CameraScreen)
    navigation.navigate('Wealth');
  };

  const handleQuickAction = (actionName: string) => {
    Alert.alert(actionName, `${actionName} action triggered`);
  };

    return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#1f2937' : '#f8fafc' }
      ]}
    >
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      {/* Modern Background Gradient */}
      <LinearGradient
        colors={['#f8fafc', '#e0e7ff', '#f1f5f9']}
        style={styles.backgroundGradient}
      />

      {/* Header with entrance animation */}
      <Animated.View style={[headerAnimatedStyle, { paddingTop: insets.top + 10 }]}>
        <Header
          userName="John"
          greeting="Good morning!"
          onProfilePress={handleProfilePress}
          onEyePress={handleEyePress}
          onSearchPress={handleSearchPress}
        />
      </Animated.View>

      {/* Main Content with entrance animation */}
      <Animated.ScrollView
        style={[styles.content, contentAnimatedStyle]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Cards Section */}
        <CardsSection
          balance="5,749.08"
          currency="AED"
          progressPercentage={85}
          availableLimit="-749.08 AED"
          onPress={handleCardsPress}
        />

        {/* Info Blocks */}
        <InfoBlocks />

        {/* Quick Actions */}
        <QuickActions
          actions={[
            {
              name: 'Bill',
              icon: 'receipt',
              onPress: () => handleQuickAction('Bill'),
            },
            {
              name: 'Raise',
              icon: 'chat-bubble',
              onPress: () => handleQuickAction('Raise'),
            },
            {
              name: 'Deals',
              icon: 'local-offer',
              onPress: () => handleQuickAction('Deals'),
            },
          ]}
        />
      </Animated.ScrollView>

      {/* Floating Action Button */}
      <FloatingActionButton
        onPress={handleFABPress}
        icon="chevron-double-left"
        size={56}
        color="#3b82f6"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Space for FAB
  },
});

export default HomeScreen; 