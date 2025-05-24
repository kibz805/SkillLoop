import { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { Link, router } from 'expo-router';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { Camera, Eye, EyeOff, Upload } from 'lucide-react-native';
import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

export default function RegisterScreen() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const nameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const validateStep = () => {
    try {
      if (step === 1) {
        registerSchema.parse({ name, email, password });
        return true;
      }
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path[0]) {
            newErrors[error.path[0].toString()] = error.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handleRegister = async () => {
    if (!validateStep()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      router.replace('/(tabs)');
    } catch (err) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          ref={nameRef}
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your full name"
          returnKeyType="next"
          onSubmitEditing={() => emailRef.current?.focus()}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      </View>

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
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            ref={passwordRef}
            style={[styles.input, styles.passwordInput]}
            value={password}
            onChangeText={setPassword}
            placeholder="Create a password"
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
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <View style={styles.avatarContainer}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Camera size={40} color="#6E6E73" />
          </View>
        )}
        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <Upload size={20} color="#FFFFFF" />
          <Text style={styles.uploadText}>Upload Photo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View 
          entering={FadeIn.duration(600)}
          style={styles.content}
        >
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join SkillLoop and start learning</Text>

          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <Animated.View 
                style={[
                  styles.progressFill,
                  { width: `${(step / 2) * 100}%` }
                ]}
              />
            </View>
            <Text style={styles.progressText}>Step {step} of 2</Text>
          </View>

          {errors.submit && (
            <Animated.View 
              entering={SlideInDown.duration(400)}
              exiting={FadeOut}
              style={styles.errorContainer}
            >
              <Text style={styles.errorText}>{errors.submit}</Text>
            </Animated.View>
          )}

          {step === 1 ? renderStep1() : renderStep2()}

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={step === 1 ? handleNext : handleRegister}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading
                ? 'Creating account...'
                : step === 1
                ? 'Next'
                : 'Create Account'}
            </Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <Link href="/login" style={styles.loginLink}>
              Sign In
            </Link>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
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
  progressContainer: {
    marginBottom: 32,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#F5F5F7',
    borderRadius: 2,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0066CC',
  },
  progressText: {
    fontSize: 14,
    color: '#6E6E73',
  },
  stepContainer: {
    marginBottom: 24,
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
    marginTop: 4,
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
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F5F5F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0066CC',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  uploadText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#6E6E73',
  },
  loginLink: {
    fontSize: 14,
    color: '#0066CC',
    fontWeight: '500',
    marginLeft: 4,
  },
});