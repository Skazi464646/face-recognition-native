import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface FloatingActionButtonProps {
  onPress?: () => void;
  icon?: string;
  size?: number;
  color?: string;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPress,
  icon = 'chevron-double-left',
  size = 64,
  color = '#667eea',
}) => {
  // Reanimated shared values for high-performance animations
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  // Animated styles using worklets
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { rotate: `${rotation.value}deg` },
      ],
    };
  });

  const handlePress = () => {
    // Animate on press
    scale.value = withSpring(1.2, { damping: 10, stiffness: 200 });
    rotation.value = withTiming(180, { duration: 300 });

    // Call the onPress callback
    if (onPress) {
      onPress();
    }

    // Reset animations
    setTimeout(() => {
      scale.value = withSpring(1, { damping: 15, stiffness: 100 });
      rotation.value = withTiming(0, { duration: 300 });
    }, 300);
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <TouchableOpacity
        style={[
          styles.button,
          {
            width: size,
            height: size,
            borderRadius: size / 2, // Perfect circle
          },
        ]}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.gradient}
        >
          <Icon name={icon} size={28} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    zIndex: 1000,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#667eea',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 16,
  },
  gradient: {
    width: '100%',
    height: '100%',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FloatingActionButton; 