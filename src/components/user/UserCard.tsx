import React from 'react';
import Wrapper from '../Wrapper';
import Typo from '../Typo';
import useAuth from '../../hooks/useAuth';
import { containerPadding, roundedBox } from '../../constants/Sizes';
import { bgColor } from '../../constants/Colors';
import Avatar from '../Avatar';

export default function UserCard() {
  const { user } = useAuth();
  return (
    <Wrapper
      overflow='hidden'
      backgroundColor={bgColor.base3}
      justifyContent='space-between'
      alignItems='center'
      flexDirection='row'
      padding={containerPadding}
      borderRadius={roundedBox}
    >
      <Wrapper>
        <Typo size='sm'>{user?.email}</Typo>
        <Typo size='lg' bold>
          {user?.name}
        </Typo>
      </Wrapper>
      <Avatar type='image' label={user?.photo} />
    </Wrapper>
  );
}
