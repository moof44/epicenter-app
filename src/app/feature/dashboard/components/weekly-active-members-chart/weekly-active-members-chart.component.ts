import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartOptions, ChartType, registerables } from 'chart.js';
import { AttendanceStateService } from '../../../../core/state/attendance-state.service';
import { eachDayOfInterval, endOfWeek, format, startOfWeek } from 'date-fns';
import { Attendance } from '../../../../core/models/models/attendance.model';

@Component({
  selector: 'app-weekly-active-members-chart',
  templateUrl: './weekly-active-members-chart.component.html',
  styleUrls: ['./weekly-active-members-chart.component.scss'],
  imports: [CommonModule, RouterModule, BaseChartDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeeklyActiveMembersChartComponent {
  private attendanceState = inject(AttendanceStateService);

  private weeklyAttendance = computed(() => {
    const now = new Date();
    const start = startOfWeek(now, { weekStartsOn: 1 });
    const end = endOfWeek(now, { weekStartsOn: 1 });
    const weekDays = eachDayOfInterval({ start, end });

    return weekDays.map(day => {
      return this.attendanceState.attendances().filter((a: Attendance) => {
        const checkInDate = new Date(a.checkInTime);
        return format(checkInDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd');
      }).length;
    });
  });

  public lineChartData: ChartConfiguration['data'] = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        data: this.weeklyAttendance(),
        label: 'Active Members',
        borderColor: '#ffd700',
        backgroundColor: 'rgba(255, 215, 0, 0.3)',
        pointBackgroundColor: '#ffd700',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
    ],
  };

  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { color: '#b0b0b0' },
        grid: { color: 'rgba(255,255,255,0.1)' },
      },
      y: {
        ticks: { color: '#b0b0b0' },
        grid: { color: 'rgba(255,255,255,0.1)' },
      },
    },
    plugins: {
      legend: { labels: { color: '#b0b0b0' } },
    },
  };

  public lineChartType: ChartType = 'line';

  constructor() {
    Chart.register(...registerables);
  }
}
