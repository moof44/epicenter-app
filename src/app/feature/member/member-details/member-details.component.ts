import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberStateService } from '../../../core/state/member-state.service';
import { AttendanceStateService } from '../../../core/state/attendance-state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { computed } from '@angular/core';

@Component({
  selector: 'app-member-details',
  template: `
    @if (member(); as member) {
      <div class="member-details-card">
        <div class="card-header">
          <h2 class="card-title">{{ member.name }}</h2>
          <button class="close-button" (click)="close()">&times;</button>
        </div>
        <div class="card-content">
          <p><strong>Address:</strong> {{ member.address }}</p>
          <p><strong>Contact:</strong> {{ member.contactNumber }}</p>
          <p><strong>Goal:</strong> {{ member.goal }}</p>
          <p><strong>Gender:</strong> {{ member.gender }}</p>
          <p><strong>Status:</strong> <span [class]="'status-' + member.membershipStatus.toLowerCase()">{{ member.membershipStatus }}</span></p>
          @if(assignedLocker(); as lockerNumber) {
            <p><strong>Assigned Locker:</strong> {{ lockerNumber }}</p>
          }
        </div>
        <div class="card-footer">
           <button class="edit-button" (click)="editMember(member.id)">Edit</button>
        </div>
      </div>
    }
  `,
  styles: [`
    .member-details-card {
      background-color: #2c2c2c;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      color: #fff;
      margin: 2rem auto;
      max-width: 500px;
      overflow: hidden;
    }

    .card-header {
      background-color: #3a3a3a;
      padding: 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .card-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 2rem;
      color: #ffd700;
      margin: 0;
    }

    .close-button {
      background: none;
      border: none;
      color: #fff;
      font-size: 2rem;
      cursor: pointer;
    }

    .card-content {
      padding: 1.5rem;
    }

    .card-content p {
      margin: 0.5rem 0;
    }

    .status-active {
      color: #4caf50;
      font-weight: bold;
    }

    .status-inactive, .status-expired {
      color: #f44336;
      font-weight: bold;
    }

    .card-footer {
      background-color: #3a3a3a;
      padding: 1rem;
      text-align: right;
    }

    .edit-button {
      background-color: #ffd700;
      color: #242424;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .edit-button:hover {
      background-color: #e6c300;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class MemberDetailsComponent {
  private memberStateService = inject(MemberStateService);
  private attendanceStateService = inject(AttendanceStateService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public member = computed(() => {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.memberStateService.selectMember(id);
      return this.memberStateService.selectedMember();
    }
    return null;
  });
  
  public assignedLocker = computed(() => {
    const member = this.member();
    if (member) {
      const attendance = this.attendanceStateService.attendances().find(a => a.memberId === member.id && !a.checkOutTime);
      return attendance?.lockerNumber;
    }
    return null;
  });


  close() {
    this.memberStateService.clearSelectedMember();
    this.router.navigate(['/members']);
  }
  
  editMember(id: string) {
    this.router.navigate(['/members', id, 'edit']);
  }
}
