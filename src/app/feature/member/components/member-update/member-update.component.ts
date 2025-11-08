import { ChangeDetectionStrategy, Component, computed, inject, signal, HostListener, ElementRef, input, effect } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MemberStateService } from '../../../../core/state/member-state.service';
import { Member, Gender } from '../../../../core/models/models/member.model';
import { GOALS } from '../../../../core/data/goals';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';

@Component({
  selector: 'app-member-update',
  templateUrl: './member-update.component.html',
  styleUrls: ['./member-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, LoadingComponent],
})
export class MemberUpdateComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  public memberState = inject(MemberStateService);
  private eRef = inject(ElementRef);

  public id = input.required<string>();

  public memberForm = this.fb.group({
    name: ['', Validators.required],
    contactNumber: ['', Validators.required],
    address: ['', Validators.required],
    goal: ['', Validators.required],
    gender: ['', Validators.required],
    birthday: [''],
  });

  private member = computed(() => {
    const memberId = this.id();
    return this.memberState.members().find(m => m.id === memberId);
  });

  public goalInputValue = signal<string>('');
  public isDropdownVisible = signal<boolean>(false);
  public filteredGoals = computed(() =>
    GOALS.filter((goal) =>
      goal.toLowerCase().includes(this.goalInputValue().toLowerCase())
    )
  );

  constructor() {
    effect(() => {
      const foundMember = this.member();
      if (foundMember) {
        this.memberForm.patchValue({
          ...foundMember,
          birthday: foundMember.birthday ? new Date(foundMember.birthday).toISOString().split('T')[0] : ''
        });
        this.goalInputValue.set(foundMember.goal || '');
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

  public async updateMember(): Promise<void> {
    if (this.memberForm.valid) {
      const originalMember = this.member();
      if (!originalMember) return;

      const formValue = this.memberForm.value;
      const updatedMember: Member = {
        id: originalMember.id,
        membershipStatus: originalMember.membershipStatus,
        name: formValue.name!,
        address: formValue.address!,
        contactNumber: formValue.contactNumber!,
        goal: formValue.goal!,
        gender: formValue.gender! as Gender,
        birthday: formValue.birthday ? new Date(formValue.birthday) : undefined,
      };

      await this.memberState.updateMember(updatedMember);
      this.router.navigate(['/members']);
    }
  }

  async deleteMember(): Promise<void> {
    const memberId = this.id();
    if (memberId) {
      await this.memberState.deleteMember(memberId);
      this.router.navigate(['/members']);
    }
  }

  public cancel(): void {
    this.router.navigate(['/members']);
  }
}
