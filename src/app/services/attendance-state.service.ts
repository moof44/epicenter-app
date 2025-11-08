import { Injectable, computed, signal } from '@angular/core';
import { Attendance } from '../core/models/attendance.model';

const ATTENDANCE_MOCK: Attendance[] = [
  {
    id: '1',
    memberId: '1',
    checkInTime: new Date('2024-07-28T08:00:00'),
    checkOutTime: new Date('2024-07-28T09:30:00'),
    lockerNumber: 101,
  },
  {
    id: '2',
    memberId: '2',
    checkInTime: new Date('2024-07-28T08:15:00'),
    checkOutTime: undefined,
    lockerNumber: 102,
  },
  {
    id: '3',
    memberId: '3',
    checkInTime: new Date('2024-07-28T08:30:00'),
    checkOutTime: undefined,
    lockerNumber: undefined,
  },
];

@Injectable({
  providedIn: 'root',
})
export class AttendanceStateService {
  private readonly attendance = signal<Attendance[]>(ATTENDANCE_MOCK);

  public readonly checkedInMembers = computed(() =>
    this.attendance().filter((a) => a.checkOutTime === undefined)
  );

  public readonly checkedOutMembers = computed(() =>
    this.attendance().filter((a) => a.checkOutTime !== undefined)
  );

  public checkIn(
    memberId: string,
    lockerNumber: number | null = null
  ): void {
    const newAttendance: Attendance = {
      id: crypto.randomUUID(),
      memberId,
      checkInTime: new Date(),
      checkOutTime: undefined,
      lockerNumber: lockerNumber ?? undefined,
    };
    this.attendance.update((attendance) => [...attendance, newAttendance]);
  }

  public checkOut(attendanceId: string): void {
    this.attendance.update((attendance) =>
      attendance.map((a) =>
        a.id === attendanceId ? { ...a, checkOutTime: new Date() } : a
      )
    );
  }

  public getAttendanceByDate(date: Date): Attendance[] {
    return this.attendance().filter((a) => {
      const checkInDate = new Date(a.checkInTime);
      return (
        checkInDate.getFullYear() === date.getFullYear() &&
        checkInDate.getMonth() === date.getMonth() &&
        checkInDate.getDate() === date.getDate()
      );
    });
  }
}
