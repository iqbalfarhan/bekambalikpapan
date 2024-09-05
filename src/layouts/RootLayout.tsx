import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import TabLayout from './TabLayout';
import useAuth from '../hooks/useAuth';

type RootStackParamList = {
  Login: undefined;
  Tabs: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootLayout() {
  const { token } = useAuth();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {token ? (
        <>
          <Stack.Screen name='Tabs' component={TabLayout} />
        </>
      ) : (
        <>
          <Stack.Screen name='Login' component={LoginScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
