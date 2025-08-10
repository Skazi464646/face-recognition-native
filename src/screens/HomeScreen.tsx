import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

// Import custom components
import ExchangeView from './ExchangeView';

const HomeScreen: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState('wealth');
  const [selectedSegment, setSelectedSegment] = useState('exchange');

  // Reanimated shared values for entrance animations
  const headerOpacity = useSharedValue(0);
  const headerTranslateY = useSharedValue(50);
  const contentRotation = useSharedValue(0);
  const contentScale = useSharedValue(1);

  // Animated styles using worklets
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: headerOpacity.value,
      transform: [{ translateY: headerTranslateY.value }],
    };
  });

  const contentAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotateY: `${contentRotation.value}deg` },
        { scale: contentScale.value },
      ],
      backfaceVisibility: 'hidden',
    };
  });

  // Entrance animations
  useEffect(() => {
    headerOpacity.value = withSpring(1, { damping: 15, stiffness: 100 });
    headerTranslateY.value = withSpring(0, { damping: 15, stiffness: 100 });
  }, [headerOpacity, headerTranslateY]);

  // Handle segment change with simple content switch
  const handleSegmentChange = (segment: string) => {
    if (segment === selectedSegment) return; // Don't animate if same segment

    setSelectedSegment(segment);
  };

  // Event handlers
  const handleProfilePress = () => {
    Alert.alert('Profile', 'Profile settings');
  };

  const handleFABPress = () => {
    // Navigate to Wealth screen (existing CameraScreen)
    navigation.navigate('Wealth');
  };

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
  };

  const handleQuickAction = (actionName: string) => {
    Alert.alert(actionName, `${actionName} action triggered`);
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
      ]}
    >
      <ExchangeView />

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
  // contentContainer: {
  //   paddingHorizontal: 10,
  //   paddingBottom: 120,
  //   paddingTop: 0,
  // },
  // Header Styles
  header: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 0,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationContainer: {
    position: 'relative',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#ffd700',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  segmentControl: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 4,
  },
  segmentButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  segmentButtonActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  segmentText: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },
  segmentTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingVertical: 8,
  },
  searchButton: {
    padding: 4,
  },

  walletContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  limitCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
  },
  limitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  limitTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  limitAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: 16,
  },
  limitProgress: {
    marginBottom: 20,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    width: '24.5%', // $2,450 / $10,000 = 24.5%
    backgroundColor: '#ffd700',
    borderRadius: 4,
  },
  limitUsed: {
    fontSize: 14,
    color: '#999',
  },
  limitActions: {
    flexDirection: 'row',
    gap: 12,
  },
  limitButton: {
    flex: 1,
    backgroundColor: '#ffd700',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  limitButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  limitButtonSecondary: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  limitButtonTextSecondary: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
  },
});

export default HomeScreen; 