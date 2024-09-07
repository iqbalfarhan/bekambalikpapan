import { apiEndpoint } from '../constants/Services';
import { OrderPostType, OrderType } from '../dataTypes/OrderType';

export async function postOrder(token: string, dataPost: OrderPostType) {
  const url = apiEndpoint + '/order';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(dataPost),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  const data = (await response.json()) as OrderType;

  return data;
}
