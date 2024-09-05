import React from 'react';
import Wrapper from '../Wrapper';
import Typo from '../Typo';
import { OrderType } from '../../dataTypes/OrderType';
import { containerPadding, roundedBox } from '../../constants/Sizes';
import { bgColor } from '../../constants/Colors';
import { hariTanggal } from '../../utils/Formatters';

type OrderCardProps = {
  data: OrderType;
};

export default function OrderCard({ data }: OrderCardProps) {
  return (
    <Wrapper
      padding={containerPadding}
      backgroundColor={bgColor.base3}
      borderRadius={roundedBox}
    >
      <Typo bold>{hariTanggal(data.tanggal)}</Typo>
      <Typo size='sm'>
        jam {data.sesi.jam} - {data.paket.name}
      </Typo>
    </Wrapper>
  );
}
