import React from 'react';
import Wrapper from '../Wrapper';
import Typo from '../Typo';
import useFetch from '../../hooks/useFetch';
import { OrderType } from '../../dataTypes/OrderType';
import OrderCard from './OrderCard';
import { bgColor } from '../../constants/Colors';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TabsStackParamList } from '../../layouts/TabLayout';
import { inputButtonCardGap } from '../../constants/Sizes';

export default function OrderList() {
  const { data } = useFetch<OrderType[]>('/order');
  const navigation =
    useNavigation<NativeStackNavigationProp<TabsStackParamList, 'Riwayat'>>();
  return (
    <Wrapper gap={10}>
      <Wrapper
        justifyContent='space-between'
        flexDirection='row'
        alignItems='center'
      >
        <Typo size='lg' bold>
          Riwayat order
        </Typo>
        <TouchableOpacity onPress={() => navigation.navigate('Riwayat')}>
          <Typo size='sm' color={bgColor.error}>
            View All
          </Typo>
        </TouchableOpacity>
      </Wrapper>
      <Wrapper gap={inputButtonCardGap}>
        {data
          ?.filter((item) => item.status === 'requested')
          .map((order) => (
            <OrderCard key={order.id} data={order} />
          ))}
      </Wrapper>
    </Wrapper>
  );
}
