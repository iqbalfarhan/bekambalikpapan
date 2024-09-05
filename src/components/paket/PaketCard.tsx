import React from 'react';
import { PaketType } from '../../dataTypes/PaketType';
import Wrapper from '../Wrapper';
import Typo from '../Typo';
import Avatar from '../Avatar';
import { bgColor } from '../../constants/Colors';
import {
  containerGap,
  containerPadding,
  roundedBox,
} from '../../constants/Sizes';

type PaketCardProps = {
  data: PaketType;
};

export default function PaketCard({ data }: PaketCardProps) {
  return (
    <Wrapper
      padding={containerPadding}
      flexDirection='row'
      gap={containerGap}
      width={300}
      backgroundColor={bgColor.base3}
      borderRadius={roundedBox}
      alignItems='center'
    >
      <Avatar size={60} borderRadius={20} />
      <Wrapper flex={1} flexDirection='column'>
        <Typo size='lg' bold color={bgColor.primary} numberOfLines={1}>
          {data.name}
        </Typo>
        <Typo size='sm' bold color={bgColor.error}>
          {data.harga}
        </Typo>
        <Typo size='sm' opacity={0.5} numberOfLines={1}>
          {data.keterangan}
        </Typo>
      </Wrapper>
    </Wrapper>
  );
}
