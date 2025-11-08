export interface Attendance {
  id: string;
  memberId: string;
  checkInTime: Date;
  checkOutTime?: Date;
  lockerNumber?: number;
}
