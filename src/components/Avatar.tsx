import React from 'react';
import Wrapper from './Wrapper';
import Typo from './Typo';
import { bgColor, textColor } from '../constants/Colors';

type AvatarProps = {
  size?: number;
  borderRadius?: number;
};

const Avatar = ({ size = 52, borderRadius }: AvatarProps) => {
  return (
    <Wrapper
      backgroundColor={bgColor.primary}
      width={size}
      height={size}
      borderRadius={borderRadius ? borderRadius : size / 2}
      alignItems='center'
      justifyContent='center'
    >
      <Typo color={textColor.primary} size={'xl'}>
        A
      </Typo>
    </Wrapper>
  );
};

export default Avatar;
