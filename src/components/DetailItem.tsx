import React from 'react';
import Wrapper from './Wrapper';
import Typo from './Typo';

type DetailItemProps = {
  label: string;
  value: string;
};

export default function DetailItem({ label, value }: DetailItemProps) {
  return (
    <Wrapper justifyContent='space-between' flexDirection='row' gap={10}>
      <Typo>{label}</Typo>
      <Typo flex={1} textAlign='right'>
        {value}
      </Typo>
    </Wrapper>
  );
}
