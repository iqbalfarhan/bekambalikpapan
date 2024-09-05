import { RefreshControl, ScrollView, Text, View } from 'react-native';
import useFetch from '../hooks/useFetch';

interface Quote {
  id: number;
  quote: string;
  author: string;
}

export default function ContohScreen() {
  const { data, isLoading, error, refetch } = useFetch<{ quotes: Quote[] }>(
    '/quotes?delay=2000',
  );

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
    >
      {data?.quotes.map((quoteItem) => (
        <View key={quoteItem.id} style={{ marginBottom: 20, padding: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
            {quoteItem.quote}
          </Text>
          <Text style={{ fontSize: 14, fontStyle: 'italic', marginTop: 5 }}>
            - {quoteItem.author}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}
