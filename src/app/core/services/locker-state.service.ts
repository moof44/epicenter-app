import { Injectable, inject } from '@angular/core';
import { LockerService } from './locker.service';

@Injectable({
  providedIn: 'root'
})
export class LockerStateService {
  private lockerService = inject(LockerService);

  public lockers = this.lockerService.getLockers();

  getAvailableLockers() {
    return this.lockerService.getAvailableLockers();
  }

  takeLocker(lockerNumber: number): void {
    this.lockerService.takeLocker(lockerNumber);
  }

  releaseLocker(lockerNumber: number): void {
    this.lockerService.releaseLocker(lockerNumber);
  }
}
