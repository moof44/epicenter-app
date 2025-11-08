import { computed, inject, Injectable } from '@angular/core';
import { MemberStateService } from './member-state.service';
import { AttendanceStateService } from './attendance-state.service';
import { LockerStateService } from './locker-state.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardStateService {
  private memberState = inject(MemberStateService);
  private attendanceState = inject(AttendanceStateService);
  private lockerState = inject(LockerStateService);

  public totalMembers = computed(() => this.memberState.members().length);
  public activeMembers = computed(() => this.memberState.members().filter(m => m.membershipStatus === 'Active').length);
  public checkedInCount = computed(() => this.attendanceState.attendances().filter(a => !a.checkOutTime).length);
  public availableLockersCount = computed(() => this.lockerState.lockers().filter(l => l.isAvailable).length);

  public recentCheckIns = computed(() => {
    const attendances = this.attendanceState.attendances()
      .filter(a => !a.checkOutTime)
      .sort((a, b) => new Date(b.checkInTime).getTime() - new Date(a.checkInTime).getTime())
      .slice(0, 5);

    return attendances.map(attendance => {
      const member = this.memberState.members().find(m => m.id === attendance.memberId);
      return {
        memberName: member ? member.name : 'Unknown',
        checkInTime: attendance.checkInTime,
        lockerNumber: attendance.lockerNumber
      };
    });
  });
}
