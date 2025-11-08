import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { MemberStateService } from '../../core/state/member-state.service';
import { MemberListComponent } from './components/member-list/member-list.component';
import { MemberUpdateComponent } from './components/member-update/member-update.component';
import { MemberAddComponent } from './components/member-add/member-add.component';

const memberResolver = () => {
  const memberState = inject(MemberStateService);
  memberState.loadMembers();
  return memberState.loading();
};

export const MEMBER_ROUTES: Routes = [
  {
    path: '',
    component: MemberListComponent,
    resolve: {
      members: memberResolver
    }
  },
  {
    path: 'add',
    component: MemberAddComponent
  },
  {
    path: ':id/edit',
    component: MemberUpdateComponent,
    resolve: {
      members: memberResolver
    }
  }
];
