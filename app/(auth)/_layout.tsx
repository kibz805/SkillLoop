import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

export default function AuthLayout() {
  useFrameworkReady();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="forgot-password" />
    </Stack>
  );
}