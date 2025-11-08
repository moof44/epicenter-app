import { Injectable, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Attendance } from '../models/models/attendance.model';
import { AttendanceService } from './attendance.service';
import { EMPTY, Subject, catchError, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AttendanceStateService {
  private attendanceService = inject(AttendanceService);

  public attendances = signal<Attendance[]>([]);

  constructor() {
    this.attendanceService
      .getAttendances()
      .pipe(
        takeUntilDestroyed(),
        catchError((err) => {
          console.error('Error fetching attendances:', err);
          return EMPTY;
        })
      )
      .subscribe((data) => this.attendances.set(data));
  }

  addAttendance(attendance: Partial<Attendance>): void {
    this.attendanceService.addAttendance(attendance).subscribe();
  }

  updateAttendance(id: string, data: Partial<Attendance>): void {
    this.attendanceService.updateAttendance(id, data).subscribe();
  }
}
