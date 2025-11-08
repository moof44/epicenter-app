import { Injectable, signal } from '@angular/core';
import { Locker } from '../models/models/locker.model';
import { LOCKER_MOCK } from '../mock/locker.mock';

@Injectable({
  providedIn: 'root'
})
export class LockerService {
  private lockers = signal<Locker[]>(LOCKER_MOCK);

  getLockers() {
    return this.lockers;
  }

  takeLocker(lockerNumber: number): void {
    this.lockers.update(lockers =>
      lockers.map(l =>
        l.number === lockerNumber ? { ...l, isAvailable: false } : l
      )
    );
  }

  releaseLocker(lockerNumber: number): void {
    this.lockers.update(lockers =>
      lockers.map(l =>
        l.number === lockerNumber ? { ...l, isAvailable: true } : l
      )
    );
  }

  getAvailableLockers() {
    return this.lockers().filter(locker => locker.isAvailable);
  }
}
