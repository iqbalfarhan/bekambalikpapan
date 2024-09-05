import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import SesiScreen from '../screens/SesiScreen';
import BookingScreen from '../screens/BookingScreen';
import RiwayatScreen from '../screens/RiwayatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Octicons } from '@expo/vector-icons';
import { bgColor, textColor } from '../constants/Colors';

type TabsStackParamList = {
  Home: undefined;
  Sesi: undefined;
  Booking: undefined;
  Riwayat: undefined;
  Profile: undefined;
};

const Tabs = createBottomTabNavigator<TabsStackParamList>();

export default function TabLayout() {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Octicons.glyphMap = 'question';

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          } else if (route.name === 'Riwayat') {
            iconName = 'calendar';
          } else if (route.name === 'Sesi') {
            iconName = 'list-unordered';
          } else if (route.name === 'Booking') {
            iconName = 'plus-circle';
          }

          return <Octicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          height: 70,
          backgroundColor: bgColor.base2,
          elevation: 0,
        },
        headerStyle: {
          backgroundColor: bgColor.base2,
          shadowColor: 'transparent',
          height: 60,
        },
        headerTitleStyle: {
          fontFamily: 'Geologica-Bold',
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: bgColor.primary,
        tabBarInactiveTintColor: textColor.ghost,
      })}
    >
      <Tabs.Screen
        name='Home'
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Tabs.Screen
        name='Sesi'
        component={SesiScreen}
        options={{ title: 'Jadwal terapi' }}
      />
      <Tabs.Screen
        name='Booking'
        component={BookingScreen}
        options={{ title: 'Booking sesi' }}
      />
      <Tabs.Screen
        name='Riwayat'
        component={RiwayatScreen}
        options={{ title: 'Riwayat terapi' }}
      />
      <Tabs.Screen
        name='Profile'
        component={ProfileScreen}
        options={{ title: 'Edit profile' }}
      />
    </Tabs.Navigator>
  );
}
