import { Injectable, signal, computed } from '@angular/core';
import { Locker } from '../core/models/locker.model';

const LOCKERS_MOCK: Locker[] = [
  { id: '1', number: 101, isAvailable: true },
  { id: '2', number: 102, isAvailable: true },
  { id: '3', number: 103, isAvailable: true },
  { id: '4', number: 104, isAvailable: true },
  { id: '5', number: 105, isAvailable: false },
  { id: '6', number: 201, isAvailable: true },
  { id: '7', number: 202, isAvailable: true },
  { id: '8', number: 203, isAvailable: false },
  { id: '9', number: 204, isAvailable: true },
  { id: '10', number: 205, isAvailable: true },
];

@Injectable({
  providedIn: 'root',
})
export class LockerStateService {
  private readonly lockers = signal<Locker[]>(LOCKERS_MOCK);

  public readonly availableLockers = computed(() => this.lockers().filter((locker) => locker.isAvailable));

  public assignLocker(lockerNumber: number): void {
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
