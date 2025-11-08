import { Injectable, signal, computed, inject, effect } from '@angular/core';
import { Member } from '../models/models/member.model';
import { MemberService } from './member.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberStateService {
  private memberService = inject(MemberService);

  private _members = signal<Member[]>([]);
  public members = this._members.asReadonly();

  private _selectedMember = signal<Member | null>(null);
  public selectedMember = this._selectedMember.asReadonly();

  private _loading = signal<boolean>(true);
  public loading = this._loading.asReadonly();

  private _error = signal<any | null>(null);
  public error = this._error.asReadonly();

  private destroyed$ = new Subject<void>();

  constructor() {
    this.loadMembers();
    
    effect(() => {
      console.log(`Members loaded: ${this._members().length}`);
    });
  }

  loadMembers() {
    this._loading.set(true);
    this.memberService.getMembers()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (members) => {
          this._members.set(members);
          this._loading.set(false);
        },
        error: (error) => {
          this._error.set(error);
          this._loading.set(false);
        }
      });
  }

  selectMember(id: string) {
    this._loading.set(true);
    this.memberService.getMember(id)
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (member) => {
          this._selectedMember.set(member);
          this._loading.set(false);
        },
        error: (error) => {
          this._error.set(error);
          this._loading.set(false);
        }
      });
  }

  clearSelectedMember() {
    this._selectedMember.set(null);
  }

  addMember(member: Omit<Member, 'id'>) {
    this._loading.set(true);
    this.memberService.addMember(member)
      .then(() => this.loadMembers()) // Reload members after adding
      .catch(error => this._error.set(error))
      .finally(() => this._loading.set(false));
  }

  updateMember(member: Member) {
    this._loading.set(true);
    this.memberService.updateMember(member)
      .then(() => {
        this.loadMembers(); // Reload members after updating
        if (this._selectedMember()?.id === member.id) {
          this.selectMember(member.id); // Reselect to get updated data
        }
      })
      .catch(error => this._error.set(error))
      .finally(() => this._loading.set(false));
  }

  deleteMember(id: string) {
    this._loading.set(true);
    this.memberService.deleteMember(id)
      .then(() => this.loadMembers()) // Reload members after deleting
      .catch(error => this._error.set(error))
      .finally(() => this._loading.set(false));
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
