import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAsyncStorage = (key: string) => {
  const [storedValue, setStoredValue] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const storeValue = async (value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      setStoredValue(value);
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  };

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem(key);
      setStoredValue(null);
    } catch (error) {
      console.error('Error removing data from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    const fetchStoredValue = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(key);
        setStoredValue(jsonValue != null ? JSON.parse(jsonValue) : null);
      } catch (error) {
        console.error('Error reading data from AsyncStorage:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStoredValue();
  }, [key]);

  return {
    storedValue,
    loading,
    storeValue,
    removeValue,
  };
};

export default useAsyncStorage;
