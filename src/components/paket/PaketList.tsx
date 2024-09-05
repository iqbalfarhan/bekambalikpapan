import React from 'react';
import Wrapper from '../Wrapper';
import { FlatList } from 'react-native';
import { containerGap, containerPadding } from '../../constants/Sizes';
import PaketCard from './PaketCard';
import { PaketType } from '../../dataTypes/PaketType';
import Typo from '../Typo';

export default function PaketList() {
  const contohPaket: PaketType[] = [
    {
      id: 1,
      name: 'Paket Bekam basah',
      harga: 'Rp. 100,000',
      keterangan: 'Paket A ini cocok untuk anda yang ingin menjual produk anda',
      photo: 'https://example.com/image.jpg',
    },
    {
      id: 2,
      name: 'Paket Bekam kering',
      harga: 'Rp. 100,000',
      keterangan: 'Paket A ini cocok untuk anda yang ingin menjual produk anda',
      photo: 'https://example.com/image.jpg',
    },
  ];
  return (
    <Wrapper gap={containerGap}>
      <Wrapper paddingHorizontal={containerPadding}>
        <Typo size='xl' bold>
          Paket bekam
        </Typo>
      </Wrapper>
      <FlatList
        contentContainerStyle={{
          paddingHorizontal: containerPadding,
          gap: containerGap,
        }}
        horizontal
        data={contohPaket}
        renderItem={({ item }) => <PaketCard data={item} />}
      />
    </Wrapper>
  );
}
