import { Octicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import BottomSheet from './BottomSheet';
import Wrapper from './Wrapper';
import Typo from './Typo';
import Button from './Button';
import { adminPhone } from '../constants/Services';

export default function HeaderRight(props: {
  tintColor?: string;
  pressColor?: string;
  pressOpacity?: number;
}) {
  const [show, setShow] = useState<boolean>(false);
  return (
    <Wrapper marginRight={20} opacity={props.pressOpacity}>
      <Octicons
        name='info'
        color={props.tintColor}
        size={20}
        onPress={() => setShow(true)}
      />
      <BottomSheet
        label='Informasi layanan'
        visible={show}
        onBackdropPress={() => setShow(false)}
      >
        <Typo>
          Untuk pertanyaan dan konfirmasi, hubungi kami melalui nomor whatsapp
          berikut ini:
        </Typo>
        <Button label={adminPhone} />
      </BottomSheet>
    </Wrapper>
  );
}
