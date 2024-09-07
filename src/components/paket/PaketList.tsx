import React, { useState } from 'react';
import Wrapper from '../Wrapper';
import { FlatList, TouchableOpacity } from 'react-native';
import { containerPadding, inputButtonCardGap } from '../../constants/Sizes';
import PaketCard from './PaketCard';
import { PaketType } from '../../dataTypes/PaketType';
import Typo from '../Typo';
import useFetch from '../../hooks/useFetch';
import BottomSheet from '../BottomSheet';
import DetailItem from '../DetailItem';
import Button from '../Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TabsStackParamList } from '../../layouts/TabLayout';

export default function PaketList() {
  const navigation =
    useNavigation<NativeStackNavigationProp<TabsStackParamList, 'Booking'>>();
  const [selected, setSelected] = useState<PaketType | null>(null);
  const { data } = useFetch<PaketType[]>('/paket');
  return (
    <>
      <Wrapper gap={10}>
        <Wrapper paddingHorizontal={containerPadding}>
          <Typo size='lg' bold>
            Paket bekam
          </Typo>
        </Wrapper>
        <FlatList
          contentContainerStyle={{
            paddingHorizontal: containerPadding,
            gap: 14,
          }}
          horizontal
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setSelected(item)}>
              <PaketCard data={item} />
            </TouchableOpacity>
          )}
        />
      </Wrapper>

      <BottomSheet
        label='Detail paket bekam'
        visible={selected ? true : false}
        onBackdropPress={() => setSelected(null)}
      >
        <Wrapper gap={inputButtonCardGap}>
          <DetailItem label='Nama paket' value={selected?.name ?? ''} />
          <DetailItem label='Harga paket' value={selected?.harga ?? ''} />
          <DetailItem label='Keterangan' value={selected?.keterangan ?? ''} />
        </Wrapper>
        <Button
          label='Pilih paket'
          icon='check'
          onPress={() =>
            navigation.navigate('Booking', {
              paket_id: selected?.id,
            })
          }
        />
      </BottomSheet>
    </>
  );
}
