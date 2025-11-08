import { Injectable, signal, computed } from '@angular/core';
import { Member } from '../core/models/member.model';
import { MEMBER_MOCK } from '@app/core/models/member.mock';

const initialMembers: Member[] = [
  { id: '1', name: 'John Doe', address: '123 Main St, Anytown, USA', contactNumber: '555-1234', goal: 'Lose weight', membershipStatus: 'Active' },
  { id: '2', name: 'Jane Smith', address: '456 Oak Ave, Anytown, USA', contactNumber: '555-5678', goal: 'Build muscle', membershipStatus: 'Active' },
  { id: '3', name: 'Peter Jones', address: '789 Pine Ln, Anytown, USA', contactNumber: '555-9012', goal: 'Improve cardio', membershipStatus: 'Inactive' },
];

@Injectable({
  providedIn: 'root'
})
export class MemberStateService {
  private readonly _members = signal<Member[]>(MEMBER_MOCK);
  public readonly members = this._members.asReadonly();

  public getMemberById(id: string) {
    return computed(() => this.members().find(m => m.id === id));
  }

  public addMember(member: Omit<Member, 'id' | 'membershipStatus'>) {
    const newMember: Member = {
      id: crypto.randomUUID(),
      ...member,
      membershipStatus: 'Active',
    };
    this._members.update(members => [...members, newMember]);
  }

  public updateMemberById(id: string, updatedMember: Partial<Member>) {
    this._members.update(members =>
      members.map(member =>
        member.id === id ? { ...member, ...updatedMember } : member
      )
    );
  }

  public toggleMembershipStatus(id: string) {
    this._members.update(members =>
      members.map(member =>
        member.id === id
          ? {
              ...member,
              membershipStatus: member.membershipStatus === 'Active' ? 'Inactive' : 'Active'
            }
          : member
      )
    );
  }
}
