import { Injectable, signal, computed, inject } from '@angular/core';
import { Member } from '../models/models/member.model';
import { MemberService } from './member.service';

@Injectable({
  providedIn: 'root',
})
export class MemberStateService {
  private memberService = inject(MemberService);

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
    } catch (error) {
      this._error.set(error);
    } finally {
      this._loading.set(false);
    }
  }

  async updateMember(member: Member) {
    this._loading.set(true);
    try {
      await this.memberService.updateMember(member);
    } catch (error) {
      this._error.set(error);
    } finally {
      this._loading.set(false);
    }
  }

  async deleteMember(id: string) {
    this._loading.set(true);
    try {
      await this.memberService.deleteMember(id);
    } catch (error) {
      this._error.set(error);
    } finally {
      this._loading.set(false);
    }
  }
}
