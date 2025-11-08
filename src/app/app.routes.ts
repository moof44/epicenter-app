import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./feature/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
  },
  {
    path: 'members',
    loadChildren: () => import('./feature/member/member.routes').then(m => m.MEMBER_ROUTES)
  },
  {
    path: 'check-in',
    loadChildren: () => import('./feature/check-in/check-in.routes').then(m => m.CHECK_IN_ROUTES)
  },
  {
    path: 'attendance',
    loadChildren: () => import('./feature/attendance/attendance.routes').then(m => m.ATTENDANCE_ROUTES)
  }
];
