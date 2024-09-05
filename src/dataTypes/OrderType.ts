import { PaketType } from './PaketType';
import { SesiType } from './SesiType';
import { UserType } from './UserType';

export type OrderType = {
  id: number;
  tanggal: string;
  user: UserType;
  sesi: SesiType;
  paket: PaketType;
  keterangan: string;
  status: 'requested' | 'approved' | 'done';
};
