import { Image, ImageSourcePropType, ViewStyle } from 'react-native';
import React from 'react';
import Wrapper from './Wrapper';
import { getInitials } from '../utils/Formatters';
import Typo from './Typo';
import { bgColor, textColor } from '../constants/Colors';

type AvatarProps = {
  size?: ViewStyle['width'];
  borderRadius?: ViewStyle['borderRadius'];
  label?: string & ImageSourcePropType;
  type?: 'placeholder' | 'image';
  variant?: keyof typeof bgColor;
};

export default function Avatar({
  size = 48,
  borderRadius,
  label = 'A',
  type = 'placeholder',
  variant = 'neutral',
}: AvatarProps) {
  return (
    <Wrapper
      aspectRatio={1}
      height={size}
      backgroundColor={bgColor[variant]}
      borderRadius={borderRadius ? borderRadius : 100}
      justifyContent='center'
      alignItems='center'
      overflow='hidden'
    >
      {type === 'placeholder' ? (
        <Typo bold size='xl' color={textColor[variant]}>
          {getInitials(label)}
        </Typo>
      ) : (
        <Image
          source={{ uri: label }}
          style={{
            height: size,
            width: size,
            backgroundColor: bgColor.ghost,
          }}
        />
      )}
    </Wrapper>
  );
}
