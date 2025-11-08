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
} from '@angular/fire/firestore';
import { Member } from '../models/member.model';
import { Observable } from 'rxjs';

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
    members$.subscribe((members) => {
      this.membersSignal.set(members);
    });
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