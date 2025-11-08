import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberStateService } from '../../../../core/state/member-state.service';
import { Router, RouterModule } from '@angular/router';
import { Member } from '../../../../core/models/models/member.model';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule]
})
export class MemberListComponent {
  public memberState = inject(MemberStateService);
  private router = inject(Router);

  public searchTerm = signal('');
  public currentPage = signal(1);
  public pageSize = 10;

  public filteredMembers = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) {
      return this.memberState.members();
    }
    return this.memberState.members().filter((member: Member) =>
      member.name.toLowerCase().includes(term) ||
      member.contactNumber.toLowerCase().includes(term) ||
      member.goal.toLowerCase().includes(term)
    );
  });

  public paginatedMembers = computed(() => {
    const allMembers = this.filteredMembers();
    const startIndex = (this.currentPage() - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return allMembers.slice(startIndex, endIndex);
  });

  public totalPages = computed(() => {
    const total = this.filteredMembers().length;
    return total > 0 ? Math.ceil(total / this.pageSize) : 1;
  });
  
  public onSearch(event: Event): void {
    const term = (event.target as HTMLInputElement).value;
    this.searchTerm.set(term);
    this.currentPage.set(1);
  }

  public nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(page => page + 1);
    }
  }

  public previousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update(page => page - 1);
    }
  }

  public goToUpdate(id: string): void {
    this.router.navigate(['/members/update', id]);
  }
}
