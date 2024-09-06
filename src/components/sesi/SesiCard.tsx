import React from 'react';
import { SesiType } from '../../dataTypes/SesiType';
import Wrapper from '../Wrapper';
import {
  containerGap,
  containerPadding,
  roundedBox,
} from '../../constants/Sizes';
import Typo from '../Typo';
import { bgColor } from '../../constants/Colors';
import { Octicons } from '@expo/vector-icons';
import Badge from '../Badge';
import { OrderType } from '../../dataTypes/OrderType';
import useFetch from '../../hooks/useFetch';
import Alert from '../Alert';

type SesiCardProps = {
  data: SesiType;
};

export default function SesiCard({ data }: SesiCardProps) {
  const {
    data: sesi,
    isLoading,
    error,
  } = useFetch<OrderType[]>(`/order/${data.id}/2024-09-06`);

  if (error) {
    return <Alert message={error} />;
  }

  const terisi: boolean = sesi?.length === 0 ? false : true;
  const color = terisi ? bgColor.error : bgColor.primary;
  return (
    <Wrapper
      padding={containerPadding}
      paddingVertical={15}
      gap={containerGap}
      backgroundColor={bgColor.base3}
      borderRadius={roundedBox}
      flexDirection='row'
      alignItems='center'
      opacity={isLoading ? 0.5 : 1}
    >
      <Octicons
        name={terisi ? 'calendar' : 'check-circle'}
        size={24}
        color={color}
      />
      <Wrapper flex={1}>
        <Typo color={color} size='sm'>
          Jam {data.jam}
        </Typo>
        <Typo size='lg' bold color={color}>
          {data.durasi}
        </Typo>
      </Wrapper>
      {isLoading ? (
        <Typo color={color} size='sm'>
          loading
        </Typo>
      ) : terisi ? (
        <Typo color={color} size='sm'>
          Sudah di pesan
        </Typo>
      ) : (
        <Badge label='Order' icon='plus-circle' />
      )}
    </Wrapper>
  );
}
