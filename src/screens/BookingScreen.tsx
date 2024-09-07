import React, { useEffect, useState } from 'react';
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
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { hariTanggal, YmdDate } from '../utils/Formatters';
import { OrderPostType, OrderType } from '../dataTypes/OrderType';
import useAuth from '../hooks/useAuth';
import { postOrder } from '../services/orderService';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { TabsStackParamList } from '../layouts/TabLayout';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const BookingScreen = () => {
  const { user, token } = useAuth();
  const sesi = useFetch<SesiType[]>('/sesi');
  const paket = useFetch<PaketType[]>('/paket');
  const { params } = useRoute<RouteProp<TabsStackParamList, 'Booking'>>();

  const { navigate } =
    useNavigation<NativeStackNavigationProp<TabsStackParamList, 'Riwayat'>>();

  const [tanggal, setTanggal] = useState<Date>(new Date());
  const [showPaketModal, setShowPaketModal] = useState<boolean>(false);
  const [showSesiModal, setShowSesiModal] = useState<boolean>(false);
  const [terima, setTerima] = useState<boolean>(false);
  const [keterangan, setKeterangan] = useState<string>('');

  const [selectedSesi, setSelectedSesi] = useState<SesiType | null>(null);
  const [selectedPaket, setSelectedPaket] = useState<PaketType | null>(null);
  const [order, setOrder] = useState<OrderType | null>(null);

  const [respok, setRespok] = useState<boolean | null>(null);

  useEffect(() => {
    if (params && sesi.data && params?.sesi_id) {
      const foundSesi = sesi.data.find((s) => s.id === params.sesi_id);
      setSelectedSesi(foundSesi ?? null);
    }

    if (params && paket.data && params?.paket_id) {
      const foundPaket = paket.data.find((s) => s.id === params.paket_id);
      setSelectedPaket(foundPaket ?? null);
    }
  }, [sesi.data, paket.data, params]);

  const showDatepicker = () => {
    DateTimePickerAndroid.open({
      value: tanggal,
      onChange: (event, selectedDate) => {
        const currentDate = selectedDate;
        setTanggal(currentDate as Date);
      },
      mode: 'date',
      is24Hour: true,
    });
  };

  const handleSubmit = async () => {
    if (!selectedSesi || !selectedPaket) {
      alert('Sesi dan paket harus dipilih!');
      return;
    }

    const newOrder: OrderPostType = {
      user_id: user?.id ?? 0,
      sesi_id: selectedSesi?.id ?? 0,
      paket_id: selectedPaket?.id ?? 0,
      tanggal: YmdDate(tanggal),
      keterangan: keterangan,
    };

    try {
      postOrder(token, newOrder)
        .then((response) => {
          console.log(response);
          setRespok(true);

          setOrder(response);

          setSelectedSesi(null);
          setSelectedPaket(null);
        })
        .catch((err) => {
          console.log(err);
          setRespok(false);
        });

      return;
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <Wrapper padding={containerPadding} gap={containerGap}>
        <FormControl label='Pilih tanggal booking'>
          <Pressable onPress={showDatepicker}>
            <Input
              leftIcon='calendar'
              editable={false}
              value={hariTanggal(tanggal.toISOString())}
            />
          </Pressable>
        </FormControl>
        <FormControl label='Waktu sesi'>
          <Pressable onPress={() => setShowSesiModal(true)}>
            <Input
              leftIcon='clock'
              rightIcon='chevron-down'
              placeholder='pilih sesi bekam'
              value={
                selectedSesi
                  ? `${selectedSesi?.name} - ${selectedSesi?.jam}`
                  : ''
              }
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
              value={
                selectedPaket
                  ? `${selectedPaket?.name} - ${selectedPaket?.harga}`
                  : ''
              }
              editable={false}
            />
          </Pressable>
        </FormControl>
        <FormControl label='Keterangan (opsional)'>
          <Input
            leftIcon='pencil'
            placeholder='keterangan order'
            value={keterangan}
            onChangeText={(text) => setKeterangan(text)}
          />
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
          onPress={handleSubmit}
        />
      </Wrapper>

      <BottomSheet
        visible={respok === null ? false : true}
        label={`Booking ${respok ? 'berhasil' : 'gagal'}`}
        labelColor={respok === false ? bgColor.error : bgColor.primary}
        onBackdropPress={() => setRespok(null)}
      >
        {respok != null && respok ? (
          <>
            <Wrapper gap={inputButtonCardGap}>
              <DetailItem label='Nama paket' value={order?.paket.name ?? ''} />
              <DetailItem
                label='Harga paket'
                value={order?.paket.harga ?? ''}
              />
              <DetailItem label='Jam Sesi' value={order?.sesi.jam ?? ''} />
              <DetailItem
                label='Keterangan'
                value={order?.keterangan ?? 'Tidak ada keterangan tambahan'}
              />
            </Wrapper>

            <Button
              label='Lihat riwayat booking'
              icon='calendar'
              onPress={() => navigate('Riwayat')}
            />
          </>
        ) : (
          <>
            <Typo>
              Mohon maaf booking sesi untuk yang sudah dipilih tidak berhasil,
              mungkin anda melakukan booking diwaktu yang bersamaan dengan orang
              lain sehingga waktu booking belum diperbarui. silakan pilih
              kembali waktu booking anda
            </Typo>

            <Button
              label='Pilih ulang jam sesi'
              variant='error'
              icon='clock'
              onPress={() => {
                setRespok(null);
              }}
            />
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
                onPress={() => {
                  setShowPaketModal(false);
                  setSelectedPaket(itempaket);
                }}
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
      >
        <Wrapper maxHeight={400} borderRadius={roundedBox} overflow='hidden'>
          <ScrollView>
            <Wrapper gap={inputButtonCardGap}>
              {sesi.data &&
                sesi.data.map((itemsesi) => (
                  <Button
                    onPress={() => {
                      setSelectedSesi(itemsesi);
                      setShowSesiModal(false);
                    }}
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
