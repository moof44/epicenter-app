
import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  docData,
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { Attendance } from '../models/models/attendance.model';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private firestore = inject(Firestore);
  private attendanceCollection = collection(this.firestore, 'attendance');

  getAttendances(): Observable<Attendance[]> {
    return collectionData(this.attendanceCollection, {
      idField: 'id',
    }) as Observable<Attendance[]>;
  }

  getAttendance(id: string): Observable<Attendance> {
    const attendanceDoc = doc(this.firestore, `attendance/${id}`);
    return docData(attendanceDoc, { idField: 'id' }) as Observable<Attendance>;
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
