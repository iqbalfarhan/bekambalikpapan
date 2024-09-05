import React, { PropsWithChildren } from 'react';
import Wrapper from './Wrapper';
import Typo from './Typo';

type FormControlProps = PropsWithChildren & {
  label: string;
};

export default function FormControl({ children, label }: FormControlProps) {
  return (
    <Wrapper gap={4}>
      <Typo>{label}</Typo>
      {children}
    </Wrapper>
  );
}
