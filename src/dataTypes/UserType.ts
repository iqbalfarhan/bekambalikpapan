export type UserType = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  photo: string;
};

export type UserUpdatePostType = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

export type RegisterPostType = {
  name: string;
  email: string;
  google_id: string;
  photo: string;
};
