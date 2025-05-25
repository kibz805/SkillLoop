import { StyleSheet, Text, View, ViewProps } from 'react-native';
import { useTheme } from './ThemeProvider';

interface TextBoxProps extends ViewProps {
  title?: string;
  variant?: 'primary' | 'secondary' | 'error' | 'success';
}

export default function TextBox({ 
  title,
  variant = 'primary',
  style,
  children,
  ...props 
}: TextBoxProps) {
  const theme = useTheme();

  const getBackgroundColor = () => {
    switch (variant) {
      case 'secondary':
        return theme.colors.secondary;
      case 'error':
        return theme.colors.error;
      case 'success':
        return theme.colors.success;
      default:
        return theme.colors.primary;
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: getBackgroundColor() },
        style,
      ]}
      {...props}
    >
      {title && (
        <Text style={[styles.title, { color: theme.colors.textInverse }]}>
          {title}
        </Text>
      )}
      <Text style={[styles.text, { color: theme.colors.textInverse }]}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
});