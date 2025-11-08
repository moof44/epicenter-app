export type MembershipStatus = 'Active' | 'Expired' | 'Inactive';

export enum Gender {
  Male = 'Male',
  Female = 'Female',
}

export interface Member {
  id: string;
  name: string;
  address: string;
  contactNumber: string;
  goal: string;
  membershipStatus: MembershipStatus;
  gender: Gender;
  birthday?: Date;
}
