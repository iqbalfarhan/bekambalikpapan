import { View, ViewProps, ViewStyle } from 'react-native';
import React from 'react';

export default function Wrapper({ children, ...other }: ViewProps & ViewStyle) {
  return (
    <View style={other} {...other}>
      {children}
    </View>
  );
}
