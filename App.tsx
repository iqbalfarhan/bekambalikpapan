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
    'MontserratAlternates-Black': require('./assets/fonts/MontserratAlternates-Black.ttf'),
    'MontserratAlternates-Bold': require('./assets/fonts/MontserratAlternates-Bold.ttf'),
    'MontserratAlternates-Medium': require('./assets/fonts/MontserratAlternates-Medium.ttf'),
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
