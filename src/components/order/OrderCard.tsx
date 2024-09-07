import React from 'react';
import Wrapper from '../Wrapper';
import Typo from '../Typo';
import { OrderType } from '../../dataTypes/OrderType';
import { containerPadding, roundedBox } from '../../constants/Sizes';
import { bgColor } from '../../constants/Colors';
import { hariTanggal } from '../../utils/Formatters';
import CircleButton, { CircleButtonProps } from '../CircleButton';

type OrderCardProps = {
  data: OrderType;
};

export default function OrderCard({ data }: OrderCardProps) {
  const status = data.status;
  let buttonVariant: CircleButtonProps['variant'] = 'primary';
  switch (status) {
    case 'requested':
      buttonVariant = 'base';
      break;

    case 'approved':
      buttonVariant = 'neutral';
      break;
  }
  return (
    <Wrapper
      padding={containerPadding}
      backgroundColor={bgColor.base3}
      borderRadius={roundedBox}
      flexDirection='row'
      alignItems='center'
    >
      <Wrapper flex={1}>
        <Wrapper flexDirection='row' justifyContent='space-between'>
          <Typo bold>{hariTanggal(data.tanggal)}</Typo>
        </Wrapper>
        <Typo size='sm' numberOfLines={1}>
          jam {data.sesi.jam} - {data.paket.name}
        </Typo>
      </Wrapper>
      <Wrapper>
        <CircleButton size={30} variant={buttonVariant} icon='check' circle />
      </Wrapper>
    </Wrapper>
  );
}
