import { Injectable, signal, computed, inject } from '@angular/core';
import { Locker } from '../models/locker.model';
import { LOCKER_MOCK } from '../mock/locker.mock';
import { Gender } from '../models/member.model';
import { AttendanceStateService } from './attendance-state.service';

@Injectable({
  providedIn: 'root',
})
export class LockerStateService {
  private readonly attendanceStateService = inject(AttendanceStateService);
  public readonly allLockers = signal<Locker[]>(LOCKER_MOCK, { equal: () => false });

  private readonly occupiedLockerNumbers = computed(() => {
    return this.attendanceStateService
      .attendances()
      .filter((a) => !a.checkOutTime && a.lockerNumber)
      .map((a) => {
        return String(a.lockerNumber)
      });
  });

  public readonly availableLockers = computed(() => {
    const occupiedNumbers = this.occupiedLockerNumbers();
    const available = this.allLockers().filter(
      (locker) => !occupiedNumbers.includes(locker.id)
    );
    return available;
  });

  public getAvailableLockersByGender(gender: Gender) {
    return computed(() => {
      const available = this.availableLockers();
      return available.filter((locker) => locker.gender === gender);
    });
  }
}
