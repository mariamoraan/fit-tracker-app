import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme } from '@/src/core/theme/dark-theme';
import { RoutinesProvider } from '@/src/features/routines/ui/RoutinesProvider';
import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SafeAreaProvider } from "react-native-safe-area-context";

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DarkTheme}>
        <RoutinesProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
          <StatusBar style="auto" />
        </RoutinesProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
