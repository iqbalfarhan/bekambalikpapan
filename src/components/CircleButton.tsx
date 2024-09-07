import {
  TouchableOpacityProps,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { bgColor, textColor } from '../constants/Colors';
import { Octicons } from '@expo/vector-icons';
import Wrapper from './Wrapper';
import {
  inputButtonGap,
  inputButtonHeight,
  roundedBtn,
} from '../constants/Sizes';

export type CircleButtonProps = TouchableOpacityProps & {
  variant?: keyof typeof bgColor;
  icon: keyof typeof Octicons.glyphMap;
  circle?: boolean;
  size?: ViewStyle['width'] | ViewStyle['height'];
};

export default function CircleButton({
  icon,
  variant = 'primary',
  circle = false,
  size,
  ...other
}: CircleButtonProps) {
  const iconSize = 20;
  return (
    <TouchableOpacity {...other}>
      <Wrapper
        height={size ? size : inputButtonHeight}
        width={size ? size : inputButtonHeight}
        justifyContent='center'
        alignItems='center'
        gap={inputButtonGap}
        flexDirection='row'
        backgroundColor={bgColor[variant]}
        borderRadius={circle ? iconSize : roundedBtn}
        opacity={other.disabled ? 0.5 : 1}
      >
        <Octicons name={icon} size={iconSize} color={textColor[variant]} />
      </Wrapper>
    </TouchableOpacity>
  );
}
