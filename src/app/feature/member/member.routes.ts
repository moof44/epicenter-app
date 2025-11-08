import { Routes } from '@angular/router';
import { MemberListComponent } from './components/member-list/member-list.component';
import { MemberAddComponent } from './components/member-add/member-add.component';
import { MemberUpdateComponent } from './components/member-update/member-update.component';

export const MEMBER_ROUTES: Routes = [
  {
    path: '',
    component: MemberListComponent
  },
  {
    path: 'add',
    component: MemberAddComponent
  },
  {
    path: 'update/:id',
    component: MemberUpdateComponent
  }
];
