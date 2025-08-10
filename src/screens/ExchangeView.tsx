import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, TextInput, Alert, SafeAreaView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolate } from 'react-native-reanimated';
// styles are local in this file; shared styles used inside subcomponents
import HeaderPrice from '../components/exchange/HeaderPrice';
import ExpenseGraph from '../components/exchange/ExpenseGraph';
import TransactionsList from '../components/exchange/TransactionsList';
import WalletView from '../components/exchange/WalletView';
import ToggleTabs from '../components/exchange/ToggleTabs';
import TradingCard from '../components/exchange/TradingCard';


const ExchangeView: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeView, setActiveView] = useState('trading'); // trading, portfolio, orderbook
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [selectedCurrency, setSelectedCurrency] = useState('BTC');
  const [buyAmount, setBuyAmount] = useState('');
  const [sellAmount, setSellAmount] = useState('');
  const [buyPercentage, setBuyPercentage] = useState(0);
  const [sellPercentage, setSellPercentage] = useState(0);
  const [toggleView, setToggleView] = useState('exchange'); // exchange, wallet

  // Animation values
  const flipRotation = useSharedValue(0);
  const scale = useSharedValue(1);
  const togglePosition = useSharedValue(0); // 0 for exchange, 1 for wallet

  // Toggle animation
  const animateToggle = (view: 'exchange' | 'wallet') => {
    setToggleView(view);
    togglePosition.value = withTiming(view === 'exchange' ? 0 : 1, { duration: 300 });
  };

  // Flip animation
  const flipCard = () => {
    setIsFlipped(!isFlipped);
    scale.value = withTiming(0.95, { duration: 150 }, () => {
      flipRotation.value = withTiming(flipRotation.value + 180, { duration: 600 });
      scale.value = withTiming(1, { duration: 150 });
    });
  };

  // Auto-flip when view changes (optional enhancement)
  useEffect(() => {
    if (activeView === 'portfolio' || activeView === 'orderbook') {
      // Small scale animation when switching views
      scale.value = withTiming(0.98, { duration: 100 }, () => {
        scale.value = withTiming(1, { duration: 100 });
      });
    }
  }, [activeView, scale]);

  // Animated styles
  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(
      flipRotation.value,
      [0, 180],
      [0, 180]
    );
    return {
      transform: [
        { perspective: 1000 },
        { rotateY: `${rotateY}deg` },
        { scale: scale.value },
      ],
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(
      flipRotation.value,
      [0, 180],
      [180, 360]
    );
    return {
      transform: [
        { perspective: 1000 },
        { rotateY: `${rotateY}deg` },
        { scale: scale.value },
      ],
    };
  });

  const onToggleSelect = (view: 'exchange' | 'wallet') => {
    setToggleView(view);
    // togglePosition.value = withTiming(view === 'exchange' ? 0 : 1, { duration: 300 });
    animateToggle(view);
  };

  // Trading functions
  const handleBuy = () => {
    if (!buyAmount || parseFloat(buyAmount) <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount to buy');
      return;
    }
    Alert.alert('Buy Order', `Buying ${buyAmount} BTC at market price`);
  };

  const handleSell = () => {
    if (!sellAmount || parseFloat(sellAmount) <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount to sell');
      return;
    }
    Alert.alert('Sell Order', `Selling ${sellAmount} BTC at market price`);
  };

  // Percentage selection functions
  const handleBuyPercentage = (percentage: number) => {
    setBuyPercentage(percentage);
    const availableUSDT = 1234.56;
    const calculatedAmount = (availableUSDT * percentage) / 100;
    setBuyAmount(calculatedAmount.toFixed(2));
  };

  const handleSellPercentage = (percentage: number) => {
    setSellPercentage(percentage);
    const availableBTC = 0.00155824;
    const calculatedAmount = (availableBTC * percentage) / 100;
    setSellAmount(calculatedAmount.toFixed(8));
  };

  // Mock data
  const mockPrice = 45678.50;
  const mockChange = 2.34;
  const mockVolume = '1.2B';

  // Mock expense data for graph
  const expenseData = [
    { month: 'Jan', amount: 1200 },
    { month: 'Feb', amount: 1800 },
    { month: 'Mar', amount: 1400 },
    { month: 'Apr', amount: 2200 },
    { month: 'May', amount: 1600 },
    { month: 'Jun', amount: 1900 },
  ];

  // Mock wallet data
  const walletData = {
    totalBalance: 12500.75,
    todaySpent: 245.30,
    currency: 'USD',
  };

  // Mock transaction cards
  const transactionCards = [
    { id: 1, title: 'Netflix', amount: 15.99, date: 'Today', type: 'subscription' },
    { id: 2, title: 'Uber Ride', amount: 28.50, date: 'Today', type: 'transport' },
    { id: 3, title: 'Grocery Store', amount: 89.45, date: 'Yesterday', type: 'shopping' },
    { id: 4, title: 'Coffee Shop', amount: 4.75, date: 'Yesterday', type: 'food' },
  ];

  // Render expense graph
  const renderExpenseGraph = () => <ExpenseGraph data={expenseData} />;

  const renderTransactionCards = () => (
    <TransactionsList cards={transactionCards} getCardIcon={getCardIcon} getCardIconColor={getCardIconColor} />
  );

  // Helper functions for cards
  const getCardIcon = (type: string) => {
    switch (type) {
      case 'subscription': return 'subscriptions';
      case 'transport': return 'directions-car';
      case 'shopping': return 'shopping-cart';
      case 'food': return 'restaurant';
      default: return 'payment';
    }
  };

  const getCardIconColor = (type: string) => {
    switch (type) {
      case 'subscription': return '#6366f1';
      case 'transport': return '#f59e0b';
      case 'shopping': return '#10b981';
      case 'food': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const renderWalletView = () => <WalletView walletData={walletData} />;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Animated Toggle View */}
        <ToggleTabs togglePosition={togglePosition} onSelect={onToggleSelect} />

        {/* Conditional Content Based on Toggle */}
        {toggleView === 'exchange' ? (
          <>
            {/* Header with Price Info */}
            <HeaderPrice symbol={'BTC/USDT'} price={mockPrice} changePct={mockChange} />

            {/* Expense Graph */}
            {renderExpenseGraph()}

            {/* Transaction Cards */}
            {renderTransactionCards()}
          </>
        ) : (
          /* Wallet View */
          renderWalletView()
        )}

        {/* Balance Section */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceLabel}>Portfolio Balance</Text>
            <TouchableOpacity onPress={() => setBalanceVisible(!balanceVisible)}>
              <Icon
                name={balanceVisible ? "visibility" : "visibility-off"}
                size={20}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.balanceAmount}>
            {balanceVisible ? "0.00155824" : "•••••••••"} <Text style={styles.currencyText}>{selectedCurrency}</Text>
          </Text>
          <Text style={styles.balanceFiat}>≈ $177.33 USD</Text>
        </View>

        {/* View Toggle */}
        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[styles.toggleButton, activeView === 'trading' && styles.toggleButtonActive]}
            onPress={() => setActiveView('trading')}
          >
            <Text style={[styles.toggleText, activeView === 'trading' && styles.toggleTextActive]}>Trading</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, activeView === 'portfolio' && styles.toggleButtonActive]}
            onPress={() => setActiveView('portfolio')}
          >
            <Text style={[styles.toggleText, activeView === 'portfolio' && styles.toggleTextActive]}>Portfolio</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, activeView === 'orderbook' && styles.toggleButtonActive]}
            onPress={() => setActiveView('orderbook')}
          >
            <Text style={[styles.toggleText, activeView === 'orderbook' && styles.toggleTextActive]}>Order Book</Text>
          </TouchableOpacity>
        </View>

        {/* Main Content Card with Flip Animation */}
        <View style={styles.cardContainer}>
          {/* Front of Card - Trading View */}
          <Animated.View style={[styles.card, styles.cardFront, frontAnimatedStyle]}>
            {activeView === 'trading' && (
              <TradingCard
                buyAmount={buyAmount}
                sellAmount={sellAmount}
                buyPercentage={buyPercentage}
                sellPercentage={sellPercentage}
                onChangeBuy={setBuyAmount}
                onChangeSell={setSellAmount}
                onBuyPct={handleBuyPercentage}
                onSellPct={handleSellPercentage}
                onBuy={handleBuy}
                onSell={handleSell}
              />
            )}

            {activeView === 'portfolio' && (
              <View style={styles.portfolioView}>
                <View style={styles.portfolioHeader}>
                  <Text style={styles.portfolioTitle}>Your Assets</Text>
                  <TouchableOpacity style={styles.refreshButton}>
                    <Icon name="refresh" size={20} color="#ffd700" />
                  </TouchableOpacity>
                </View>

                <View style={styles.assetItem}>
                  <View style={styles.assetInfo}>
                    <View style={styles.assetIcon}>
                      <Text style={styles.assetIconText}>₿</Text>
                    </View>
                    <View style={styles.assetDetails}>
                      <Text style={styles.assetName}>Bitcoin</Text>
                      <Text style={styles.assetSymbol}>BTC</Text>
                    </View>
                  </View>
                  <View style={styles.assetValue}>
                    <Text style={styles.assetAmount}>0.00155824</Text>
                    <Text style={styles.assetPrice}>$177.33</Text>
                  </View>
                </View>

                <View style={styles.assetItem}>
                  <View style={styles.assetInfo}>
                    <View style={styles.assetIcon}>
                      <Text style={styles.assetIconText}>Ξ</Text>
                    </View>
                    <View style={styles.assetDetails}>
                      <Text style={styles.assetName}>Ethereum</Text>
                      <Text style={styles.assetSymbol}>ETH</Text>
                    </View>
                  </View>
                  <View style={styles.assetValue}>
                    <Text style={styles.assetAmount}>0.00000000</Text>
                    <Text style={styles.assetPrice}>$0.00</Text>
                  </View>
                </View>
              </View>
            )}

            {activeView === 'orderbook' && (
              <View style={styles.orderbookView}>
                <View style={styles.orderbookHeader}>
                  <Text style={styles.orderbookTitle}>Order Book</Text>
                  <Text style={styles.orderbookSubtitle}>BTC/USDT</Text>
                </View>

                <View style={styles.orderbookContent}>
                  <View style={styles.orderbookColumn}>
                    <Text style={styles.orderbookLabel}>Price (USDT)</Text>
                    <Text style={styles.orderbookLabel}>Amount (BTC)</Text>
                  </View>

                  {/* Sell Orders (Red) */}
                  <View style={styles.sellOrders}>
                    <View style={styles.orderRow}>
                      <Text style={styles.sellPrice}>45,678.50</Text>
                      <Text style={styles.orderAmount}>0.1250</Text>
                    </View>
                    <View style={styles.orderRow}>
                      <Text style={styles.sellPrice}>45,677.25</Text>
                      <Text style={styles.orderAmount}>0.0890</Text>
                    </View>
                    <View style={styles.orderRow}>
                      <Text style={styles.sellPrice}>45,676.00</Text>
                      <Text style={styles.orderAmount}>0.2340</Text>
                    </View>
                  </View>

                  {/* Current Price */}
                  <View style={styles.currentPriceRow}>
                    <Text style={styles.currentPrice}>45,675.50</Text>
                    <Text style={styles.currentPriceLabel}>Last Price</Text>
                  </View>

                  {/* Buy Orders (Green) */}
                  <View style={styles.buyOrders}>
                    <View style={styles.orderRow}>
                      <Text style={styles.buyPrice}>45,674.25</Text>
                      <Text style={styles.orderAmount}>0.1560</Text>
                    </View>
                    <View style={styles.orderRow}>
                      <Text style={styles.buyPrice}>45,673.00</Text>
                      <Text style={styles.orderAmount}>0.0890</Text>
                    </View>
                    <View style={styles.orderRow}>
                      <Text style={styles.buyPrice}>45,671.75</Text>
                      <Text style={styles.orderAmount}>0.3120</Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
          </Animated.View>

          {/* Back of Card - Quick Actions */}
          <Animated.View style={[styles.card, styles.cardBack, backAnimatedStyle]}>
            <View style={styles.quickActionsView}>
              <Text style={styles.quickActionsTitle}>Quick Actions</Text>

              <View style={styles.quickActionsGrid}>
                <TouchableOpacity style={styles.quickActionButton}>
                  <LinearGradient
                    colors={['#6366f1', '#8b5cf6']}
                    style={styles.quickActionGradient}
                  >
                    <Icon name="account-balance-wallet" size={24} color="#fff" />
                  </LinearGradient>
                  <Text style={styles.quickActionText}>Deposit</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.quickActionButton}>
                  <LinearGradient
                    colors={['#f59e0b', '#d97706']}
                    style={styles.quickActionGradient}
                  >
                    <Icon name="account-balance" size={24} color="#fff" />
                  </LinearGradient>
                  <Text style={styles.quickActionText}>Withdraw</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.quickActionButton}>
                  <LinearGradient
                    colors={['#10b981', '#059669']}
                    style={styles.quickActionGradient}
                  >
                    <Icon name="swap-horiz" size={24} color="#fff" />
                  </LinearGradient>
                  <Text style={styles.quickActionText}>Convert</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.quickActionButton}>
                  <LinearGradient
                    colors={['#ef4444', '#dc2626']}
                    style={styles.quickActionGradient}
                  >
                    <Icon name="history" size={24} color="#fff" />
                  </LinearGradient>
                  <Text style={styles.quickActionText}>History</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.flipBackButton} onPress={flipCard}>
                <Text style={styles.flipBackButtonText}>Back to Trading</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>

        {/* Bottom spacing for flip button */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Flip Button */}
      <TouchableOpacity style={styles.flipButton} onPress={flipCard}>
        <LinearGradient
          colors={['#ffd700', '#ffed4e']}
          style={styles.flipButtonGradient}
        >
          <Icon name="flip" size={20} color="#000" />
          <Text style={styles.flipButtonText}>Flip Card</Text>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 100, // Space for flip button
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  priceInfo: {
    flex: 1,
  },
  symbol: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  change: {
    fontSize: 14,
    fontWeight: '600',
  },
  positiveChange: {
    color: '#00d4aa',
  },
  negativeChange: {
    color: '#ff6b6b',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  balanceCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#999',
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  currencyText: {
    fontSize: 18,
    color: '#ffd700',
  },
  balanceFiat: {
    fontSize: 16,
    color: '#999',
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  toggleButtonActive: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
  },
  toggleText: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },
  toggleTextActive: {
    color: '#ffd700',
    fontWeight: '600',
  },
  cardContainer: {
    minHeight: 400,
    position: 'relative',
  },
  card: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    backfaceVisibility: 'hidden',
  },
  cardFront: {
    // Front card styles
  },
  cardBack: {
    // Back card styles
  },
  tradingView: {
    flex: 1,
  },
  tradeSection: {
    marginBottom: 24,
  },
  tradeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  tradeLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  availableBalance: {
    fontSize: 12,
    color: '#999',
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  amountInput: {
    flex: 1,
    fontSize: 18,
    color: '#fff',
    paddingVertical: 0,
  },
  currencyButton: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  currencyButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffd700',
  },
  percentageButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  percentageButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  percentageButtonActive: {
    backgroundColor: 'rgba(0, 212, 170, 0.2)',
  },
  percentageButtonText: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
  percentageButtonTextActive: {
    color: '#00d4aa',
    fontWeight: '600',
  },
  percentageButtonActiveSell: {
    backgroundColor: 'rgba(255, 107, 107, 0.2)',
  },
  percentageButtonTextActiveSell: {
    color: '#ff6b6b',
    fontWeight: '600',
  },
  buyButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  buyGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  buyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  sellButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  sellGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  sellButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 16,
  },
  portfolioView: {
    flex: 1,
  },
  portfolioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  portfolioTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  refreshButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  assetItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  assetInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  assetIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  assetIconText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffd700',
  },
  assetDetails: {
    gap: 2,
  },
  assetName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  assetSymbol: {
    fontSize: 14,
    color: '#999',
  },
  assetValue: {
    alignItems: 'flex-end',
    gap: 2,
  },
  assetAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  assetPrice: {
    fontSize: 14,
    color: '#999',
  },
  orderbookView: {
    flex: 1,
  },
  orderbookHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  orderbookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  orderbookSubtitle: {
    fontSize: 14,
    color: '#999',
  },
  orderbookContent: {
    flex: 1,
  },
  orderbookColumn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 12,
  },
  orderbookLabel: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
  sellOrders: {
    marginBottom: 16,
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  sellPrice: {
    fontSize: 14,
    color: '#ff6b6b',
    fontWeight: '500',
  },
  buyPrice: {
    fontSize: 14,
    color: '#00d4aa',
    fontWeight: '500',
  },
  orderAmount: {
    fontSize: 14,
    color: '#fff',
  },
  currentPriceRow: {
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderRadius: 8,
    marginVertical: 8,
  },
  currentPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: 2,
  },
  currentPriceLabel: {
    fontSize: 12,
    color: '#999',
  },
  buyOrders: {
    marginTop: 16,
  },
  quickActionsView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 32,
  },
  quickActionButton: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
  },
  quickActionGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
  flipBackButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  flipBackButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  bottomSpacing: {
    height: 20,
  },
  flipButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  flipButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
  },
  flipButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  toggleContainer: {
    marginBottom: 16,
  },
  toggleBackground: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 2,
    alignItems: 'center',
  },
  toggleIndicator: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ffd700',
    zIndex: 1,
  },
  toggleViewButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  toggleViewText: {
    fontSize: 14,
    fontWeight: '500',
  },
  graphContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  graphTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  graphBars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
  },
  barContainer: {
    alignItems: 'center',
    width: 50,
  },
  bar: {
    width: 20,
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    borderRadius: 10,
    marginBottom: 8,
  },
  barLabel: {
    fontSize: 12,
    color: '#999',
  },
  barAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  cardsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  cardsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  transactionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardInfo: {
    gap: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  cardDate: {
    fontSize: 12,
    color: '#999',
  },
  cardAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ff6b6b',
  },
  walletContainer: {
    marginBottom: 16,
  },
  walletCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
  },
  walletGradient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  walletHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  walletTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  walletAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 4,
  },
  walletCurrency: {
    fontSize: 16,
    color: '#999',
  },
  todaySpentCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  todaySpentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  todaySpentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  todaySpentAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ff6b6b',
    marginBottom: 4,
  },
  todaySpentLabel: {
    fontSize: 14,
    color: '#999',
  },
  spendingBreakdown: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
  },
  breakdownTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  breakdownLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  breakdownIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  breakdownText: {
    fontSize: 14,
    color: '#fff',
  },
  breakdownAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ff6b6b',
  },
});

export default ExchangeView; 