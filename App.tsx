import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import AuthProvider from './src/contexts/AuthContext';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import RootLayout from './src/layouts/RootLayout';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { bgColor } from './src/constants/Colors';

SplashScreen.preventAutoHideAsync();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: bgColor.base,
  },
};

export default function App() {
  const [fontsLoaded] = useFonts({
    'Geologica-Black': require('./assets/fonts/Geologica-Black.ttf'),
    'Geologica-Bold': require('./assets/fonts/Geologica-Bold.ttf'),
    'Geologica-Medium': require('./assets/fonts/Geologica-Medium.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <NavigationContainer theme={MyTheme}>
        <RootLayout />
      </NavigationContainer>
      <StatusBar
        style='dark'
        backgroundColor={bgColor.base2}
        translucent={false}
      />
    </AuthProvider>
  );
}
