import { Injectable, signal, computed, inject } from '@angular/core';
import { Member } from '../models/member.model';
import { MemberService } from './member.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MemberStateService {
  private memberService = inject(MemberService);
  private snackBar = inject(MatSnackBar);

  public members = this.memberService.members;

  private _selectedMemberId = signal<string | null>(null);
  public selectedMember = computed(() => {
    const id = this._selectedMemberId();
    if (!id) return null;
    return this.members().find((m) => m.id === id) ?? null;
  });

  private _loading = signal<boolean>(false);
  public loading = this._loading.asReadonly();

  private _error = signal<any | null>(null);
  public error = this._error.asReadonly();

  selectMember(id: string | null) {
    this._selectedMemberId.set(id);
  }

  clearSelectedMember() {
    this._selectedMemberId.set(null);
  }

  async addMember(member: Omit<Member, 'id'>) {
    this._loading.set(true);
    try {
      await this.memberService.addMember(member);
      this.snackBar.open('Member added successfully!', 'Close', { 
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
        panelClass: ['app-snackbar']
      });
    } catch (error) {
      this._error.set(error);
      this.snackBar.open('Failed to add member.', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        verticalPosition: 'bottom',
        horizontalPosition: 'right'
      });
    } finally {
      this._loading.set(false);
    }
  }

  async updateMember(member: Member) {
    this._loading.set(true);
    try {
      await this.memberService.updateMember(member);
      this.snackBar.open('Member updated successfully!', 'Close', { 
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right', 
        panelClass: ['app-snackbar']
      });
    } catch (error) {
      this._error.set(error);
      this.snackBar.open('Failed to update member.', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        verticalPosition: 'bottom',
        horizontalPosition: 'right'
      });
    } finally {
      this._loading.set(false);
    }
  }
}
