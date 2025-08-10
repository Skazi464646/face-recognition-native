import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles';

type Props = {
  symbol: string;
  price: number;
  changePct: number;
};

const HeaderPrice: React.FC<Props> = ({ symbol, price, changePct }) => {
  return (
    <View style={styles.header}>
      <View style={styles.priceInfo}>
        <Text style={styles.symbol}>{symbol}</Text>
        <Text style={styles.price}>${price.toLocaleString()}</Text>
        <Text style={[styles.change, changePct >= 0 ? styles.positiveChange : styles.negativeChange]}>
          {changePct >= 0 ? '+' : ''}{changePct}%
        </Text>
      </View>
      <View style={styles.headerActions}>
        <TouchableOpacity style={styles.headerButton}>
          <Icon name="alarm" size={20} color="#ffd700" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton}>
          <Icon name="more-vert" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderPrice;


