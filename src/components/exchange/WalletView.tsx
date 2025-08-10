import React from 'react';
import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles';

type WalletData = {
  totalBalance: number;
  todaySpent: number;
  currency: string;
};

type Props = { walletData: WalletData };

const WalletView: React.FC<Props> = ({ walletData }) => {
  return (
    <View style={styles.walletContainer}>
      <View style={styles.walletCard}>
        <LinearGradient colors={['#6366f1', '#8b5cf6']} style={styles.walletGradient}>
          <View style={styles.walletHeader}>
            <Text style={styles.walletTitle}>Total Balance</Text>
            <Icon name="account-balance-wallet" size={24} color="#fff" />
          </View>
          <Text style={styles.walletAmount}>${walletData.totalBalance.toLocaleString()}</Text>
          <Text style={styles.walletCurrency}>{walletData.currency}</Text>
        </LinearGradient>
      </View>

      <View style={styles.todaySpentCard}>
        <View style={styles.todaySpentHeader}>
          <Text style={styles.todaySpentTitle}>Today's Spending</Text>
          <Icon name="trending-up" size={20} color="#ff6b6b" />
        </View>
        <Text style={styles.todaySpentAmount}>${walletData.todaySpent}</Text>
        <Text style={styles.todaySpentLabel}>Total spent today</Text>
      </View>

      <View style={styles.spendingBreakdown}>
        <Text style={styles.breakdownTitle}>Spending Breakdown</Text>
        <View style={styles.breakdownItem}>
          <View style={styles.breakdownLeft}>
            <View style={[styles.breakdownIcon, { backgroundColor: '#6366f1' }]}>
              <Icon name="restaurant" size={16} color="#fff" />
            </View>
            <Text style={styles.breakdownText}>Food & Dining</Text>
          </View>
          <Text style={styles.breakdownAmount}>$89.45</Text>
        </View>
        <View style={styles.breakdownItem}>
          <View style={styles.breakdownLeft}>
            <View style={[styles.breakdownIcon, { backgroundColor: '#f59e0b' }]}>
              <Icon name="directions-car" size={16} color="#fff" />
            </View>
            <Text style={styles.breakdownText}>Transportation</Text>
          </View>
          <Text style={styles.breakdownAmount}>$28.50</Text>
        </View>
        <View style={styles.breakdownItem}>
          <View style={styles.breakdownLeft}>
            <View style={[styles.breakdownIcon, { backgroundColor: '#10b981' }]}>
              <Icon name="shopping-cart" size={16} color="#fff" />
            </View>
            <Text style={styles.breakdownText}>Shopping</Text>
          </View>
          <Text style={styles.breakdownAmount}>$127.35</Text>
        </View>
      </View>
    </View>
  );
};

export default WalletView;


