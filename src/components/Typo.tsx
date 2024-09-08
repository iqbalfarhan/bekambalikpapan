import { StyleSheet, Text, TextProps, TextStyle } from 'react-native';
import React from 'react';
import { textColor } from '../constants/Colors';

export type TypoProps = TextProps &
  TextStyle & {
    size?: 'sm' | 'base' | 'lg' | 'xl' | 'xl2' | 'xl3' | 'xl4' | 'xl5';
    bold?: boolean;
  };

export default function Typo({
  children,
  color,
  bold = false,
  size = 'base',
  ...other
}: TypoProps) {
  const initialStyle: TextStyle = {
    fontFamily: bold
      ? 'MontserratAlternates-Bold'
      : 'MontserratAlternates-Medium',
    color: color ? color : textColor.base,
    ...other,
  };
  return (
    <Text style={[initialStyle, styles[size]]} {...other}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  sm: {
    fontSize: 12,
    lineHeight: 16,
  },
  base: {
    fontSize: 14,
    lineHeight: 20,
  },
  lg: {
    fontSize: 16,
    lineHeight: 24,
  },
  xl: {
    fontSize: 18,
    lineHeight: 28,
  },
  xl2: {
    fontSize: 20,
    lineHeight: 28,
  },
  xl3: {
    fontSize: 24,
    lineHeight: 32,
  },
  xl4: {
    fontSize: 30,
    lineHeight: 36,
  },
  xl5: {
    fontSize: 36,
    lineHeight: 40,
  },
});
