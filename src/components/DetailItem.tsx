import React from 'react';
import Wrapper from './Wrapper';
import Typo from './Typo';

type DetailItemProps = {
  label: string;
  value: string;
};

export default function DetailItem({ label, value }: DetailItemProps) {
  return (
    <Wrapper justifyContent='space-between' flexDirection='row'>
      <Typo>{label}</Typo>
      <Typo>{value}</Typo>
    </Wrapper>
  );
}
