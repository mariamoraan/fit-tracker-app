import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { CalendarIcon, GaugeIcon, HouseIcon } from '@/src/core/icons';
import { PATHS } from '@/src/core/router/paths';
import { Colors } from '@/src/core/theme/theme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) =>  <HouseIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name={PATHS.ROUTINES.screen}
        options={{
          title: 'Routines',
          tabBarIcon: ({ color }) =>  <GaugeIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name={PATHS.CALENDAR.screen}
        options={{
          title: 'Calendar',
          tabBarIcon: ({ color }) =>  <CalendarIcon color={color} />,
        }}
      />
    </Tabs>
  );
}
