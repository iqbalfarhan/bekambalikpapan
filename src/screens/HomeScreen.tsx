import React from 'react';
import Wrapper from '../components/Wrapper';
import { containerGap, containerPadding } from '../constants/Sizes';
import UserCard from '../components/user/UserCard';
import PaketList from '../components/paket/PaketList';
import OrderList from '../components/order/OrderList';

const HomeScreen = () => {
  return (
    <>
      <Wrapper padding={containerPadding} gap={containerGap}>
        <UserCard />
      </Wrapper>

      <PaketList />
      <Wrapper flex={1} padding={containerPadding}>
        <OrderList />
      </Wrapper>
    </>
  );
};

export default HomeScreen;
