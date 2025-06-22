import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'paginador-usuarios',
  standalone: false,
  templateUrl: './paginador.component.html',
  styleUrl: './paginador.component.css'
})
export class PaginadorComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Output() pageChanged = new EventEmitter<number>();

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChanged.emit(page);
    }
  }

  getPages(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }
}
