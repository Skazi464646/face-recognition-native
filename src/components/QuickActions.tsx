import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

interface QuickAction {
  name: string;
  icon: string;
  onPress: () => void;
}

interface QuickActionsProps {
  actions?: QuickAction[];
}

const QuickActions: React.FC<QuickActionsProps> = ({
  actions = [
    {
      name: 'Bill',
      icon: 'receipt',
      onPress: () => console.log('Bill pressed'),
    },
    {
      name: 'Raise',
      icon: 'chat-bubble',
      onPress: () => console.log('Raise pressed'),
    },
    {
      name: 'Deals',
      icon: 'local-offer',
      onPress: () => console.log('Deals pressed'),
    },
  ],
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>QUICK ACTIONS</Text>
      <View style={styles.actionsGrid}>
        {actions.map((action, index) => (
          <TouchableOpacity
            key={index}
            style={styles.actionItem}
            onPress={action.onPress}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={['#6366f1', '#8b5cf6']}
              style={styles.actionGradient}
            >
              <Icon name={action.icon} size={28} color="#fff" />
            </LinearGradient>
            <Text style={styles.actionText}>{action.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionItem: {
    width: (width - 80) / 3,
    height: 100,
    borderRadius: 24,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  actionGradient: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: '#374151',
  },
});

export default QuickActions; 