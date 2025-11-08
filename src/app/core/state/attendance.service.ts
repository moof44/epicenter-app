import { inject, Injectable, signal } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  where,
  query,
  Timestamp,
} from '@angular/fire/firestore';
import { from, Observable, map } from 'rxjs';
import { Attendance } from '../models/attendance.model';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private firestore = inject(Firestore);
  private attendanceCollection = collection(this.firestore, 'attendance');

  private_todayAttendanceSignal = signal<Attendance[]>([]);
  public todayAttendance = this.private_todayAttendanceSignal.asReadonly();

  constructor() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = Timestamp.fromDate(today);

    const q = query(
      this.attendanceCollection,
      where('checkInTime', '>=', todayTimestamp)
    );

    const todayAttendance$ = (collectionData(q, {
      idField: 'id',
    }) as Observable<Attendance[]>).pipe(
      map(attendances => attendances.map(a => ({
        ...a,
        checkInTime: (a.checkInTime as any).toDate(),
        ...(a.checkOutTime && { checkOutTime: (a.checkOutTime as any).toDate() })
      })))
    );

    todayAttendance$.subscribe((attendances) => {
      this.private_todayAttendanceSignal.set(attendances);
    });
  }

  getAttendances(): Observable<Attendance[]> {
    return (collectionData(this.attendanceCollection, {
      idField: 'id',
    }) as Observable<Attendance[]>).pipe(
      map(attendances => attendances.map(a => ({
        ...a,
        checkInTime: (a.checkInTime as any).toDate(),
        ...(a.checkOutTime && { checkOutTime: (a.checkOutTime as any).toDate() })
      })))
    );
  }

  addAttendance(attendance: Partial<Attendance>): Observable<string> {
    const promise = addDoc(this.attendanceCollection, attendance).then(
      (response) => response.id
    );
    return from(promise);
  }

  updateAttendance(id: string, data: Partial<Attendance>): Observable<void> {
    const attendanceDoc = doc(this.firestore, `attendance/${id}`);
    const promise = updateDoc(attendanceDoc, data);
    return from(promise);
  }

  deleteAttendance(id: string): Observable<void> {
    const attendanceDoc = doc(this.firestore, `attendance/${id}`);
    const promise = deleteDoc(attendanceDoc);
    return from(promise);
  }
}
