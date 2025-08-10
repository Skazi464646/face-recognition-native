import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './styles';

type Props = {
  buyAmount: string;
  sellAmount: string;
  buyPercentage: number;
  sellPercentage: number;
  onChangeBuy: (v: string) => void;
  onChangeSell: (v: string) => void;
  onBuyPct: (pct: number) => void;
  onSellPct: (pct: number) => void;
  onBuy: () => void;
  onSell: () => void;
};

const TradingCard: React.FC<Props> = ({
  buyAmount,
  sellAmount,
  buyPercentage,
  sellPercentage,
  onChangeBuy,
  onChangeSell,
  onBuyPct,
  onSellPct,
  onBuy,
  onSell,
}) => {
  return (
    <View style={styles.tradingView}>
      {/* Buy */}
      <View style={styles.tradeSection}>
        <View style={styles.tradeHeader}>
          <Text style={styles.tradeLabel}>Buy BTC</Text>
          <Text style={styles.availableBalance}>Available: 1,234.56 USDT</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.amountInput}
            placeholder="0.00"
            placeholderTextColor="#666"
            value={buyAmount}
            onChangeText={onChangeBuy}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.currencyButton}>
            <Text style={styles.currencyButtonText}>USDT</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.percentageButtons}>
          {[25, 50, 75, 100].map((pct) => (
            <TouchableOpacity
              key={pct}
              style={[styles.percentageButton, buyPercentage === pct && styles.percentageButtonActive]}
              onPress={() => onBuyPct(pct)}
            >
              <Text style={[styles.percentageButtonText, buyPercentage === pct && styles.percentageButtonTextActive]}>
                {pct}%
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.buyButton} onPress={onBuy}>
          <LinearGradient colors={['#00d4aa', '#00b894']} style={styles.buyGradient}>
            <Text style={styles.buyButtonText}>Buy BTC</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      {/* Sell */}
      <View style={styles.tradeSection}>
        <View style={styles.tradeHeader}>
          <Text style={styles.tradeLabel}>Sell BTC</Text>
          <Text style={styles.availableBalance}>Available: 0.00155824 BTC</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.amountInput}
            placeholder="0.00"
            placeholderTextColor="#666"
            value={sellAmount}
            onChangeText={onChangeSell}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.currencyButton}>
            <Text style={styles.currencyButtonText}>BTC</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.percentageButtons}>
          {[25, 50, 75, 100].map((pct) => (
            <TouchableOpacity
              key={pct}
              style={[styles.percentageButton, sellPercentage === pct && styles.percentageButtonActiveSell]}
              onPress={() => onSellPct(pct)}
            >
              <Text style={[styles.percentageButtonText, sellPercentage === pct && styles.percentageButtonTextActiveSell]}>
                {pct}%
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.sellButton} onPress={onSell}>
          <LinearGradient colors={['#ff6b6b', '#ee5a52']} style={styles.sellGradient}>
            <Text style={styles.sellButtonText}>Sell BTC</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TradingCard;


