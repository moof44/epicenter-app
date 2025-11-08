import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MemberStateService } from '../../../../core/state/member-state.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, FormsModule],
})
export class MemberListComponent {
  public memberState = inject(MemberStateService);
  public router = inject(Router);

  public searchTerm = signal('');
  public currentPage = signal(1);
  public itemsPerPage = signal(10);

  public filteredMembers = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.memberState.members().filter(member =>
      member.name.toLowerCase().includes(term) ||
      member.address.toLowerCase().includes(term) ||
      member.contactNumber.includes(term) ||
      member.goal.toLowerCase().includes(term)
    );
  });

  public totalPages = computed(() => {
    return Math.ceil(this.filteredMembers().length / this.itemsPerPage());
  });

  public paginatedMembers = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage();
    const endIndex = startIndex + this.itemsPerPage();
    return this.filteredMembers().slice(startIndex, endIndex);
  });

  public onSearch(event: Event) {
    this.searchTerm.set((event.target as HTMLInputElement).value);
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
    this.router.navigate(['/members', id, 'edit']);
  }
}
