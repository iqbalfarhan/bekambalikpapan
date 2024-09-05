import { Modal, ModalProps, Pressable } from 'react-native';
import React from 'react';
import Wrapper from './Wrapper';
import { containerGap, containerPadding } from '../constants/Sizes';
import { bgColor } from '../constants/Colors';
import Typo from './Typo';

type BottomSheetProps = ModalProps & {
  label: string;
  onBackdropPress?: () => void;
};

export default function BottomSheet({
  children,
  label,
  onBackdropPress,
  ...other
}: BottomSheetProps) {
  return (
    <Modal animationType='fade' statusBarTranslucent transparent {...other}>
      <Pressable
        onPress={onBackdropPress}
        style={{ flex: 1, backgroundColor: bgColor.neutral, opacity: 0.5 }}
      />
      <Wrapper
        backgroundColor={bgColor.base}
        padding={containerPadding}
        gap={containerGap}
      >
        <Typo
          size='xl2'
          bold
          textAlign='center'
          color={bgColor.primary}
          marginVertical={12}
        >
          {label}
        </Typo>
        {children}
      </Wrapper>
    </Modal>
  );
}
