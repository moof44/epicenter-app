import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MemberStateService } from '@app/services/member-state.service';
import { AttendanceStateService } from '@app/core/services/attendance-state.service';
import { LockerStateService } from '@app/core/services/locker-state.service';
import { WeeklyActiveMembersChartComponent } from './components/weekly-active-members-chart/weekly-active-members-chart.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, WeeklyActiveMembersChartComponent]
})
export class DashboardComponent {
  private memberState = inject(MemberStateService);
  private attendanceState = inject(AttendanceStateService);
  private lockerState = inject(LockerStateService);

  public totalMembers = computed(() => this.memberState.members().length);
  public checkedInCount = computed(() => this.attendanceState.attendance().filter(a => !a.checkOutTime).length);
  public availableLockers = computed(() => this.lockerState.getAvailableLockers().length);
  public totalLockers = computed(() => this.lockerState.lockers().length);
}
