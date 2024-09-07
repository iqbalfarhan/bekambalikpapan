import React, { useState } from 'react';
import Wrapper from '../components/Wrapper';
import {
  containerGap,
  containerPadding,
  inputButtonCardGap,
} from '../constants/Sizes';
import Input from '../components/Input';
import useFetch from '../hooks/useFetch';
import { SesiType } from '../dataTypes/SesiType';
import { RefreshControl, ScrollView, TouchableOpacity } from 'react-native';
import SesiCard from '../components/sesi/SesiCard';
import { hariTanggal, YmdDate } from '../utils/Formatters';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

const SesiScreen = () => {
  const { isLoading, data, refetch } = useFetch<SesiType[]>('/sesi');
  const [tanggal, setTanggal] = useState<Date>(new Date());

  const showDatepicker = () => {
    DateTimePickerAndroid.open({
      value: tanggal,
      onChange: (event, selectedDate) => {
        const currentDate = selectedDate;
        setTanggal(currentDate as Date);
      },
      mode: 'date',
      is24Hour: true,
    });
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
    >
      <Wrapper padding={containerPadding} gap={containerGap}>
        <TouchableOpacity onPress={showDatepicker}>
          <Input
            leftIcon='calendar'
            editable={false}
            value={hariTanggal(tanggal.toISOString())}
          />
        </TouchableOpacity>
        <Wrapper gap={inputButtonCardGap}>
          {data &&
            data.map((sesi) => (
              <SesiCard key={sesi.id} data={sesi} tanggal={YmdDate(tanggal)} />
            ))}
        </Wrapper>
      </Wrapper>
    </ScrollView>
  );
};

export default SesiScreen;
