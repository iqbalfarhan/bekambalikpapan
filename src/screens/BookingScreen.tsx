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
import DetailItem from '../components/DetailItem';
import { bgColor } from '../constants/Colors';

const BookingScreen = () => {
  const [showPaketModal, setShowPaketModal] = useState<boolean>(false);
  const [showSesiModal, setShowSesiModal] = useState<boolean>(false);
  const [terima, setTerima] = useState<boolean>(false);
  const sesi = useFetch<SesiType[]>('/sesi');
  const paket = useFetch<PaketType[]>('/paket');

  const [respok, setRespok] = useState<boolean | null>(null);
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
              rightIcon='chevron-down'
              placeholder='pilih sesi bekam'
              editable={false}
            />
          </Pressable>
        </FormControl>
        <FormControl label='Peket bekam'>
          <Pressable onPress={() => setShowPaketModal(true)}>
            <Input
              leftIcon='list-unordered'
              rightIcon='chevron-down'
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
        <Button
          label='Kirim permintaan'
          icon='check'
          disabled={!terima}
          onPress={() => setRespok(false)}
        />
      </Wrapper>

      <BottomSheet
        visible={respok === null ? false : true}
        label={`Booking sesi ${respok ? 'berhasil' : 'gagal'}`}
        labelColor={respok === false ? bgColor.error : bgColor.primary}
        onBackdropPress={() => setRespok(null)}
      >
        {respok != null && respok ? (
          <>
            <Wrapper gap={inputButtonCardGap}>
              <DetailItem label='Nama paket' value={'Paket bekam basah'} />
              <DetailItem label='Harga paket' value={'Rp. 200.000'} />
              <DetailItem label='Jam Sesi' value={'10:00 - 10:30'} />
              <DetailItem
                label='Keterangan'
                value={'lorem ipsum dolor sir amet'}
              />
            </Wrapper>

            <Button label='Lihat riwayat booking' icon='calendar' />
          </>
        ) : (
          <>
            <Typo>
              Mohon maaf booking sesi untuk jam 10:00 - 10:30 tidak berhasil,
              mungkin anda melakukan booking diwaktu yang bersamaan sehingga
              waktu booking belum diperbarui. silakan pilih kembali waktu
              booking anda
            </Typo>

            <Button label='Pilih ulang jam sesi' variant='error' icon='clock' />
          </>
        )}
      </BottomSheet>

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
