import { useState, useEffect } from 'react';
import { Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSharedValue, withTiming } from 'react-native-reanimated';

export interface Card {
  id: string;
  name: string;
  number: string;
  type: 'visa' | 'mastercard' | 'amex';
  balance: number;
  color: string;
}

export interface Transaction {
  id: string;
  amount: number;
  merchant: string;
  date: string;
  type: 'payment' | 'refund';
  status: 'completed' | 'pending' | 'failed';
}

export function useWalletPay() {
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Animation values - using Reanimated shared values
  const processingScale = useSharedValue(0);
  const processingOpacity = useSharedValue(0);

  useEffect(() => {
    loadData();
  }, []);

  const triggerHaptic = () => {
    if (Platform.OS === 'ios') {
      console.log('Haptic feedback triggered');
    }
  };

  const loadData = async () => {
    try {
      const savedCards = await AsyncStorage.getItem('wallet_cards');
      const savedTransactions = await AsyncStorage.getItem('transactions');
      if (savedCards) {
        setCards(JSON.parse(savedCards));
      } else {
        const sampleCards: Card[] = [
          {
            id: '1',
            name: ' Gold Sapphire',
            number: '**** **** **** 1234',
            type: 'visa',
            balance: 2547.89,
            color: '#1e3a8a',
          },
          {
            id: '2',
            name: 'Amex Gold',
            number: '**** **** **** 5678',
            type: 'amex',
            balance: 1892.45,
            color: '#f59e0b',
          },
        ];
        setCards(sampleCards);
        await AsyncStorage.setItem('wallet_cards', JSON.stringify(sampleCards));
      }
      if (savedTransactions) {
        setTransactions(JSON.parse(savedTransactions));
      } else {
        const sampleTransactions: Transaction[] = [
          {
            id: '1',
            amount: 45.67,
            merchant: 'Starbucks',
            date: '2024-01-15',
            type: 'payment',
            status: 'completed',
          },
          {
            id: '2',
            amount: 129.99,
            merchant: 'Amazon',
            date: '2024-01-14',
            type: 'payment',
            status: 'completed',
          },
        ];
        setTransactions(sampleTransactions);
        await AsyncStorage.setItem('transactions', JSON.stringify(sampleTransactions));
      }
    } catch (error) {
      console.log('Error loading data:', error);
    }
  };

  const processPayment = async (amount: number, merchant: string) => {
    if (!selectedCard) {
      Alert.alert('Error', 'Please select a card first');
      return;
    }
    setIsProcessing(true);
    triggerHaptic();
    processingOpacity.value = withTiming(1, { duration: 300 });
    processingScale.value = withTiming(1, { duration: 300 });
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        amount,
        merchant,
        date: new Date().toISOString().split('T')[0],
        type: 'payment',
        status: 'completed',
      };
      const updatedTransactions = [newTransaction, ...transactions];
      setTransactions(updatedTransactions);
      await AsyncStorage.setItem('transactions', JSON.stringify(updatedTransactions));
      const updatedCards = cards.map(card =>
        card.id === selectedCard.id
          ? {...card, balance: card.balance - amount}
          : card
      );
      setCards(updatedCards);
      await AsyncStorage.setItem('wallet_cards', JSON.stringify(updatedCards));
      processingOpacity.value = withTiming(0, { duration: 300 });
      processingScale.value = withTiming(0, { duration: 300 });
      setTimeout(() => {
        setIsProcessing(false);
        Alert.alert('Success', `Payment of $${amount.toFixed(2)} to ${merchant} completed!`);
      }, 300);
    } catch (error) {
      console.log('Payment error:', error);
      Alert.alert('Error', 'Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  const addCard = () => {
    triggerHaptic();
    Alert.prompt(
      'Add New Card',
      'Enter card name:',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Add',
          onPress: (name: string | undefined) => {
            if (name) {
              const newCard: Card = {
                id: Date.now().toString(),
                name,
                number: '**** **** **** ' + Math.floor(Math.random() * 9000 + 1000),
                type: ['visa', 'mastercard', 'amex'][Math.floor(Math.random() * 3)] as any,
                balance: Math.floor(Math.random() * 5000) + 1000,
                color: ['#1e3a8a', '#dc2626', '#059669', '#7c3aed'][Math.floor(Math.random() * 4)],
              };
              const updatedCards = [...cards, newCard];
              setCards(updatedCards);
              AsyncStorage.setItem('wallet_cards', JSON.stringify(updatedCards));
              triggerHaptic();
            }
          },
        },
      ]
    );
  };

  const handleCardPress = (card: Card) => {
    triggerHaptic();
    setSelectedCard(card);
  };

  const getCardIcon = (type: string) => {
    switch (type) {
      case 'visa':
        return 'credit-card';
      case 'mastercard':
        return 'credit-card';
      case 'amex':
        return 'credit-card';
      default:
        return 'credit-card';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#10b981';
      case 'pending':
        return '#f59e0b';
      case 'failed':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  return {
    cards,
    selectedCard,
    transactions,
    isProcessing,
    processingScale,
    processingOpacity,
    addCard,
    handleCardPress,
    processPayment,
    getCardIcon,
    getStatusColor,
  } as const;
}