import React from 'react';
import Wrapper from './Wrapper';
import Typo from './Typo';
import { Octicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { inputButtonIconSize } from '../constants/Sizes';
import { bgColor } from '../constants/Colors';

type CheckBoxProps = {
  label: string;
  checked: boolean;
  onPress: () => void;
};

export default function CheckBox({ label, checked, onPress }: CheckBoxProps) {
  const color: keyof typeof bgColor = checked ? 'primary' : 'neutral';
  return (
    <TouchableOpacity onPress={onPress}>
      <Wrapper flexDirection='row' gap={10} alignItems='center'>
        <Octicons
          name={checked ? 'check-circle' : 'circle'}
          size={inputButtonIconSize}
          color={bgColor[color]}
        />
        <Typo color={bgColor[color]}>{label}</Typo>
      </Wrapper>
    </TouchableOpacity>
  );
}
