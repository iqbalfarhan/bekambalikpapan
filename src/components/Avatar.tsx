import { Image, ViewStyle } from 'react-native';
import React from 'react';
import Wrapper from './Wrapper';
import { getInitials } from '../utils/Formatters';
import Typo from './Typo';
import { bgColor, textColor } from '../constants/Colors';

type AvatarProps = {
  size?: ViewStyle['width'];
  borderRadius?: ViewStyle['borderRadius'];
  label?: string;
  type?: 'placeholder' | 'image';
  variant?: keyof typeof bgColor;
};

function isValidUri(uri: string) {
  return uri.startsWith('http://') || uri.startsWith('https://');
}

export default function Avatar({
  size = 48,
  borderRadius,
  label = 'A',
  type = 'placeholder',
  variant = 'base3',
}: AvatarProps) {
  const renderContent = () => {
    if (type === 'image' && isValidUri(label)) {
      return (
        <Image
          source={{ uri: label }}
          style={{
            height: size,
            width: size,
            backgroundColor: bgColor.ghost,
          }}
        />
      );
    }

    // Fallback ke placeholder (inisial) jika `label` bukan URI valid atau `type === 'placeholder'`
    return (
      <Typo bold size='xl' color={textColor[variant]}>
        {getInitials(label)}
      </Typo>
    );
  };

  return (
    <Wrapper
      aspectRatio={1}
      height={size}
      backgroundColor={bgColor[variant]}
      borderRadius={borderRadius || 100}
      justifyContent='center'
      alignItems='center'
      overflow='hidden'
    >
      {renderContent()}
    </Wrapper>
  );
}
