import React from 'react';
import Wrapper from '../components/Wrapper';
import { containerGap, containerPadding } from '../constants/Sizes';
import UserCard from '../components/user/UserCard';
import PaketList from '../components/paket/PaketList';

const HomeScreen = () => {
  return (
    <>
      <Wrapper padding={containerPadding} gap={containerGap}>
        <UserCard />
      </Wrapper>

      <PaketList />
    </>
  );
};

export default HomeScreen;
