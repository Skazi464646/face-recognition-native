import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

interface CardsSectionProps {
  balance?: string;
  currency?: string;
  progressPercentage?: number;
  availableLimit?: string;
  onPress?: () => void;
}

const CardsSection: React.FC<CardsSectionProps> = ({
  balance = '5,749.08',
  currency = 'AED',
  progressPercentage = 85,
  availableLimit = '-749.08 AED',
  onPress,
}) => {
  return (
    <View style={styles.container}>
      {/* Modern Card Container */}
      <View style={styles.cardContainer}>
        {/* Section Header */}
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={onPress}
          activeOpacity={0.7}
        >
          <View style={styles.titleRow}>
            <Icon name="credit-card" size={24} color="#667eea" />
            <Text style={styles.sectionTitle}>CARDS</Text>
            <Icon name="chevron-double-right" size={18} color="#6b7280" />
          </View>
        </TouchableOpacity>

        {/* Balance Display */}
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceAmount}>{balance}</Text>
          <Text style={styles.balanceCurrency}>{currency}</Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={[
                styles.progressFill,
                { width: `${progressPercentage}%` }
              ]}
            />
          </View>
        </View>

        {/* Limit Information */}
        <View style={styles.limitInfo}>
          <Text style={styles.limitLabel}>Available limit</Text>
          <Text style={styles.limitAmount}>{availableLimit}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  cardContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 12,
  },
  sectionHeader: {
    marginBottom: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1f2937',
    letterSpacing: -0.5,
  },
  balanceContainer: {
    marginTop: 20,
    marginBottom: 16,
  },
  balanceAmount: {
    fontSize: 40,
    fontWeight: '800',
    color: '#1f2937',
    marginBottom: 6,
    letterSpacing: -1,
  },
  balanceCurrency: {
    fontSize: 18,
    color: '#6b7280',
    fontWeight: '600',
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  limitInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  limitLabel: {
    color: '#6b7280',
    fontSize: 16,
    fontWeight: '500',
  },
  limitAmount: {
    color: '#ef4444',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default CardsSection; 