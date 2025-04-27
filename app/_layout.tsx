// app/_layout.tsx
import 'react-native-gesture-handler'; // Must be at the very top
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { MapProvider } from '../components/MapContext';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <MapProvider>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: '#6b9b7a',
            tabBarInactiveTintColor: '#888',
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: 'Feed',
              tabBarIcon: ({ color }) => (
                <Ionicons name="git-network" size={24} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="add"
            options={{
              title: 'Add',
              tabBarIcon: ({ color }) => (
                <Ionicons name="add-circle-outline" size={30} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: 'Profile',
              tabBarIcon: ({ color }) => (
                <Ionicons name="person-outline" size={24} color={color} />
              ),
            }}
          />

          {/* Hide these helper routes from the tab bar */}
          <Tabs.Screen name="(tabs)" options={{ href: null }} />
          <Tabs.Screen name="+not-found" options={{ href: null }} />
        </Tabs>
      </MapProvider>
    </GestureHandlerRootView>
  );
}
