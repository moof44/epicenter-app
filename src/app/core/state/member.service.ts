import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  addDoc,
  updateDoc,
  deleteDoc,
  DocumentReference,
} from '@angular/fire/firestore';
import { Member } from '../models/models/member.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private firestore: Firestore = inject(Firestore);
  private membersCollection = collection(this.firestore, 'members');

  getMembers(): Observable<Member[]> {
    return (collectionData(this.membersCollection, { idField: 'id' }) as Observable<Member[]>).pipe(
      tap((v) => console.log('member: ', v))
    );
  }

  getMember(id: string): Observable<Member> {
    const memberDocRef = doc(this.firestore, `members/${id}`);
    return docData(memberDocRef, { idField: 'id' }) as Observable<Member>;
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
