import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

interface TabNavigatorProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

const TabNavigator: React.FC<TabNavigatorProps> = ({ activeTab, onTabPress }) => {
  const tabs = [
    {
      id: 'wealth',
      name: 'Wealth',
      icon: 'trending-up',
      activeIcon: 'trending-up',
    },
    {
      id: 'crypto',
      name: 'Crypto',
      icon: 'currency-bitcoin',
      activeIcon: 'currency-bitcoin',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              style={styles.tabButton}
              onPress={() => onTabPress(tab.id)}
              activeOpacity={0.8}
            >
              {isActive ? (
                <LinearGradient
                  colors={['#6366f1', '#8b5cf6']}
                  style={styles.activeTabGradient}
                >
                  <Icon name={tab.activeIcon} size={20} color="#fff" />
                  <Text style={styles.activeTabText}>{tab.name}</Text>
                </LinearGradient>
              ) : (
                <View style={styles.inactiveTab}>
                  <Icon name={tab.icon} size={20} color="#9ca3af" />
                  <Text style={styles.inactiveTabText}>{tab.name}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 16,
    padding: 4,
    shadowColor: '#6366f1',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  tabButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  activeTabGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 8,
  },
  activeTabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  inactiveTab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 8,
  },
  inactiveTabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#9ca3af',
  },
});

export default TabNavigator; 