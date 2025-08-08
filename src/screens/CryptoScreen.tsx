import React, { useEffect } from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
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

const CryptoScreen: React.FC = () => {
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
  }, [headerOpacity, headerTranslateY, contentOpacity, contentScale]);

  // Event handlers
  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleCryptoAction = (action: string) => {
    Alert.alert('Crypto', `${action} action triggered`);
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

      {/* Elegant Background Gradient */}
      <LinearGradient
        colors={['#ffffff', '#f8fafc', '#f1f5f9']}
        style={styles.backgroundGradient}
      />

      {/* Header with entrance animation */}
      <Animated.View style={[headerAnimatedStyle, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackPress}
          >
            <Icon name="arrow-back" size={24} color="#6366f1" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Crypto</Text>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => handleCryptoAction('Settings')}
          >
            <Icon name="settings" size={24} color="#6366f1" />
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Main Content with entrance animation */}
      <Animated.ScrollView
        style={[styles.content, contentAnimatedStyle]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Portfolio Overview */}
        <View style={styles.portfolioCard}>
          <Text style={styles.portfolioTitle}>Portfolio Value</Text>
          <Text style={styles.portfolioAmount}>$24,567.89</Text>
          <View style={styles.portfolioChange}>
            <Icon name="trending-up" size={16} color="#10b981" />
            <Text style={styles.portfolioChangeText}>+12.5%</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {[
              { name: 'Buy', icon: 'add', action: () => handleCryptoAction('Buy') },
              { name: 'Sell', icon: 'remove', action: () => handleCryptoAction('Sell') },
              { name: 'Swap', icon: 'swap-horiz', action: () => handleCryptoAction('Swap') },
            ].map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.actionCard}
                onPress={action.action}
              >
                <LinearGradient
                  colors={['#6366f1', '#8b5cf6']}
                  style={styles.actionGradient}
                >
                  <Icon name={action.icon} size={24} color="#fff" />
                </LinearGradient>
                <Text style={styles.actionText}>{action.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Popular Coins */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Coins</Text>
          {[
            { name: 'Bitcoin', symbol: 'BTC', price: '$43,567.89', change: '+5.2%' },
            { name: 'Ethereum', symbol: 'ETH', price: '$2,345.67', change: '+3.8%' },
            { name: 'Cardano', symbol: 'ADA', price: '$0.45', change: '+7.1%' },
          ].map((coin, index) => (
            <TouchableOpacity
              key={index}
              style={styles.coinCard}
              onPress={() => handleCryptoAction(coin.name)}
            >
              <View style={styles.coinInfo}>
                <Text style={styles.coinName}>{coin.name}</Text>
                <Text style={styles.coinSymbol}>{coin.symbol}</Text>
              </View>
              <View style={styles.coinPrice}>
                <Text style={styles.coinPriceText}>{coin.price}</Text>
                <Text style={styles.coinChangeText}>{coin.change}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.ScrollView>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6366f1',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    letterSpacing: -0.5,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6366f1',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 120,
    paddingTop: 10,
  },
  portfolioCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 28,
    padding: 28,
    marginBottom: 30,
    shadowColor: '#6366f1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 10,
  },
  portfolioTitle: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
    marginBottom: 8,
  },
  portfolioAmount: {
    fontSize: 36,
    fontWeight: '800',
    color: '#1f2937',
    marginBottom: 8,
    letterSpacing: -1,
  },
  portfolioChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  portfolioChangeText: {
    fontSize: 16,
    color: '#10b981',
    fontWeight: '600',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '30%',
    alignItems: 'center',
  },
  actionGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#6366f1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  coinCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#6366f1',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 6,
  },
  coinInfo: {
    flex: 1,
  },
  coinName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  coinSymbol: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  coinPrice: {
    alignItems: 'flex-end',
  },
  coinPriceText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  coinChangeText: {
    fontSize: 14,
    color: '#10b981',
    fontWeight: '600',
  },
});

export default CryptoScreen; 