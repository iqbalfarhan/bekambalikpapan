import { RefreshControl, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Wrapper from '../components/Wrapper';
import useFetch from '../hooks/useFetch';
import { OrderType } from '../dataTypes/OrderType';
import Alert from '../components/Alert';
import {
  containerPadding,
  inputButtonCardGap,
  inputButtonGap,
} from '../constants/Sizes';
import OrderCard from '../components/order/OrderCard';
import BottomSheet from '../components/BottomSheet';
import DetailItem from '../components/DetailItem';
import { DateTimeLocale, hariTanggal } from '../utils/Formatters';

const RiwayatScreen = () => {
  const { isLoading, data, error, refetch } = useFetch<OrderType[]>('/order');
  const [selected, setSelected] = useState<OrderType | null>(null);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
    >
      {error && <Alert message={error} variant='error' />}
      <Wrapper padding={containerPadding} gap={inputButtonGap}>
        {data &&
          data.map((order) => (
            <TouchableOpacity onPress={() => setSelected(order)} key={order.id}>
              <OrderCard data={order} />
            </TouchableOpacity>
          ))}
      </Wrapper>

      <BottomSheet
        label='Detail riwayat bekam'
        visible={selected ? true : false}
        onBackdropPress={() => setSelected(null)}
      >
        <Wrapper gap={inputButtonCardGap}>
          <DetailItem
            label='Tanggal'
            value={hariTanggal(selected?.tanggal ?? new Date().toISOString())}
          />
          <DetailItem label='Jam sesi' value={selected?.sesi.jam ?? ''} />
          <DetailItem label='Nama paket' value={selected?.paket.name ?? ''} />
          <DetailItem label='Harga paket' value={selected?.paket.harga ?? ''} />
          <DetailItem
            label='Dipesan pada'
            value={
              selected ? DateTimeLocale(new Date(selected?.created_at)) : ''
            }
          />
          <DetailItem label='Status pemesanan' value={selected?.status ?? ''} />
        </Wrapper>
      </BottomSheet>
    </ScrollView>
  );
};

export default RiwayatScreen;
