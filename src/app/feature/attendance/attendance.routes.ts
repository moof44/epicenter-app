import { Route } from '@angular/router';
import { AttendanceDashboardComponent } from './attendance-dashboard.component';

export const ATTENDANCE_ROUTES: Route[] = [
  {
    path: '',
    component: AttendanceDashboardComponent,
  },
];
