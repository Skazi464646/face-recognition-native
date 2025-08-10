import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

type Item = { month: string; amount: number };

type Props = {
  data: Item[];
};

const ExpenseGraph: React.FC<Props> = ({ data }) => {
  const maxAmount = Math.max(...data.map(d => d.amount));

  return (
    <View style={styles.graphContainer}>
      <Text style={styles.graphTitle}>Monthly Expenses</Text>
      <View style={styles.graphBars}>
        {data.map((item, index) => {
          const height = (item.amount / maxAmount) * 120;
          return (
            <View key={index} style={styles.barContainer}>
              <View style={[styles.bar, { height }]} />
              <Text style={styles.barLabel}>{item.month}</Text>
              <Text style={styles.barAmount}>${item.amount}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default ExpenseGraph;


