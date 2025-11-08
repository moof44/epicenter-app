import { ChangeDetectionStrategy, Component, computed, inject, signal, HostListener, ElementRef } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MemberStateService } from '../../../../core/state/member-state.service';
import { GOALS } from '../../../../core/data/goals';
import { Member, Gender } from '../../../../core/models/models/member.model';

@Component({
  selector: 'app-member-add',
  templateUrl: './member-add.component.html',
  styleUrls: ['./member-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule]
})
export class MemberAddComponent {
  private fb = inject(FormBuilder);
  private memberState = inject(MemberStateService);
  private router = inject(Router);
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
    GOALS.filter((goal: string) =>
      goal.toLowerCase().includes(this.goalInputValue().toLowerCase())
    )
  );

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

  public saveMember(): void {
    if (this.memberForm.valid) {
      const formValue = this.memberForm.value;
      const newMember: Omit<Member, 'id'> = {
        name: formValue.name!,
        address: formValue.address!,
        contactNumber: formValue.contactNumber!,
        goal: formValue.goal!,
        gender: formValue.gender! as Gender,
        membershipStatus: 'Active',
      };
      this.memberState.addMember(newMember);
      this.router.navigate(['/members']);
    }
  }

  public cancel(): void {
    this.router.navigate(['/members']);
  }
}
