import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceStateService } from '../../core/state/attendance-state.service';
import { MemberStateService } from '../../core/state/member-state.service';

@Component({
  selector: 'app-attendance-dashboard',
  template: `
    <div class="attendance-container">
      <div class="list-header">
        <h2 class="list-title">Attendance Dashboard</h2>
      </div>

      <div class="dashboard-card">
        <h3 class="card-title">Currently Checked-in</h3>
        <ul class="attendance-list">
          @for (attendance of attendanceStateService.attendances(); track attendance.id) {
            @if (!attendance.checkOutTime) {
              <li class="attendance-list-item">
                <span>{{ getMemberName(attendance.memberId)() }}</span>
                <span>{{ attendance.checkInTime | date: 'shortTime' }}</span>
                @if (attendance.lockerNumber) {
                  <span>Locker: {{ attendance.lockerNumber }}</span>
                }
              </li>
            }
          }
        </ul>
      </div>

      <div class="dashboard-card">
        <h3 class="card-title">Today's History</h3>
        <ul class="attendance-list">
          @for (attendance of attendanceStateService.attendances(); track attendance.id) {
            @if (attendance.checkOutTime) {
              <li class="attendance-list-item">
                <span>{{ getMemberName(attendance.memberId)() }}</span>
                <span>{{ attendance.checkInTime | date: 'shortTime' }} - {{ attendance.checkOutTime | date: 'shortTime' }}</span>
              </li>
            }
          }
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .attendance-container {
      background-color: #242424;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    .list-header {
      margin-bottom: 1.5rem;
    }

    .list-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 2rem;
      color: #ffd700;
      margin: 0;
    }

    .dashboard-card {
      background-color: #2c2c2c;
      padding: 1.5rem;
      border-radius: 4px;
      margin-bottom: 1.5rem;
    }

    .card-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 1.5rem;
      color: #ffd700;
      margin-top: 0;
      margin-bottom: 1rem;
    }

    .attendance-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .attendance-list-item {
      background-color: #3a3a3a;
      border: 1px solid #444;
      padding: 1rem;
      color: #fff;
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      border-radius: 4px;
    }

    .attendance-list-item span {
      flex: 1;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
