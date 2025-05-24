import { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Switch,
} from 'react-native';
import { Link, router } from 'expo-router';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as LocalAuthentication from 'expo-local-authentication';
import { Eye, EyeOff, Fingerprint } from 'lucide-react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const handleBiometricAuth = async () => {
    try {
      const { success } = await LocalAuthentication.authenticateAsync();
      if (success) {
        router.replace('/(tabs)');
      }
    } catch (err) {
      setError('Biometric authentication failed');
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      router.replace('/(tabs)');
    } catch (err) {
      setError('Invalid email or password');
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
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue learning</Text>

        {error ? (
          <Animated.View 
            entering={SlideInDown.duration(400)}
            exiting={FadeOut}
            style={styles.errorContainer}
          >
            <Text style={styles.errorText}>{error}</Text>
          </Animated.View>
        ) : null}

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              ref={emailRef}
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                ref={passwordRef}
                style={[styles.input, styles.passwordInput]}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                returnKeyType="done"
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={20} color="#6E6E73" />
                ) : (
                  <Eye size={20} color="#6E6E73" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.optionsContainer}>
            <View style={styles.rememberContainer}>
              <Switch
                value={rememberMe}
                onValueChange={setRememberMe}
                trackColor={{ false: '#EFEFF4', true: '#0066CC' }}
                thumbColor={Platform.OS === 'ios' ? '#FFFFFF' : rememberMe ? '#FFFFFF' : '#F4F4F5'}
              />
              <Text style={styles.rememberText}>Remember me</Text>
            </View>
            <Link href="/forgot-password" style={styles.forgotText}>
              Forgot Password?
            </Link>
          </View>

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Text>
          </TouchableOpacity>

          {Platform.OS !== 'web' && (
            <TouchableOpacity
              style={styles.biometricButton}
              onPress={handleBiometricAuth}
            >
              <Fingerprint size={24} color="#0066CC" />
              <Text style={styles.biometricText}>Sign in with Biometrics</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <Link href="/register" style={styles.registerLink}>
            Sign Up
          </Link>
        </View>
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
  },
  eyeButton: {
    position: 'absolute',
    right: 16,
    height: 48,
    justifyContent: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#000000',
  },
  forgotText: {
    fontSize: 14,
    color: '#0066CC',
  },
  button: {
    height: 48,
    backgroundColor: '#0066CC',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  biometricButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    backgroundColor: '#E9F0F9',
    borderRadius: 12,
  },
  biometricText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#0066CC',
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#6E6E73',
  },
  registerLink: {
    fontSize: 14,
    color: '#0066CC',
    fontWeight: '500',
    marginLeft: 4,
  },
});