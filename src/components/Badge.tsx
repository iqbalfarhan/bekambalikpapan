import React from 'react';
import Typo from './Typo';
import Wrapper from './Wrapper';
import { Octicons } from '@expo/vector-icons';
import { bgColor, textColor } from '../constants/Colors';
import { roundedBadge } from '../constants/Sizes';

export type BadgeProps = {
  label: string;
  variant?: keyof typeof bgColor;
  icon?: keyof typeof Octicons.glyphMap;
};

export default function Badge({
  label,
  variant = 'primary',
  icon,
}: BadgeProps) {
  return (
    <Wrapper
      padding={3}
      paddingHorizontal={10}
      backgroundColor={bgColor[variant]}
      borderRadius={roundedBadge}
      flexDirection='row'
      alignItems='center'
      gap={6}
    >
      {icon && <Octicons name={icon} size={14} color={textColor[variant]} />}
      <Typo size={'sm'} bold color={textColor[variant]}>
        {label}
      </Typo>
    </Wrapper>
  );
}
