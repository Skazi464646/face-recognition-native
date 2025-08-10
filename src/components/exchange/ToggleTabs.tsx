import React from 'react';
import { View, TouchableOpacity, Text, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, interpolate, SharedValue } from 'react-native-reanimated';
import { styles } from './styles';

const { width: screenWidth } = Dimensions.get('window');

type Props = {
  togglePosition: SharedValue<number>;
  onSelect: (view: 'exchange' | 'wallet') => void;
};

const ToggleTabs: React.FC<Props> = ({ togglePosition, onSelect }) => {
  const toggleIndicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: interpolate(togglePosition.value, [0, 1], [4, screenWidth / 2 - 2]) }],
  }));

  const exchangeTextStyle = useAnimatedStyle(() => ({
    color: interpolate(togglePosition.value, [0, 1], [1, 0.5]) === 1 ? '#ffd700' : '#999',
  }));

  const walletTextStyle = useAnimatedStyle(() => ({
    color: interpolate(togglePosition.value, [0, 1], [0.5, 1]) === 1 ? '#ffd700' : '#999',
  }));

  return (
    <View style={styles.toggleContainer}>
      <View style={styles.toggleBackground}>
        <Animated.View style={[styles.toggleIndicator, toggleIndicatorStyle]} />
        <TouchableOpacity style={styles.toggleViewButton} onPress={() => onSelect('exchange')}>
          <Animated.Text style={[styles.toggleViewText, exchangeTextStyle]}>Exchange</Animated.Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleViewButton} onPress={() => onSelect('wallet')}>
          <Animated.Text style={[styles.toggleViewText, walletTextStyle]}>Wallet</Animated.Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ToggleTabs;


