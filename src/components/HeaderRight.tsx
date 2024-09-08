import { Octicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import BottomSheet from './BottomSheet';
import Wrapper from './Wrapper';
import Typo from './Typo';
import Button from './Button';
import { adminPhone } from '../constants/Services';
import { Linking } from 'react-native';

export default function HeaderRight(props: {
  tintColor?: string;
  pressColor?: string;
  pressOpacity?: number;
}) {
  const [show, setShow] = useState<boolean>(false);
  const openWhatsApp = () => {
    let url = `whatsapp://send?phone=${adminPhone}`;
    Linking.openURL(url)
      .then((supported) => {
        if (!supported) {
          alert('Aplikasi WhatsApp tidak terinstal');
        }
      })
      .catch((err) => console.error('Error:', err));
  };
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
        <Button
          variant='success'
          icon={'comment'}
          label={adminPhone}
          onPress={openWhatsApp}
        />
      </BottomSheet>
    </Wrapper>
  );
}
