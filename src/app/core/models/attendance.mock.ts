import { Attendance } from './attendance.model';
import { MEMBER_MOCK } from './member.mock';

export const ATTENDANCE_MOCK: Attendance[] = [
  {
    id: '1',
    memberId: '1',
    checkInTime: new Date('2024-07-28T08:00:00'),
    checkOutTime: new Date('2024-07-28T09:00:00'),
    lockerNumber: 12,
  },
  {
    id: '2',
    memberId: '2',
    checkInTime: new Date('2024-07-28T08:05:00'),
    checkOutTime: new Date('2024-07-28T09:30:00'),
    lockerNumber: 23,
  },
  {
    id: '3',
    memberId: '3',
    checkInTime: new Date('2024-07-28T08:10:00'),
    checkOutTime: new Date('2024-07-28T09:15:00'),
  },
  {
    id: '4',
    memberId: '1',
    checkInTime: new Date(),
    lockerNumber: 8,
  },
  {
    id: '5',
    memberId: '5',
    checkInTime: new Date(),
    lockerNumber: 15,
  },
];
