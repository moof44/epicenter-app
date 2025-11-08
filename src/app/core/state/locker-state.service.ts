import { Injectable, signal, computed } from '@angular/core';
import { Locker } from '../models/models/locker.model';
import { LOCKER_MOCK } from '../mock/locker.mock';
import { Gender } from '../models/models/member.model';

@Injectable({
  providedIn: 'root',
})
export class LockerStateService {
  public readonly lockers = signal<Locker[]>(LOCKER_MOCK);

  public readonly availableLockers = computed(() => this.lockers().filter((locker) => locker.isAvailable));

  public getAvailableLockersByGender(gender: Gender) {
    return computed(() => this.lockers().filter((locker) => locker.isAvailable && locker.gender === gender));
  }

  public takeLocker(lockerNumber: number): void {
    this.lockers.update((lockers) =>
      lockers.map((locker) =>
        locker.number === lockerNumber ? { ...locker, isAvailable: false } : locker
      )
    );
  }

  public releaseLocker(lockerNumber: number): void {
    this.lockers.update((lockers) =>
      lockers.map((locker) =>
        locker.number === lockerNumber ? { ...locker, isAvailable: true } : locker
      )
    );
  }
}
