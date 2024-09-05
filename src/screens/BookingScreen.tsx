import React, { useState } from 'react';
import Wrapper from '../components/Wrapper';
import {
  containerGap,
  containerPadding,
  inputButtonCardGap,
  roundedBox,
} from '../constants/Sizes';
import Typo from '../components/Typo';
import Button from '../components/Button';
import FormControl from '../components/FormControl';
import Input from '../components/Input';
import { Pressable, ScrollView } from 'react-native';
import useFetch from '../hooks/useFetch';
import BottomSheet from '../components/BottomSheet';
import { PaketType } from '../dataTypes/PaketType';
import { SesiType } from '../dataTypes/SesiType';
import CheckBox from '../components/CheckBox';

const BookingScreen = () => {
  const [showPaketModal, setShowPaketModal] = useState<boolean>(false);
  const [showSesiModal, setShowSesiModal] = useState<boolean>(false);
  const [terima, setTerima] = useState<boolean>(false);
  const sesi = useFetch<SesiType[]>('/sesi');
  const paket = useFetch<PaketType[]>('/paket');
  return (
    <>
      <Wrapper padding={containerPadding} gap={containerGap}>
        <FormControl label='Pilih tanggal booking'>
          <Pressable onPress={() => alert(JSON.stringify(sesi.data))}>
            <Input leftIcon='calendar' editable={false} value='2024-09-06' />
          </Pressable>
        </FormControl>
        <FormControl label='Waktu sesi'>
          <Pressable onPress={() => setShowSesiModal(true)}>
            <Input
              leftIcon='clock'
              placeholder='pilih sesi bekam'
              editable={false}
            />
          </Pressable>
        </FormControl>
        <FormControl label='Peket bekam'>
          <Pressable onPress={() => setShowPaketModal(true)}>
            <Input
              leftIcon='list-unordered'
              placeholder='pilih paket bekam'
              editable={false}
            />
          </Pressable>
        </FormControl>
        <FormControl label='Keterangan (opsional)'>
          <Input leftIcon='pencil' placeholder='keterangan order' />
        </FormControl>
        <Typo size='sm' opacity={0.7}>
          Ketentuan : Proses ini akan melibatkan admin bekam Balikpapan untuk
          menyetujui booking anda. Apabila ternyata sesi booking tidak tersedia,
          admin bekam Balikpapan akan segera mengubah status booking dan akan
          menghubungi anda untuk pergantian jadwal.
        </Typo>
        <CheckBox
          label='Terima ketentuan'
          checked={terima}
          onPress={() => setTerima(!terima)}
        />
        <Button label='Kirim permintaan' icon='check' disabled={!terima} />
      </Wrapper>

      <BottomSheet
        label='Pilih paket bekam'
        visible={showPaketModal}
        onBackdropPress={() => setShowPaketModal(false)}
      >
        <Wrapper gap={inputButtonCardGap}>
          {paket.data &&
            paket.data.map((itempaket) => (
              <Button
                variant='base3'
                key={itempaket.id}
                label={[itempaket.name, itempaket.harga].join(' - ')}
              />
            ))}
        </Wrapper>
      </BottomSheet>

      <BottomSheet
        label='Pilih sesi bekam'
        visible={showSesiModal}
        onBackdropPress={() => setShowSesiModal(false)}
        onRequestClose={() => setShowSesiModal(false)}
      >
        <Wrapper maxHeight={400} borderRadius={roundedBox} overflow='hidden'>
          <ScrollView>
            <Wrapper gap={inputButtonCardGap}>
              {sesi.data &&
                sesi.data.map((itemsesi) => (
                  <Button
                    variant='base3'
                    key={itemsesi.id}
                    label={[itemsesi.name, `(jam ${itemsesi.jam})`].join(' - ')}
                  />
                ))}
            </Wrapper>
          </ScrollView>
        </Wrapper>
      </BottomSheet>
    </>
  );
};

export default BookingScreen;
