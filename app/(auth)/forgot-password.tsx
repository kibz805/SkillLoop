import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Link } from 'expo-router';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Check } from 'lucide-react-native';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
    } catch (err) {
      setError('Failed to send reset instructions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View 
        entering={FadeIn.duration(600)}
        style={styles.content}
      >
        <Link href="/login" style={styles.backButton}>
          <ArrowLeft size={24} color="#000000" />
        </Link>

        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subtitle}>
          Enter your email address and we'll send you instructions to reset your password
        </Text>

        {error ? (
          <Animated.View 
            entering={SlideInDown.duration(400)}
            exiting={FadeOut}
            style={styles.errorContainer}
          >
            <Text style={styles.errorText}>{error}</Text>
          </Animated.View>
        ) : null}

        {isSuccess ? (
          <Animated.View 
            entering={FadeIn.duration(400)}
            style={styles.successContainer}
          >
            <View style={styles.checkCircle}>
              <Check size={24} color="#48BF84" />
            </View>
            <Text style={styles.successTitle}>Check your email</Text>
            <Text style={styles.successText}>
              We've sent password reset instructions to your email address
            </Text>
          </Animated.View>
        ) : (
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>

            <TouchableOpacity
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={handleSubmit}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoading ? 'Sending...' : 'Send Instructions'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  backButton: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6E6E73',
    marginBottom: 32,
    lineHeight: 24,
  },
  errorContainer: {
    backgroundColor: '#FEF2F2',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 14,
  },
  form: {
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 8,
  },
  input: {
    height: 48,
    backgroundColor: '#F5F5F7',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000000',
  },
  button: {
    height: 48,
    backgroundColor: '#0066CC',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  checkCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  successText: {
    fontSize: 16,
    color: '#6E6E73',
    textAlign: 'center',
    lineHeight: 24,
  },
});