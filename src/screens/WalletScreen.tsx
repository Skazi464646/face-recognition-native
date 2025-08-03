import React from 'react'
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
import { useWalletPay } from '../../hooks/useWalletFunctions';

const {width} = Dimensions.get('window');
function WalletScreen() {
      const isDarkMode = useColorScheme() === 'dark';
  const {
    cards,
    selectedCard,
    transactions,
    isProcessing,
    fadeAnim,
    slideAnim,
    scaleAnim,
    processingScale,
    processingOpacity,
    addCard,
    handleCardPress,
    processPayment,
    getCardIcon,
    getStatusColor,
  } = useWalletPay();
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#1f2937' : '#f8fafc' }]}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

            {/* Animated Header */}
            <Animated.View
                style={[
                    styles.headerContainer,
                    {
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }],
                    },
                ]}
            >
                <LinearGradient
                    colors={['#3b82f6', '#1d4ed8']}
                    style={styles.header}
                >
                    <Text style={styles.headerTitle}>Wallet</Text>
                    <Text style={styles.headerSubtitle}>Secure NFC Payments</Text>
                </LinearGradient>
            </Animated.View>

            <Animated.ScrollView
                style={[
                    styles.content,
                    {
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }],
                    },
                ]}
                showsVerticalScrollIndicator={false}
            >
                {/* Cards Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={[styles.sectionTitle, { color: isDarkMode ? '#f9fafb' : '#111827' }]}>
                            Your Card
                        </Text>
                        <TouchableOpacity onPress={addCard} style={styles.addButton}>
                            <Icon name="add" size={20} color="#3b82f6" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardsContainer}>
                        {cards.map((card, index) => (
                            <Animated.View
                                key={card.id}
                                style={{
                                    opacity: fadeAnim,
                                    transform: [
                                        { translateX: slideAnim },
                                        { scale: scaleAnim },
                                    ],
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => handleCardPress(card)}
                                    style={[
                                        styles.card,
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
                                    <Text style={styles.cardBalance}>${card.balance.toFixed(2)}</Text>
                                </TouchableOpacity>
                            </Animated.View>
                        ))}
                    </ScrollView>
                </View>

                {/* Quick Payment Section */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: isDarkMode ? '#f9fafb' : '#111827' }]}>
                        Quick Payment
                    </Text>

                    <View style={styles.quickPaymentGrid}>
                        {[
                            { name: 'Coffee', amount: 4.50, icon: 'local-cafe' },
                            { name: 'Lunch', amount: 15.99, icon: 'restaurant' },
                            { name: 'Gas', amount: 45.00, icon: 'local-gas-station' },
                            { name: 'Custom', amount: 0, icon: 'edit' },
                        ].map((item, index) => (
                            <Animated.View
                                key={index}
                                style={{
                                    opacity: fadeAnim,
                                    transform: [
                                        { translateY: slideAnim },
                                        { scale: scaleAnim },
                                    ],
                                }}
                            >
                                <TouchableOpacity
                                    style={[styles.quickPaymentItem, { backgroundColor: isDarkMode ? '#374151' : '#fff' }]}
                                    onPress={() => {
                                        if (item.name === 'Custom') {
                                            Alert.prompt(
                                                'Custom Payment',
                                                'Enter amount:',
                                                [
                                                    { text: 'Cancel', style: 'cancel' },
                                                    {
                                                        text: 'Pay',
                                                        onPress: (amount: string | undefined) => {
                                                            if (amount && !isNaN(Number(amount))) {
                                                                processPayment(Number(amount), 'Custom Payment');
                                                            }
                                                        },
                                                    },
                                                ],
                                                'plain-text',
                                                '0'
                                            );
                                        } else {
                                            processPayment(item.amount, item.name);
                                        }
                                    }}
                                    disabled={isProcessing}
                                >
                                    <Icon name={item.icon} size={32} color="#3b82f6" />
                                    <Text style={[styles.quickPaymentText, { color: isDarkMode ? '#e5e7eb' : '#374151' }]}>
                                        {item.name}
                                    </Text>
                                    <Text style={styles.quickPaymentAmount}>
                                        ${item.amount > 0 ? item.amount.toFixed(2) : 'Custom'}
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

                    {transactions.slice(0, 5).map((transaction, index) => (
                        <Animated.View
                            key={transaction.id}
                            style={{
                                opacity: fadeAnim,
                                transform: [
                                    { translateX: slideAnim },
                                    { scale: scaleAnim },
                                ],
                            }}
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
                    {
                        opacity: processingOpacity,
                        transform: [{ scale: processingScale }],
                    },
                ]}
                pointerEvents={isProcessing ? 'auto' : 'none'}
            >
                <View style={styles.processingContent}>
                    <Icon name="nfc" size={48} color="#3b82f6" />
                    <Text style={styles.processingText}>Processing Payment...</Text>
                    <Text style={styles.processingSubtext}>Hold your device near the terminal</Text>
                </View>
            </Animated.View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    
  },
  header: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#0909d4ff',
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