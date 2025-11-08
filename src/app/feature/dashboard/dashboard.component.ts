import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WeeklyActiveMembersChartComponent } from './components/weekly-active-members-chart/weekly-active-members-chart.component';
import { DashboardStateService } from '../../core/state/dashboard-state.service';
import { StatCardComponent } from '../../core/components/stat-card/stat-card.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, WeeklyActiveMembersChartComponent, StatCardComponent]
})
export class DashboardComponent {
  public dashboardState = inject(DashboardStateService);
}
