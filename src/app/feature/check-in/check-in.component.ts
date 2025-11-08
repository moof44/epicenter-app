import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberStateService } from '../../core/state/member-state.service';
import { AttendanceStateService } from '../../core/state/attendance-state.service';
import { LockerStateService } from '../../core/state/locker-state.service';
import { Member } from '../../core/models/models/member.model';
import { FormsModule } from '@angular/forms';
import { Attendance } from '../../core/models/models/attendance.model';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule]
})
export class CheckInComponent {
  public memberStateService = inject(MemberStateService);
  public attendanceStateService = inject(AttendanceStateService);
  public lockerStateService = inject(LockerStateService);

  public searchTerm = signal('');
  public selectedMember = signal<Member | null>(null);
  public assignLocker = signal(false);
  public selectedLocker = signal<number | null>(null);

  private members = computed(() => this.memberStateService.members());
  private attendances = computed(() => this.attendanceStateService.attendances());

  public filteredMembers = computed(() => {
    const term = this.searchTerm();
    if (!term) {
      return [];
    }
    const lowercasedTerm = term.toLowerCase();
    return this.members().filter((m: Member) => m.name.toLowerCase().includes(lowercasedTerm) && !this.isMemberCheckedIn(m.id));
  });

  public checkedInMembers = computed(() => {
    const checkedInAttendances = this.attendances().filter(a => !a.checkOutTime);
    return checkedInAttendances.map(attendance => {
      const member = this.members().find(m => m.id === attendance.memberId);
      return {
        ...attendance,
        memberName: member ? member.name : 'Unknown',
        memberId: member ? member.id : ''
      };
    });
  });

  public availableLockers = computed(() => {
    const member = this.selectedMember();
    if (member) {
      return this.lockerStateService.getAvailableLockersByGender(member.gender)();
    }
    return [];
  });

  public memberAttendanceHistory = computed(() => {
    const member = this.selectedMember();
    if(member) {
        return this.attendanceStateService.getAttendanceByMemberId(member.id);
    }
    return [];
  });

  handleSearchInput(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  handleLockerChange(event: Event): void {
    this.assignLocker.set((event.target as HTMLInputElement).checked);
  }

  selectMember(member: Member): void {
    this.selectedMember.set(member);
    this.searchTerm.set('');
  }

  isMemberCheckedIn(memberId: string): boolean {
    return this.attendances().some((a: Attendance) => a.memberId === memberId && !a.checkOutTime);
  }

  checkIn(): void {
    const member = this.selectedMember();
    if (member) {
      this.attendanceStateService.addAttendance({
        memberId: member.id,
        checkInTime: new Date(),
        lockerNumber: this.selectedLocker() ?? undefined,
      });

      if(this.selectedLocker()) {
        this.lockerStateService.takeLocker(this.selectedLocker()!)
      }

      this.resetSelection();
    }
  }

  checkOut(memberId: string): void {
    const attendance = this.attendances().find((a: Attendance) => a.memberId === memberId && !a.checkOutTime);
    if (attendance) {
      this.attendanceStateService.updateAttendance(attendance.id, { checkOutTime: new Date() });

      if (attendance.lockerNumber) {
        this.lockerStateService.releaseLocker(attendance.lockerNumber);
      }
      this.resetSelection();
    }
  }

  private resetSelection(): void {
    this.selectedMember.set(null);
    this.selectedLocker.set(null);
    this.assignLocker.set(false);
  }
}
