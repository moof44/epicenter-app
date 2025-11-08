import { ChangeDetectionStrategy, Component, computed, inject, signal, HostListener, ElementRef, input, effect } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { MemberStateService } from '../../../../core/state/member-state.service';
import { Member, Gender } from '../../../../core/models/member.model';
import { GOALS } from '../../data/goals';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';

@Component({
  selector: 'app-member-update',
  templateUrl: './member-update.component.html',
  styleUrls: ['./member-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, LoadingComponent],
  providers: [DatePipe],
})
export class MemberUpdateComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  public memberState = inject(MemberStateService);
  private eRef = inject(ElementRef);
  private datePipe = inject(DatePipe);

  public id = input.required<string>();

  public memberForm = this.fb.group({
    name: ['', Validators.required],
    contactNumber: ['', Validators.required],
    address: ['', Validators.required],
    goal: ['', Validators.required],
    gender: ['', Validators.required],
    birthday: [''],
    subscription: [''],
    expiration: [''],
  });

  private member = computed(() => {
    const memberId = this.id();
    return this.memberState.members().find(m => m.id === memberId);
  });

  public goalInputValue = signal<string>('');
  public isDropdownVisible = signal<boolean>(false);
  public filteredGoals = computed(() =>
    GOALS.filter((goal: string) =>
      goal.toLowerCase().includes(this.goalInputValue().toLowerCase())
    )
  );

  constructor() {
    effect(() => {
      const foundMember = this.member();
      if (foundMember) {
        const birthdayDate = (foundMember.birthday as any)?.toDate ? (foundMember.birthday as any).toDate() : foundMember.birthday;
        const formattedBirthday = this.datePipe.transform(birthdayDate, 'yyyy-MM-dd') || '';
        const expirationDate = (foundMember.expiration as any)?.toDate ? (foundMember.expiration as any).toDate() : foundMember.expiration;
        const formattedExpiration = this.datePipe.transform(expirationDate, 'yyyy-MM-dd') || '';
        this.memberForm.patchValue({
          ...foundMember,
          birthday: formattedBirthday,
          expiration: formattedExpiration,
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
        birthday: formValue.birthday ? new Date(formValue.birthday) : null,
        subscription: formValue.subscription || null,
        expiration: formValue.expiration ? new Date(formValue.expiration) : null,
      };

      await this.memberState.updateMember(updatedMember);
      this.router.navigate(['/members']);
    }
  }

  public cancel(): void {
    this.router.navigate(['/members']);
  }
}
