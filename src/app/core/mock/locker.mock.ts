import { Locker } from '../models/models/locker.model';
import { Gender } from '../models/models/member.model';

export const LOCKER_MOCK: Locker[] = [
  { id: '1', number: 1, isAvailable: true, gender: Gender.Male },
  { id: '2', number: 2, isAvailable: true, gender: Gender.Male },
  { id: '3', number: 3, isAvailable: false, gender: Gender.Male },
  { id: '4', number: 4, isAvailable: true, gender: Gender.Female },
  { id: '5', number: 5, isAvailable: false, gender: Gender.Female },
];