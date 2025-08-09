import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

const WalletView: React.FC = () => {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'assets' | 'transactions'>('assets');

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a1a2e', '#16213e', '#0f0f23']}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      <ScrollView 
        style={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Premium Wallet Balance Card */}
        <LinearGradient
          colors={['rgba(255, 215, 0, 0.15)', 'rgba(255, 215, 0, 0.05)', 'rgba(255, 255, 255, 0.02)']}
          style={styles.balanceCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.balanceLabel}>Portfolio Value</Text>
              <View style={styles.premiumBadge}>
                <Icon name="star" size={12} color="#ffd700" />
                <Text style={styles.premiumText}>Premium</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.eyeButton}
              onPress={() => setBalanceVisible(!balanceVisible)}
            >
              <Icon 
                name={balanceVisible ? "visibility" : "visibility-off"} 
                size={22} 
                color="#ffd700" 
              />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.balanceAmount}>
            {balanceVisible ? '$ 2,847.32' : '••••••'}
          </Text>
          
          <View style={styles.balanceDetails}>
            <View style={styles.changeContainer}>
              <LinearGradient
                colors={['#00d4aa', '#00b894']}
                style={styles.changeIcon}
              >
                <Icon name="trending-up" size={14} color="#fff" />
              </LinearGradient>
              <Text style={styles.changeText}>+$ 124.50</Text>
              <Text style={styles.changePercent}>(+4.58%)</Text>
            </View>
            <Text style={styles.timeframe}>Today</Text>
          </View>
          
          {/* Sparkline placeholder */}
          <View style={styles.sparklineContainer}>
            <View style={styles.sparklineDot} />
            <View style={styles.sparklineLine} />
            <View style={[styles.sparklineDot, { backgroundColor: '#00d4aa' }]} />
          </View>
        </LinearGradient>

        {/* Enhanced Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <LinearGradient
              colors={['#00d4aa', '#00b894']}
              style={styles.actionGradient}
            >
              <Icon name="add" size={26} color="#fff" />
            </LinearGradient>
            <Text style={styles.actionText}>Deposit</Text>
            <View style={styles.actionIndicator} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <LinearGradient
              colors={['#ff6b6b', '#ee5a52']}
              style={styles.actionGradient}
            >
              <Icon name="trending-down" size={26} color="#fff" />
            </LinearGradient>
            <Text style={styles.actionText}>Withdraw</Text>
            <View style={styles.actionIndicator} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <LinearGradient
              colors={['#6366f1', '#8b5cf6']}
              style={styles.actionGradient}
            >
              <Icon name="compare-arrows" size={26} color="#fff" />
            </LinearGradient>
            <Text style={styles.actionText}>Swap</Text>
            <View style={styles.actionIndicator} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <LinearGradient
              colors={['#ffd700', '#ffb300']}
              style={styles.actionGradient}
            >
              <Icon name="qr-code-scanner" size={26} color="#fff" />
            </LinearGradient>
            <Text style={styles.actionText}>Pay</Text>
            <View style={styles.actionIndicator} />
          </TouchableOpacity>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabNavigation}>
          <TouchableOpacity 
            style={[styles.tabButton, selectedTab === 'assets' && styles.activeTab]}
            onPress={() => setSelectedTab('assets')}
          >
            <Text style={[styles.tabText, selectedTab === 'assets' && styles.activeTabText]}>Assets</Text>
            {selectedTab === 'assets' && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabButton, selectedTab === 'transactions' && styles.activeTab]}
            onPress={() => setSelectedTab('transactions')}
          >
            <Text style={[styles.tabText, selectedTab === 'transactions' && styles.activeTabText]}>Activity</Text>
            {selectedTab === 'transactions' && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
        </View>

        {/* Assets Section */}
        {selectedTab === 'assets' && (
          <View style={styles.assetsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Your Holdings</Text>
              <TouchableOpacity style={styles.viewAllButton}>
                <Text style={styles.viewAllText}>View All</Text>
                <Icon name="arrow-forward-ios" size={14} color="#ffd700" />
              </TouchableOpacity>
            </View>

            {/* Premium Asset Items */}
            {[
              { name: 'Bitcoin', symbol: 'BTC', amount: '0.0234', value: '$ 1,234.56', change: '+2.34%', color: '#f7931a', icon: '₿' },
              { name: 'Ethereum', symbol: 'ETH', amount: '2.456', value: '$ 987.65', change: '-1.23%', color: '#627eea', icon: 'Ξ' },
              { name: 'Tether', symbol: 'USDT', amount: '500.00', value: '$ 500.00', change: '0.00%', color: '#26a17b', icon: '₮' },
              { name: 'Binance Coin', symbol: 'BNB', amount: '1.234', value: '$ 125.11', change: '+5.67%', color: '#f3ba2f', icon: 'B' },
            ].map((asset, index) => (
              <TouchableOpacity key={index} style={styles.assetItem}>
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.02)']}
                  style={styles.assetGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.assetLeft}>
                    <LinearGradient
                      colors={[asset.color, `${asset.color}CC`]}
                      style={styles.assetIcon}
                    >
                      <Text style={styles.assetSymbolIcon}>{asset.icon}</Text>
                    </LinearGradient>
                    <View style={styles.assetInfo}>
                      <Text style={styles.assetName}>{asset.name}</Text>
                      <Text style={styles.assetAmount}>{asset.amount} {asset.symbol}</Text>
                    </View>
                  </View>
                  <View style={styles.assetRight}>
                    <Text style={styles.assetValue}>{asset.value}</Text>
                    <View style={styles.changeContainer}>
                      <Icon 
                        name={asset.change.startsWith('+') ? 'keyboard-arrow-up' : asset.change.startsWith('-') ? 'keyboard-arrow-down' : 'remove'}
                        size={16} 
                        color={asset.change.startsWith('+') ? '#00d4aa' : asset.change.startsWith('-') ? '#ff6b6b' : '#999'}
                      />
                      <Text style={[
                        styles.assetChange,
                        asset.change.startsWith('+') ? styles.positiveChange : 
                        asset.change.startsWith('-') ? styles.negativeChange : styles.neutralChange
                      ]}>
                        {asset.change}
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Recent Activity */}
        {selectedTab === 'transactions' && (
          <View style={styles.transactionsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Activity</Text>
              <TouchableOpacity style={styles.viewAllButton}>
                <Text style={styles.viewAllText}>View All</Text>
                <Icon name="arrow-forward-ios" size={14} color="#ffd700" />
              </TouchableOpacity>
            </View>

            {[
              { type: 'buy', asset: 'Bitcoin', amount: '+0.0012 BTC', value: '$ 65.43', time: '2 hours ago', color: '#00d4aa', status: 'completed' },
              { type: 'sell', asset: 'Ethereum', amount: '-0.05 ETH', value: '$ 98.76', time: '1 day ago', color: '#ff6b6b', status: 'completed' },
              { type: 'deposit', asset: 'USD Tether', amount: '+100 USDT', value: '$ 100.00', time: '2 days ago', color: '#6366f1', status: 'pending' },
              { type: 'swap', asset: 'BNB → ETH', amount: '1.2 BNB', value: '$ 320.45', time: '3 days ago', color: '#f3ba2f', status: 'completed' },
            ].map((tx, index) => (
              <TouchableOpacity key={index} style={styles.transactionItem}>
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.06)', 'rgba(255, 255, 255, 0.02)']}
                  style={styles.transactionGradient}
                >
                  <View style={styles.transactionLeft}>
                    <LinearGradient
                      colors={[tx.color, `${tx.color}AA`]}
                      style={styles.transactionIcon}
                    >
                      <Icon 
                        name={tx.type === 'buy' ? 'trending-up' : tx.type === 'sell' ? 'trending-down' : tx.type === 'swap' ? 'swap-horiz' : 'account-balance-wallet'} 
                        size={18} 
                        color="#fff" 
                      />
                    </LinearGradient>
                    <View style={styles.transactionInfo}>
                      <Text style={styles.transactionAsset}>{tx.asset}</Text>
                      <View style={styles.transactionMeta}>
                        <Text style={styles.transactionTime}>{tx.time}</Text>
                        <View style={[styles.statusBadge, { backgroundColor: tx.status === 'completed' ? '#00d4aa20' : '#ffd70020' }]}>
                          <Text style={[styles.statusText, { color: tx.status === 'completed' ? '#00d4aa' : '#ffd700' }]}>
                            {tx.status}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.transactionRight}>
                    <Text style={[styles.transactionAmount, { 
                      color: tx.amount.startsWith('+') ? '#00d4aa' : tx.amount.startsWith('-') ? '#ff6b6b' : '#fff' 
                    }]}>
                      {tx.amount}
                    </Text>
                    <Text style={styles.transactionValue}>{tx.value}</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f23',
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  balanceCard: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 32,
    shadowColor: '#ffd700',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
    gap: 4,
  },
  premiumText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#ffd700',
  },
  balanceLabel: {
    fontSize: 16,
    color: '#bbb',
    fontWeight: '500',
  },
  eyeButton: {
    padding: 8,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderRadius: 12,
  },
  balanceAmount: {
    fontSize: 42,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  balanceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  changeIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  changePercent: {
    fontSize: 14,
    color: '#00d4aa',
    fontWeight: '500',
  },
  timeframe: {
    fontSize: 14,
    color: '#999',
  },
  sparklineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  sparklineDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ffd700',
  },
  sparklineLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 215, 0, 0.3)',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  actionButton: {
    alignItems: 'center',
    flex: 1,
  },
  actionGradient: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  actionText: {
    fontSize: 13,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  actionIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginTop: 4,
  },
  tabNavigation: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    marginBottom: 24,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
    position: 'relative',
  },
  activeTab: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#999',
  },
  activeTabText: {
    color: '#ffd700',
    fontWeight: '600',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: -2,
    width: 20,
    height: 2,
    backgroundColor: '#ffd700',
    borderRadius: 1,
  },
  assetsSection: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllText: {
    fontSize: 14,
    color: '#ffd700',
    fontWeight: '500',
  },
  assetItem: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  assetGradient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
  },
  assetLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  assetIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  assetSymbolIcon: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  assetInfo: {
    gap: 6,
  },
  assetName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
  },
  assetAmount: {
    fontSize: 14,
    color: '#bbb',
    fontWeight: '400',
  },
  assetRight: {
    alignItems: 'flex-end',
    gap: 6,
  },
  assetValue: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
  },
  assetChange: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 2,
  },
  positiveChange: {
    color: '#00d4aa',
  },
  negativeChange: {
    color: '#ff6b6b',
  },
  neutralChange: {
    color: '#999',
  },
  transactionsSection: {
    marginBottom: 32,
  },
  transactionItem: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  transactionGradient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  transactionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionInfo: {
    gap: 6,
  },
  transactionAsset: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
  },
  transactionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  transactionTime: {
    fontSize: 13,
    color: '#bbb',
  },
  statusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  transactionRight: {
    alignItems: 'flex-end',
    gap: 6,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  transactionValue: {
    fontSize: 14,
    color: '#bbb',
  },
});

export default WalletView;