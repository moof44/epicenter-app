export type MembershipStatus = 'Active' | 'Expired' | 'Inactive';

export interface Member {
  id: string;
  name: string;
  address: string;
  contactNumber: string;
  goal: string;
  membershipStatus: MembershipStatus;
}
