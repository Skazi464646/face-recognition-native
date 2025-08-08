import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface InfoBlocksProps {
  activityMessage?: string;
  messageStatus?: string;
}

const InfoBlocks: React.FC<InfoBlocksProps> = ({
  activityMessage = 'NO NEW ACTIVITY FOR REVIEW',
  messageStatus = 'NO NEW MESSAGES FOR YOU',
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoCard}>
        <Text style={styles.infoText}>{activityMessage}</Text>
        <View style={styles.divider} />
        <Text style={styles.infoText}>{messageStatus}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    alignItems: 'center',
  },
  infoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#6366f1',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 6,
  },
  infoText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginVertical: 8,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 12,
    width: '100%',
  },
});

export default InfoBlocks; 