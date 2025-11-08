import { ChangeDetectionStrategy, Component, computed, inject, signal, HostListener, ElementRef, effect } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MemberStateService } from '../../../../core/state/member-state.service';
import { Member, Gender } from '../../../../core/models/models/member.model';
import { GOALS } from '../../../../core/data/goals';

@Component({
  selector: 'app-member-update',
  templateUrl: './member-update.component.html',
  styleUrls: ['./member-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class MemberUpdateComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  public memberState = inject(MemberStateService);
  private eRef = inject(ElementRef);

  public memberForm = this.fb.group({
    name: ['', Validators.required],
    contactNumber: ['', Validators.required],
    address: ['', Validators.required],
    goal: ['', Validators.required],
    gender: ['', Validators.required],
  });

  public goalInputValue = signal<string>('');
  public isDropdownVisible = signal<boolean>(false);
  public filteredGoals = computed(() =>
    GOALS.filter((goal) =>
      goal.toLowerCase().includes(this.goalInputValue().toLowerCase())
    )
  );
  
  private memberId: string = this.route.snapshot.paramMap.get('id') || '';

  constructor() {
    this.memberState.selectMember(this.memberId);

    effect(() => {
      const member = this.memberState.selectedMember();
      if (member) {
        this.memberForm.patchValue(member);
        this.goalInputValue.set(member.goal || '');
      }
    });
  }

  @HostListener('document:click', ['$event'])
  clickout(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isDropdownVisible.set(false);
    }
  }

  public onGoalInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.goalInputValue.set(value);
    this.memberForm.get('goal')?.setValue(value);
    this.isDropdownVisible.set(true);
  }

  public selectGoal(goal: string): void {
    this.memberForm.get('goal')?.setValue(goal);
    this.goalInputValue.set(goal);
    this.isDropdownVisible.set(false);
  }

  public updateMember(): void {
    if (this.memberForm.valid) {
      const originalMember = this.memberState.selectedMember();
      if (!originalMember) return; // Should not happen

      const formValue = this.memberForm.value;
      const updatedMember: Member = {
        id: originalMember.id,
        membershipStatus: originalMember.membershipStatus,
        name: formValue.name!,
        address: formValue.address!,
        contactNumber: formValue.contactNumber!,
        goal: formValue.goal!,
        gender: formValue.gender! as Gender,
      };

      this.memberState.updateMember(updatedMember);
      this.router.navigate(['/members']);
    }
  }

  public cancel(): void {
    this.memberState.clearSelectedMember();
    this.router.navigate(['/members']);
  }
}
