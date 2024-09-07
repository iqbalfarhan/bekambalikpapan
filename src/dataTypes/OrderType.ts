import { PaketType } from './PaketType';
import { SesiType } from './SesiType';
import { UserType } from './UserType';

export type OrderType = {
  id: number;
  tanggal: string;
  user: UserType;
  sesi: SesiType;
  paket: PaketType;
  created_at: string;
  keterangan: string;
  status: 'requested' | 'approved' | 'done';
};

export type OrderPostType = {
  user_id: UserType['id'];
  sesi_id: SesiType['id'];
  paket_id: PaketType['id'];
  tanggal: string;
  keterangan: string;
};
