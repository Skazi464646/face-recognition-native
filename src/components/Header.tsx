import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface HeaderProps {
  userName?: string;
  greeting?: string;
  onProfilePress?: () => void;
  onEyePress?: () => void;
  onSearchPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  userName = 'John',
  greeting = 'Good morning!',
  onProfilePress,
  onEyePress,
  onSearchPress,
}) => {
  return (
    <View style={styles.container}>
      {/* Modern Header with Glass Effect */}
      <View style={styles.headerContent}>
        {/* Profile and Welcome Section */}
        <View style={styles.profileSection}>
          <TouchableOpacity 
            style={styles.profileAvatar}
            onPress={onProfilePress}
          >
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={styles.avatarGradient}
            >
              <Icon name="person" size={24} color="#fff" />
            </LinearGradient>
            <View style={styles.settingsIcon}>
              <Icon name="settings" size={12} color="#fff" />
            </View>
          </TouchableOpacity>
          <View style={styles.welcomeText}>
            <Text style={styles.welcomeTitle}>{greeting}</Text>
            <Text style={styles.welcomeSubtitle}>Welcome back, {userName}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={onEyePress}
          >
            <Icon name="visibility" size={20} color="#374151" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={onSearchPress}
          >
            <Icon name="search" size={20} color="#374151" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'transparent',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileAvatar: {
    position: 'relative',
    marginRight: 16,
  },
  avatarGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#667eea',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  settingsIcon: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#374151',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  welcomeText: {
    flex: 1,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});

export default Header; 