import { HabitsContextProvider } from '@/hooks/useHabits';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <HabitsContextProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false, title: "Home" }} />
      </Stack>
    </HabitsContextProvider>
  );
}
