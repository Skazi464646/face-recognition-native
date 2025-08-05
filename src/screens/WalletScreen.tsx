import React, { useEffect } from 'react'
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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useWalletPay } from '../../hooks/useWalletFunctions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const {width} = Dimensions.get('window');
function WalletScreen() {
  const isDarkMode = useColorScheme() === 'dark';
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  
  // Reanimated shared values for high-performance animations
  const fabScale = useSharedValue(1);
  const fabSlide = useSharedValue(0);
  const fabRotation = useSharedValue(0);
  const headerOpacity = useSharedValue(0);
  const headerTranslateY = useSharedValue(50);
  const contentScale = useSharedValue(0.95);
  const contentOpacity = useSharedValue(0);
  
  const {
    cards,
    selectedCard,
    transactions,
    isProcessing,
    processingScale,
    processingOpacity,
    handleCardPress,
    getCardIcon,
    getStatusColor,
  } = useWalletPay();

  // Entrance animations
  useEffect(() => {
    headerOpacity.value = withSpring(1, { damping: 15, stiffness: 100 });
    headerTranslateY.value = withSpring(0, { damping: 15, stiffness: 100 });
    contentOpacity.value = withTiming(1, { duration: 800 });
    contentScale.value = withSpring(1, { damping: 15, stiffness: 100 });
  }, [headerOpacity, headerTranslateY, contentOpacity, contentScale]);

  const handleFABPress = () => {
    // High-performance FAB animation with worklets
    fabScale.value = withSpring(1.2, { damping: 10, stiffness: 200 });
    fabSlide.value = withTiming(-60, { duration: 300 });
    fabRotation.value = withTiming(180, { duration: 300 });
    
    // Navigate after animation
    setTimeout(() => {
      navigation.navigate('Wealth');
      
      // Reset animations
      fabScale.value = withSpring(1, { damping: 15, stiffness: 100 });
      fabSlide.value = withTiming(0, { duration: 300 });
      fabRotation.value = withTiming(0, { duration: 300 });
    }, 300);
  };

  // Animated styles using Reanimated worklets
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

  const fabAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: fabScale.value },
        { translateX: fabSlide.value },
        { rotate: `${fabRotation.value}deg` },
      ],
    };
  });

  const processingAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: processingOpacity.value,
      transform: [{ scale: processingScale.value }],
    };
  });

  return (
        <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#1f2937' : '#f8fafc' }]}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

            {/* Banking Home Header */}
            <Animated.View
                style={[
                    styles.bankingHeader,
                    headerAnimatedStyle,
                    { paddingTop: insets.top + 10 },
                ]}
            >
                <LinearGradient
                    colors={['#f8fafc', '#e0e7ff']}
                    style={styles.headerGradient}
                >
                    {/* Top Row - Time and Icons */}
                    <View style={styles.headerTopRow}>
                        <View style={styles.timeSection}>
                            <Text style={styles.timeText}>7:28</Text>
                            <TouchableOpacity style={styles.bellIcon}>
                                <Icon name="notifications" size={16} color="#6b7280" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.headerIcons}>
                            <TouchableOpacity style={styles.headerIconButton}>
                                <Icon name="visibility" size={20} color="#6b7280" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.headerIconButton}>
                                <Icon name="search" size={20} color="#6b7280" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Profile and Welcome */}
                    <View style={styles.profileSection}>
                        <TouchableOpacity style={styles.profileAvatar}>
                            <Icon name="person" size={24} color="#6b7280" />
                            <View style={styles.settingsIcon}>
                                <Icon name="settings" size={12} color="#6b7280" />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.welcomeText}>
                            <Text style={styles.welcomeTitle}>Good morning!</Text>
                            <Text style={styles.welcomeSubtitle}>Welcome back, John</Text>
                        </View>
                    </View>
                </LinearGradient>
            </Animated.View>

            <Animated.ScrollView
                style={[
                    styles.content,
                    contentAnimatedStyle,
                ]}
                showsVerticalScrollIndicator={false}
            >
                {/* Cards Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <View style={styles.sectionTitleRow}>
                            <Icon name="credit-card" size={20} color="#3b82f6" />
                            <Text style={[styles.sectionTitle, { color: isDarkMode ? '#f9fafb' : '#111827' }]}>
                                CARDS
                            </Text>
                            <Icon name="chevron-double-right" size={16} color="#6b7280" />
                        </View>
                    </View>
                    
                    {/* Balance Display */}
                    <View style={styles.balanceContainer}>
                        <Text style={styles.balanceAmount}>5,749.08</Text>
                        <Text style={styles.balanceCurrency}>AED</Text>
                    </View>
                    
                    {/* Progress Bar */}
                    <View style={styles.progressContainer}>
                        <View style={styles.progressBar}>
                            <View style={[styles.progressFill, { width: '85%' }]} />
                        </View>
                    </View>
                    
                    {/* Limit Information */}
                    <View style={styles.limitInfo}>
                        <Text style={styles.limitLabel}>Available limit</Text>
                        <Text style={styles.limitAmount}>-749.08 AED</Text>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardsContainer}>
                        {cards.map((card, _index) => (
                            <Animated.View
                                key={card.id}
                                style={contentAnimatedStyle}
                            >
                                <TouchableOpacity
                                    onPress={() => handleCardPress(card)}
                                    style={[
                                        styles.enhancedCard,
                                        {
                                            backgroundColor: card.color,
                                            borderColor: selectedCard?.id === card.id ? '#3b82f6' : 'transparent',
                                            borderWidth: selectedCard?.id === card.id ? 3 : 0,
                                        },
                                    ]}
                                >
                                    <View style={styles.cardHeader}>
                                        <Icon name={getCardIcon(card.type)} size={24} color="#fff" />
                                        <Text style={styles.cardType}>{card.type.toUpperCase()}</Text>
                                    </View>
                                    
                                    <Text style={styles.cardNumber}>{card.number}</Text>
                                    <Text style={styles.cardName}>{card.name}</Text>
                                    
                                    <View style={styles.cardBalanceSection}>
                                        <Text style={styles.cardBalanceLabel}>Available Balance</Text>
                                        <Text style={styles.cardBalance}>${card.balance.toFixed(2)}</Text>
                                    </View>
                                    
                                    <View style={styles.creditLimitSection}>
                                        <View style={styles.limitRow}>
                                            <Text style={styles.limitLabel}>Credit Limit</Text>
                                            <Text style={styles.limitAmount}>$10,000</Text>
                                        </View>
                                        <View style={styles.progressContainer}>
                                            <View style={styles.progressBar}>
                                                <View 
                                                    style={[
                                                        styles.progressFill, 
                                                        { width: `${Math.min((card.balance / 10000) * 100, 100)}%` }
                                                    ]} 
                                                />
                                            </View>
                                            <Text style={styles.availableCredit}>
                                                ${(10000 - card.balance).toFixed(2)} available
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </Animated.View>
                        ))}
                    </ScrollView>
                </View>

                {/* Info Blocks */}
                <View style={styles.section}>
                    <Text style={styles.infoText}>NO NEW ACTIVITY FOR REVIEW</Text>
                    <View style={styles.infoDivider} />
                    <Text style={styles.infoText}>NO NEW MESSAGES FOR YOU</Text>
                </View>

                {/* Quick Actions */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: isDarkMode ? '#f9fafb' : '#111827' }]}>
                        QUICK ACTIONS
                    </Text>
                    
                    <View style={styles.quickActionsGrid}>
                        {[
                            { name: 'Bill', icon: 'receipt', action: () => Alert.alert('Bill') },
                            { name: 'Raise', icon: 'chat-bubble', action: () => Alert.alert('Raise') },
                            { name: 'Deals', icon: 'local-offer', action: () => Alert.alert('Deals') },
                        ].map((action, _index) => (
                            <Animated.View
                                key={_index}
                                style={contentAnimatedStyle}
                            >
                                <TouchableOpacity
                                    style={styles.quickActionItem}
                                    onPress={action.action}
                                >
                                    <Icon name={action.icon} size={32} color="#3b82f6" />
                                    <Text style={[styles.quickActionText, { color: isDarkMode ? '#e5e7eb' : '#374151' }]}>
                                        {action.name}
                                    </Text>
                                </TouchableOpacity>
                            </Animated.View>
                        ))}
                    </View>
                </View>

                {/* Recent Transactions */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: isDarkMode ? '#f9fafb' : '#111827' }]}>
                        Recent Transactions
                    </Text>

                    {transactions.slice(0, 5).map((transaction, _index) => (
                        <Animated.View
                            key={transaction.id}
                            style={contentAnimatedStyle}
                        >
                            <View
                                style={[styles.transactionItem, { backgroundColor: isDarkMode ? '#374151' : '#fff' }]}
                            >
                                <View style={styles.transactionLeft}>
                                    <Icon
                                        name={transaction.type === 'payment' ? 'payment' : 'receipt'}
                                        size={24}
                                        color="#3b82f6"
                                    />
                                    <View style={styles.transactionInfo}>
                                        <Text style={[styles.transactionMerchant, { color: isDarkMode ? '#f9fafb' : '#111827' }]}>
                                            {transaction.merchant}
                                        </Text>
                                        <Text style={[styles.transactionDate, { color: isDarkMode ? '#9ca3af' : '#6b7280' }]}>
                                            {transaction.date}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.transactionRight}>
                                    <Text style={[styles.transactionAmount, { color: isDarkMode ? '#f9fafb' : '#111827' }]}>
                                        ${transaction.amount.toFixed(2)}
                                    </Text>
                                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(transaction.status) }]}>
                                        <Text style={styles.statusText}>{transaction.status}</Text>
                                    </View>
                                </View>
                            </View>
                        </Animated.View>
                    ))}
                </View>
            </Animated.ScrollView>

            {/* Animated Processing Overlay */}
            <Animated.View
                style={[
                    styles.processingOverlay,
                    processingAnimatedStyle,
                ]}
                pointerEvents={isProcessing ? 'auto' : 'none'}
            >
                <View style={styles.processingContent}>
                    <Icon name="nfc" size={48} color="#3b82f6" />
                    <Text style={styles.processingText}>Processing Payment...</Text>
                    <Text style={styles.processingSubtext}>Hold your device near the terminal</Text>
                </View>
            </Animated.View>

            {/* Floating Action Button */}
            <Animated.View
                style={[
                    styles.fab,
                    fabAnimatedStyle,
                ]}
            >
                <TouchableOpacity
                    style={styles.fabButton}
                    onPress={handleFABPress}
                    activeOpacity={0.8}
                >
                    <Icon name="chevron-double-left" size={24} color="#fff" />
                </TouchableOpacity>
            </Animated.View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bankingHeader: {
    zIndex: 10,
  },
  headerGradient: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  timeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  timeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bellIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 15,
  },
  headerIconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    position: 'relative',
  },
  settingsIcon: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  welcomeText: {
    flex: 1,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardsContainer: {
    marginBottom: 10,
  },
  card: {
    width: width * 0.75,
    height: 200,
    borderRadius: 16,
    padding: 20,
    marginRight: 15,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  enhancedCard: {
    width: width * 0.75,
    height: 220,
    borderRadius: 16,
    padding: 20,
    marginRight: 15,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  cardBalanceSection: {
    marginTop: 10,
  },
  cardBalanceLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    marginBottom: 4,
  },
  creditLimitSection: {
    marginTop: 10,
  },
  limitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  limitLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
  },
  limitAmount: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  progressContainer: {
    marginTop: 4,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 2,
  },
  availableCredit: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 10,
  },
  balanceContainer: {
    marginTop: 15,
    marginBottom: 10,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  balanceCurrency: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  limitInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    zIndex: 1000,
  },
  fabButton: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 12,
  },
  infoBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  infoText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginVertical: 8,
  },
  infoDivider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 8,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  quickActionItem: {
    width: (width - 80) / 3,
    height: 80,
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9fafb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardType: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  cardNumber: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 2,
  },
  cardName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  cardBalance: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  quickPaymentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickPaymentItem: {
    width: (width - 60) / 2,
    height: 120,
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickPaymentText: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 4,
  },
  quickPaymentAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionInfo: {
    marginLeft: 12,
    flex: 1,
  },
  transactionMerchant: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 14,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  statusText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  processingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  processingContent: {
    alignItems: 'center',
    padding: 30,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  processingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 15,
    marginBottom: 5,
  },
  processingSubtext: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
});

export default WalletScreen