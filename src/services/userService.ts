import { apiEndpoint } from '../constants/Services';
import { UserType, UserUpdatePostType } from '../dataTypes/UserType';

export async function postLogin(email: string, password: string) {
  const url = apiEndpoint + '/login';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Failed to login');
  }

  const data = await response.json();
  return { token: data.token, user: data.user };
}

export async function postLogout(token: string) {
  const url = apiEndpoint + '/logout';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });

  return await response.json();
}

export async function putRefresh(token: string, dataPost: UserUpdatePostType) {
  const url = apiEndpoint + '/user';

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(dataPost),
  });

  return (await response.json()) as UserType;
}
