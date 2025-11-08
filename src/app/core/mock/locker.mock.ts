import { Locker } from '../models/locker.model';
import { Gender } from '../models/member.model';

export const LOCKER_MOCK: Locker[] = [
  // Male Lockers
  { id: '1', number: 1, isAvailable: true, gender: Gender.Male },
  { id: '2', number: 2, isAvailable: true, gender: Gender.Male },
  { id: '3', number: 3, isAvailable: true, gender: Gender.Male },
  { id: '4', number: 4, isAvailable: true, gender: Gender.Male },
  { id: '5', number: 5, isAvailable: true, gender: Gender.Male },
  { id: '6', number: 6, isAvailable: true, gender: Gender.Male },
  { id: '7', number: 7, isAvailable: true, gender: Gender.Male },
  { id: '8', number: 8, isAvailable: true, gender: Gender.Male },
  { id: '9', number: 9, isAvailable: true, gender: Gender.Male },
  { id: '10', number: 10, isAvailable: true, gender: Gender.Male },
  { id: '11', number: 11, isAvailable: true, gender: Gender.Male },
  { id: '12', number: 12, isAvailable: true, gender: Gender.Male },
  // Female Lockers
  { id: '13', number: 1, isAvailable: true, gender: Gender.Female },
  { id: '14', number: 2, isAvailable: true, gender: Gender.Female },
  { id: '15', number: 3, isAvailable: true, gender: Gender.Female },
  { id: '16', number: 4, isAvailable: true, gender: Gender.Female },
  { id: '17', number: 5, isAvailable: true, gender: Gender.Female },
  { id: '18', number: 6, isAvailable: true, gender: Gender.Female },
  { id: '19', number: 7, isAvailable: true, gender: Gender.Female },
  { id: '20', number: 8, isAvailable: true, gender: Gender.Female },
  { id: '21', number: 9, isAvailable: true, gender: Gender.Female },
  { id: '22', number: 10, isAvailable: true, gender: Gender.Female },
  { id: '23', number: 11, isAvailable: true, gender: Gender.Female },
  { id: '24', number: 12, isAvailable: true, gender: Gender.Female },
];
