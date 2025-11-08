import { Locker } from './locker.model';

export const LOCKER_MOCK: Locker[] = Array.from({ length: 20 }, (_, i) => ({
  id: `${i + 1}`,
  number: i + 1,
  isAvailable: true,
}));
