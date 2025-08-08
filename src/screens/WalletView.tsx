import React from 'react';
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
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Wallet Balance Card */}
      <View style={styles.balanceCard}>
        <View style={styles.balanceHeader}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <TouchableOpacity style={styles.eyeButton}>
            <Icon name="visibility" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.balanceAmount}>$ 2,847.32</Text>
        <View style={styles.balanceChange}>
          <Icon name="trending-up" size={16} color="#00d4aa" />
          <Text style={styles.changeText}>+$ 124.50 (+4.58%)</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionButton}>
          <LinearGradient
            colors={['#00d4aa', '#00b894']}
            style={styles.actionGradient}
          >
            <Icon name="add" size={24} color="#fff" />
          </LinearGradient>
          <Text style={styles.actionText}>Deposit</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <LinearGradient
            colors={['#ff6b6b', '#ee5a52']}
            style={styles.actionGradient}
          >
            <Icon name="remove" size={24} color="#fff" />
          </LinearGradient>
          <Text style={styles.actionText}>Withdraw</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <LinearGradient
            colors={['#6366f1', '#8b5cf6']}
            style={styles.actionGradient}
          >
            <Icon name="swap-horiz" size={24} color="#fff" />
          </LinearGradient>
          <Text style={styles.actionText}>Convert</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <LinearGradient
            colors={['#ffd700', '#ffb300']}
            style={styles.actionGradient}
          >
            <Icon name="send" size={24} color="#fff" />
          </LinearGradient>
          <Text style={styles.actionText}>Send</Text>
        </TouchableOpacity>
      </View>

      {/* Assets List */}
      <View style={styles.assetsSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Assets</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* Asset Items */}
        {[
          { name: 'Bitcoin', symbol: 'BTC', amount: '0.0234', value: '$ 1,234.56', change: '+2.34%', color: '#f7931a' },
          { name: 'Ethereum', symbol: 'ETH', amount: '2.456', value: '$ 987.65', change: '-1.23%', color: '#627eea' },
          { name: 'USDT', symbol: 'USDT', amount: '500.00', value: '$ 500.00', change: '0.00%', color: '#26a17b' },
          { name: 'BNB', symbol: 'BNB', amount: '1.234', value: '$ 125.11', change: '+5.67%', color: '#f3ba2f' },
        ].map((asset, index) => (
          <TouchableOpacity key={index} style={styles.assetItem}>
            <View style={styles.assetLeft}>
              <View style={[styles.assetIcon, { backgroundColor: asset.color }]}>
                <Text style={styles.assetSymbol}>{asset.symbol}</Text>
              </View>
              <View style={styles.assetInfo}>
                <Text style={styles.assetName}>{asset.name}</Text>
                <Text style={styles.assetAmount}>{asset.amount} {asset.symbol}</Text>
              </View>
            </View>
            <View style={styles.assetRight}>
              <Text style={styles.assetValue}>{asset.value}</Text>
              <Text style={[
                styles.assetChange,
                asset.change.startsWith('+') ? styles.positiveChange : styles.negativeChange
              ]}>
                {asset.change}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Recent Transactions */}
      <View style={styles.transactionsSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        {[
          { type: 'buy', asset: 'BTC', amount: '+0.0012 BTC', value: '$ 65.43', time: '2 hours ago', color: '#00d4aa' },
          { type: 'sell', asset: 'ETH', amount: '-0.05 ETH', value: '$ 98.76', time: '1 day ago', color: '#ff6b6b' },
          { type: 'deposit', asset: 'USDT', amount: '+100 USDT', value: '$ 100.00', time: '2 days ago', color: '#6366f1' },
        ].map((tx, index) => (
          <View key={index} style={styles.transactionItem}>
            <View style={styles.transactionLeft}>
              <View style={[styles.transactionIcon, { backgroundColor: tx.color }]}>
                <Icon 
                  name={tx.type === 'buy' ? 'trending-up' : tx.type === 'sell' ? 'trending-down' : 'account-balance-wallet'} 
                  size={16} 
                  color="#fff" 
                />
              </View>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionAsset}>{tx.asset}</Text>
                <Text style={styles.transactionTime}>{tx.time}</Text>
              </View>
            </View>
            <View style={styles.transactionRight}>
              <Text style={styles.transactionAmount}>{tx.amount}</Text>
              <Text style={styles.transactionValue}>{tx.value}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  balanceCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#999',
  },
  eyeButton: {
    padding: 4,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  balanceChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  changeText: {
    fontSize: 14,
    color: '#00d4aa',
    fontWeight: '500',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionButton: {
    alignItems: 'center',
    flex: 1,
  },
  actionGradient: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
  assetsSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  viewAllText: {
    fontSize: 14,
    color: '#ffd700',
  },
  assetItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  assetLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  assetIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  assetSymbol: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  assetInfo: {
    gap: 4,
  },
  assetName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  assetAmount: {
    fontSize: 14,
    color: '#999',
  },
  assetRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  assetValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  assetChange: {
    fontSize: 14,
    fontWeight: '500',
  },
  positiveChange: {
    color: '#00d4aa',
  },
  negativeChange: {
    color: '#ff6b6b',
  },
  transactionsSection: {
    marginBottom: 24,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  transactionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionInfo: {
    gap: 4,
  },
  transactionAsset: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  transactionTime: {
    fontSize: 14,
    color: '#999',
  },
  transactionRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  transactionValue: {
    fontSize: 14,
    color: '#999',
  },
});

export default WalletView; 