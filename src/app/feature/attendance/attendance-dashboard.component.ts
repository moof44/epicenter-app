import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceStateService } from '../../core/state/attendance-state.service';
import { MemberStateService } from '../../core/state/member-state.service';

@Component({
  selector: 'app-attendance-dashboard',
  templateUrl: './attendance-dashboard.component.html',
  styleUrls: ['./attendance-dashboard.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class AttendanceDashboardComponent {
  public attendanceStateService = inject(AttendanceStateService);
  public memberStateService = inject(MemberStateService);

  getMemberName(memberId: string) {
    return computed(() => {
        const member = this.memberStateService.members().find(m => m.id === memberId);
        return member ? member.name : 'Unknown Member';
    });
  }
}
