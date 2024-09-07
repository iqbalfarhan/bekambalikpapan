import { useState, useEffect, useCallback } from 'react';
import useAuth from './useAuth';
import { apiEndpoint } from '../constants/Services';

const useFetch = <T>(path: string) => {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(`${apiEndpoint}${path}`, {
        headers,
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      const jsonData = await response.json();
      setData(jsonData);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  }, [path, token]);

  const refetch = useCallback(() => {
    setData(null);
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [path, fetchData]);

  return {
    isLoading,
    data,
    error,
    refetch,
  };
};

export default useFetch;
