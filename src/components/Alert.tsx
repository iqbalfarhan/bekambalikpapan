import React from 'react';
import Wrapper from './Wrapper';
import { bgColor, textColor } from '../constants/Colors';
import { containerPadding } from '../constants/Sizes';
import Typo from './Typo';

type AlertProps = {
  variant?: keyof typeof bgColor;
  message: string;
};

export default function Alert({ variant = 'error', message }: AlertProps) {
  return (
    <Wrapper
      backgroundColor={bgColor[variant]}
      padding={containerPadding}
      paddingVertical={10}
    >
      <Typo color={textColor[variant]}>{message}</Typo>
    </Wrapper>
  );
}
