import { computed, inject, Injectable, signal } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  DocumentReference,
  Timestamp,
} from '@angular/fire/firestore';
import { Member } from '../models/member.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private firestore: Firestore = inject(Firestore);
  private membersCollection = collection(this.firestore, 'members');

  private membersSignal = signal<Member[]>([]);
  public members = this.membersSignal.asReadonly();

  constructor() {
    const members$ = collectionData(this.membersCollection, {
      idField: 'id',
    }) as Observable<Member[]>;
    members$.pipe(
      map(members => members.map(member => ({
        ...member,
        birthday: this.convertToDate(member.birthday),
        expiration: this.convertToDate(member.expiration),
      })))
    ).subscribe((members) => {
      this.membersSignal.set(members);
    });
  }

  private convertToDate(date: any): Date | undefined {
    if (!date) {
      return undefined;
    }
    if (date instanceof Timestamp) {
      return date.toDate();
    }
    if (typeof date === 'string' || typeof date === 'number') {
      return new Date(date);
    }
    return date;
  }

  getMember(id: string) {
    return computed(() => this.members().find((m) => m.id === id));
  }

  addMember(member: Omit<Member, 'id'>): Promise<DocumentReference> {
    return addDoc(this.membersCollection, member);
  }

  updateMember(member: Member): Promise<void> {
    const memberDocRef = doc(this.firestore, `members/${member.id}`);
    const { id, ...data } = member;
    return updateDoc(memberDocRef, data);
  }

  deleteMember(id: string): Promise<void> {
    const memberDocRef = doc(this.firestore, `members/${id}`);
    return deleteDoc(memberDocRef);
  }
}