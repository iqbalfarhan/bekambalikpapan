import { apiEndpoint } from '../constants/Services';
import { OrderPostType } from '../dataTypes/OrderType';

export async function postOrder(token: string, dataPost: OrderPostType) {
  const url = apiEndpoint + 'order';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + token,
    },
    body: JSON.stringify(dataPost),
  });

  return response;
}
