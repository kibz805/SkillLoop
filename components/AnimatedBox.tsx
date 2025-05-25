import { useEffect } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import { useTheme } from './ThemeProvider';

interface AnimatedBoxProps extends ViewProps {
  animate?: boolean;
  variant?: 'primary' | 'secondary' | 'tertiary';
}

export default function AnimatedBox({ 
  animate = true, 
  variant = 'primary',
  style,
  children,
  ...props 
}: AnimatedBoxProps) {
  const theme = useTheme();
  const scale = useSharedValue(1);
  const colorProgress = useSharedValue(0);

  useEffect(() => {
    if (animate) {
      scale.value = withSpring(1.05, { damping: 10 });
      colorProgress.value = withTiming(1, { duration: theme.animation.duration.normal });
    } else {
      scale.value = withSpring(1);
      colorProgress.value = withTiming(0, { duration: theme.animation.duration.normal });
    }
  }, [animate]);

  const getColors = () => {
    switch (variant) {
      case 'secondary':
        return [theme.colors.secondary, theme.colors.gradientStart];
      case 'tertiary':
        return [theme.colors.tertiary, theme.colors.gradientStart];
      default:
        return [theme.colors.primary, theme.colors.gradientStart];
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    const [from, to] = getColors();
    
    return {
      transform: [{ scale: scale.value }],
      backgroundColor: interpolateColor(
        colorProgress.value,
        [0, 1],
        [to, from]
      ),
    };
  });

  return (
    <Animated.View
      style={[styles.container, animatedStyle, style]}
      {...props}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
});