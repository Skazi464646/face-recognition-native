import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface StatusBarProps {
  time?: string;
  showBell?: boolean;
}

const StatusBar: React.FC<StatusBarProps> = ({ 
  time = '7:28', 
  showBell = true 
}) => {
  return (
    <View style={styles.container}>
      {/* Left side - Time and Bell */}
      <View style={styles.leftSection}>
        <Text style={styles.timeText}>{time}</Text>
        {showBell && (
          <View style={styles.bellIcon}>
            <Icon name="notifications" size={16} color="#6b7280" />
          </View>
        )}
      </View>

      {/* Right side - System Status Icons */}
      <View style={styles.rightSection}>
        {/* Signal strength */}
        <View style={styles.signalBars}>
          <View style={[styles.bar, styles.barActive]} />
          <View style={[styles.bar, styles.barActive]} />
          <View style={[styles.bar, styles.barActive]} />
          <View style={[styles.bar, styles.barInactive]} />
        </View>

        {/* WiFi icon */}
        <Icon name="wifi" size={16} color="#6b7280" style={styles.statusIcon} />

        {/* Battery */}
        <View style={styles.batteryContainer}>
          <View style={styles.batteryOutline}>
            <View style={[styles.batteryFill, { width: '29%' }]} />
          </View>
          <Text style={styles.batteryText}>29</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  bellIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  signalBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
    height: 16,
  },
  bar: {
    width: 3,
    borderRadius: 1,
  },
  barActive: {
    backgroundColor: '#6b7280',
  },
  barInactive: {
    backgroundColor: '#d1d5db',
  },
  statusIcon: {
    marginLeft: 4,
  },
  batteryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  batteryOutline: {
    width: 24,
    height: 12,
    borderWidth: 1,
    borderColor: '#6b7280',
    borderRadius: 2,
    padding: 1,
  },
  batteryFill: {
    height: '100%',
    backgroundColor: '#6b7280',
    borderRadius: 1,
  },
  batteryText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
});

export default StatusBar; 