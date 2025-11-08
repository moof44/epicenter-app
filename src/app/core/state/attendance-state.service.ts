import { Injectable, inject, computed, Signal } from '@angular/core';
import { Attendance } from '../models/models/attendance.model';
import { AttendanceService } from './attendance.service';

@Injectable({
  providedIn: 'root',
})
export class AttendanceStateService {
  private attendanceService = inject(AttendanceService);

  public attendances = this.attendanceService.todayAttendance;

  async addAttendance(attendance: Partial<Attendance>): Promise<void> {
    await this.attendanceService.addAttendance(attendance);
  }

  async updateAttendance(id: string, data: Partial<Attendance>): Promise<void> {
    await this.attendanceService.updateAttendance(id, data);
  }

  getAttendanceByMemberId(memberId: string): Signal<Attendance[]> {
    return computed(() =>
      this.attendances().filter((a) => a.memberId === memberId)
    );
  }
}
