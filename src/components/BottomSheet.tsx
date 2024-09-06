import { Modal, ModalProps, Pressable, TextStyle } from 'react-native';
import React from 'react';
import Wrapper from './Wrapper';
import { containerGap } from '../constants/Sizes';
import { bgColor } from '../constants/Colors';
import Typo from './Typo';

type BottomSheetProps = ModalProps & {
  label: string;
  labelColor?: TextStyle['color'];
  onBackdropPress?: () => void;
};

export default function BottomSheet({
  children,
  labelColor,
  label,
  onBackdropPress,
  ...other
}: BottomSheetProps) {
  return (
    <Modal
      animationType='fade'
      statusBarTranslucent
      transparent
      onRequestClose={onBackdropPress}
      {...other}
    >
      <Pressable
        onPress={onBackdropPress}
        style={{ flex: 1, backgroundColor: bgColor.neutral, opacity: 0.5 }}
      />
      <Wrapper backgroundColor={bgColor.base} padding={30} gap={containerGap}>
        <Typo
          size='xl2'
          bold
          textAlign='center'
          color={labelColor ? labelColor : bgColor.primary}
          marginVertical={12}
        >
          {label}
        </Typo>
        {children}
      </Wrapper>
    </Modal>
  );
}
