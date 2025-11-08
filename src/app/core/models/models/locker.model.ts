import { Gender } from './member.model';

export interface Locker {
  id: string;
  number: number;
  isAvailable: boolean;
  gender: Gender;
}
