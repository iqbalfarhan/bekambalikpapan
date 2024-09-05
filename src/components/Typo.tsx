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
    fontFamily: bold ? 'Geologica-Bold' : 'Geologica-Medium',
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
    fontSize: 14,
    lineHeight: 20,
  },
  base: {
    fontSize: 16,
    lineHeight: 24,
  },
  lg: {
    fontSize: 18,
    lineHeight: 28,
  },
  xl: {
    fontSize: 20,
    lineHeight: 28,
  },
  xl2: {
    fontSize: 24,
    lineHeight: 32,
  },
  xl3: {
    fontSize: 30,
    lineHeight: 36,
  },
  xl4: {
    fontSize: 36,
    lineHeight: 40,
  },
  xl5: {
    fontSize: 48,
    lineHeight: undefined,
  },
});
