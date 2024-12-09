import React, { useState } from 'react';
import Wrapper from '../Wrapper';
import { FlatList, RefreshControl, TouchableOpacity } from 'react-native';
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
  const { data, refetch, isLoading } = useFetch<PaketType[]>('/paket');
  return (
    <>
      <Wrapper gap={10}>
        <Wrapper
          paddingHorizontal={containerPadding}
          flexDirection='row'
          alignItems='center'
        >
          <Typo size='lg' bold flex={1}>
            Paket bekam
          </Typo>
          <TouchableOpacity onPress={refetch} style={{ flex: 1 }}>
            <Typo size='sm' color='primary' style={{ textAlign: 'right' }}>
              Refresh
            </Typo>
          </TouchableOpacity>
        </Wrapper>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refetch} />
          }
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
