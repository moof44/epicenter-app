import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberStateService } from '../../core/state/member-state.service';
import { AttendanceStateService } from '../../core/state/attendance-state.service';
import { LockerStateService } from '../../core/state/locker-state.service';
import { Member } from '../../core/models/models/member.model';
import { FormsModule } from '@angular/forms';
import { computed } from '@angular/core';
import { Attendance } from '../../core/models/models/attendance.model';

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
          [value]="searchTerm()"
          (input)="searchTerm.set($event.target.value)"
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
          <h2 class="details-title">Selected Member: {{ member.name }} ({{member.gender}})</h2>
          @if (!isMemberCheckedIn(member.id)) {
            <div class="locker-assignment">
              <label for="locker">Assign Locker?</label>
              <input type="checkbox" id="locker" [checked]="assignLocker()" (change)="assignLocker.set($event.target.checked)" />
            </div>

            @if (assignLocker()) {
              <select [ngModel]="selectedLocker()" (ngModelChange)="selectedLocker.set($event)" class="locker-select">
                @for (locker of availableLockers(); track locker.id) {
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

  public searchTerm = signal('');
  public filteredMembers = signal<Member[]>([]);
  public selectedMember = signal<Member | null>(null);
  public assignLocker = signal(false);
  public selectedLocker = signal<number | null>(null);

  private members = computed(() => this.memberStateService.members());
  public availableLockers = computed(() => {
    const member = this.selectedMember();
    if (member) {
      return this.lockerStateService.getAvailableLockersByGender(member.gender)();
    }
    return [];
  });

  constructor() {
    computed(() => {
      const term = this.searchTerm();
      if (term) {
        const lowercasedTerm = term.toLowerCase();
        const filtered = this.members().filter((m: Member) => m.name.toLowerCase().includes(lowercasedTerm));
        this.filteredMembers.set(filtered);
      } else {
        this.filteredMembers.set([]);
      }
    });
  }

  selectMember(member: Member): void {
    this.selectedMember.set(member);
    this.searchTerm.set('');
    this.filteredMembers.set([]);
  }

  isMemberCheckedIn(memberId: string): boolean {
    return this.attendanceStateService.attendances().some((a: Attendance) => a.memberId === memberId && !a.checkOutTime);
  }

  checkIn(): void {
    const member = this.selectedMember();
    if (member) {
      this.attendanceStateService.addAttendance({
        memberId: member.id,
        checkInTime: new Date(),
        lockerNumber: this.selectedLocker() ?? undefined,
      });

      if(this.selectedLocker()) {
        this.lockerStateService.takeLocker(this.selectedLocker()!)
      }

      this.resetSelection();
    }
  }

  checkOut(): void {
    const member = this.selectedMember();
    if (member) {
      const attendance = this.attendanceStateService.attendances().find((a: Attendance) => a.memberId === member.id && !a.checkOutTime);
      if (attendance) {
        this.attendanceStateService.updateAttendance(attendance.id, { checkOutTime: new Date() });

        if (attendance.lockerNumber) {
          this.lockerStateService.releaseLocker(attendance.lockerNumber);
        }
        this.resetSelection();
      }
    }
  }

  private resetSelection(): void {
    this.selectedMember.set(null);
    this.selectedLocker.set(null);
    this.assignLocker.set(false);
  }
}
