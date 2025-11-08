import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberStateService } from '../../services/member-state.service';
import { AttendanceStateService } from '../../core/services/attendance-state.service';
import { LockerStateService } from '../../core/services/locker-state.service';
import { Member } from '../../core/models/member.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-check-in',
  template: `
    <div class="check-in-container">
      <div class="list-header">
        <h2 class="list-title">Member Check-in</h2>
      </div>

      <div class="search-container">
        <input
          type="text"
          placeholder="Search for a member..."
          class="search-input"
          [(ngModel)]="searchTerm"
          (ngModelChange)="searchMembers()"
        />
      </div>

      @if (filteredMembers().length > 0) {
        <ul class="member-list">
          @for (member of filteredMembers(); track member.id) {
            <li (click)="selectMember(member)" class="member-list-item">{{ member.name }}</li>
          }
        </ul>
      }

      @if (selectedMember(); as member) {
        <div class="member-details">
          <h2 class="details-title">Selected Member: {{ member.name }}</h2>
          @if (!isMemberCheckedIn(member.id)) {
            <div class="locker-assignment">
              <label for="locker">Assign Locker?</label>
              <input type="checkbox" id="locker" [(ngModel)]="assignLocker" />
            </div>

            @if (assignLocker) {
              <select [(ngModel)]="selectedLocker" class="locker-select">
                @for (locker of lockerStateService.getAvailableLockers(); track locker.id) {
                  <option [value]="locker.number">Locker {{ locker.number }}</option>
                }
              </select>
            }

            <button (click)="checkIn()" class="check-in-button">Check-in</button>
          } @else {
            <button (click)="checkOut()" class="check-out-button">Check-out</button>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .check-in-container {
      background-color: #242424;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    .list-header {
      margin-bottom: 1.5rem;
    }

    .list-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 2rem;
      color: #ffd700;
      margin: 0;
    }

    .search-container {
      margin-bottom: 1.5rem;
    }

    .search-input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #444;
      border-radius: 4px;
      background-color: #333;
      color: #fff;
      font-size: 1rem;
    }

    .search-input::placeholder {
      color: #888;
    }

    .member-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .member-list-item {
      background-color: #3a3a3a;
      border: 1px solid #444;
      padding: 1rem;
      cursor: pointer;
      color: #fff;
      transition: background-color 0.3s ease;
    }

    .member-list-item:hover {
      background-color: #4a4a4a;
    }

    .member-details {
      margin-top: 1.5rem;
      padding: 1.5rem;
      background-color: #2c2c2c;
      border-radius: 4px;
    }

    .details-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 1.5rem;
      color: #ffd700;
      margin-top: 0;
    }

    .locker-assignment {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
      color: #fff;
    }

    .locker-assignment label {
      margin-right: 1rem;
    }

    .locker-select {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #444;
      border-radius: 4px;
      background-color: #333;
      color: #fff;
      font-size: 1rem;
      margin-bottom: 1rem;
    }

    .check-in-button,
    .check-out-button {
      background-color: #ffd700;
      color: #242424;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.3s ease;
      width: 100%;
    }

    .check-in-button:hover,
    .check-out-button:hover {
      background-color: #e6c300;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule]
})
export class CheckInComponent {
  public memberStateService = inject(MemberStateService);
  public attendanceStateService = inject(AttendanceStateService);
  public lockerStateService = inject(LockerStateService);

  public searchTerm = '';
  public filteredMembers = signal<Member[]>([]);
  public selectedMember = signal<Member | null>(null);
  public assignLocker = false;
  public selectedLocker: number | null = null;

  searchMembers(): void {
    if (this.searchTerm) {
      const members = this.memberStateService.members().filter((m: Member) => m.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
      this.filteredMembers.set(members);
    } else {
      this.filteredMembers.set([]);
    }
  }

  selectMember(member: Member): void {
    this.selectedMember.set(member);
    this.searchTerm = '';
    this.filteredMembers.set([]);
  }

  isMemberCheckedIn(memberId: string): boolean {
    return this.attendanceStateService.attendance().some(a => a.memberId === memberId && !a.checkOutTime);
  }

  checkIn(): void {
    const member = this.selectedMember();
    if (member) {
      this.attendanceStateService.addAttendance({
        id: Date.now().toString(),
        memberId: member.id,
        checkInTime: new Date(),
        lockerNumber: this.selectedLocker ?? undefined,
      });
      if(this.selectedLocker) {
        this.lockerStateService.takeLocker(this.selectedLocker)
      }
      this.selectedMember.set(null);
      this.selectedLocker = null;
      this.assignLocker = false;
    }
  }

  checkOut(): void {
    const member = this.selectedMember();
    if (member) {
      const attendance = this.attendanceStateService.attendance().find(a => a.memberId === member.id && !a.checkOutTime);
      if (attendance) {
        this.attendanceStateService.attendance.update(attendances =>
          attendances.map(a =>
            a.id === attendance.id ? { ...a, checkOutTime: new Date() } : a
          )
        );
        if (attendance.lockerNumber) {
          this.lockerStateService.releaseLocker(attendance.lockerNumber);
        }
        this.selectedMember.set(null);
      }
    }
  }
}
