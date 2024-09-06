import React from 'react';
import Wrapper from '../components/Wrapper';
import {
  containerGap,
  containerPadding,
  inputButtonCardGap,
} from '../constants/Sizes';
import Input from '../components/Input';
import useFetch from '../hooks/useFetch';
import { SesiType } from '../dataTypes/SesiType';
import { RefreshControl, ScrollView } from 'react-native';
import SesiCard from '../components/sesi/SesiCard';
import { hariTanggal } from '../utils/Formatters';

const SesiScreen = () => {
  const { isLoading, data, refetch } = useFetch<SesiType[]>('/sesi');
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
    >
      <Wrapper padding={containerPadding} gap={containerGap}>
        <Input
          leftIcon='calendar'
          value={hariTanggal(new Date().toISOString())}
        />
        <Wrapper gap={inputButtonCardGap}>
          {data && data.map((sesi) => <SesiCard key={sesi.id} data={sesi} />)}
        </Wrapper>
      </Wrapper>
    </ScrollView>
  );
};

export default SesiScreen;
