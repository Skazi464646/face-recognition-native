import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles';

type Card = { id: number; title: string; amount: number; date: string; type: string };

type Props = {
  cards: Card[];
  getCardIcon: (type: string) => string;
  getCardIconColor: (type: string) => string;
};

const TransactionsList: React.FC<Props> = ({ cards, getCardIcon, getCardIconColor }) => {
  return (
    <View style={styles.cardsContainer}>
      <Text style={styles.cardsTitle}>Recent Transactions</Text>
      {cards.map((card) => (
        <View key={card.id} style={styles.transactionCard}>
          <View style={styles.cardLeft}>
            <View style={[styles.cardIcon, { backgroundColor: getCardIconColor(card.type) }]}>
              <Icon name={getCardIcon(card.type)} size={20} color="#fff" />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text style={styles.cardDate}>{card.date}</Text>
            </View>
          </View>
          <Text style={styles.cardAmount}>-${card.amount}</Text>
        </View>
      ))}
    </View>
  );
};

export default TransactionsList;


