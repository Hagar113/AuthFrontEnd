import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LookupService } from '../../../service/lookup.service';
import Swal from 'sweetalert2';
import { PagesResponse, Page } from '../../../models/pages/page-response';

@Component({
  selector: 'app-pages-view',
  templateUrl: './pages-view.component.html',
  styleUrls: ['./pages-view.component.css'],
})
export class PagesViewComponent implements OnInit {
  pages: Page[] = []; 
  pageName: string = 'pagesView';
  columns = [
    { key: 'displayId', title: 'Id' },
    { key: 'name', title: 'Name' },
  ];

  constructor(private lookupService: LookupService, private router: Router) {}

  ngOnInit(): void {
    this.getPages();
  }

  getPages(): void {
    this.lookupService.getAllPages().subscribe({
      next: (response: PagesResponse) => {
        if (response.success) {
          this.pages = Array.isArray(response.result) ? response.result : [];
          this.pages = this.pages.map((page, index) => ({
            ...page,
            displayId: index + 1,
          }));
          console.log('Pages fetched successfully:', this.pages);
        } else {
          console.error('Failed to fetch pages:', response.responseMessage);
        }
      },
      error: (err) => {
        console.error('Failed to fetch pages:', err);
      },
    });
  }
  

  confirmDeletePage(pageId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deletePage(pageId);
      }
    });
  }

  deletePage(pageId: number): void {
    this.lookupService.deletePage(pageId).subscribe({
      next: () => {
        Swal.fire('Deleted!', 'Page has been deleted.', 'success');
        this.getPages(); // Refresh the list after deletion
      },
      error: (err) => {
        Swal.fire('Failed!', 'Failed to delete page.', 'error');
        console.error('Failed to delete page', err);
      },
    });
  }

  editPage(pageId: number): void {
    this.router.navigate(['pages/lookup/pageForm', pageId]);
  }

  addPage(): void {
    this.router.navigate(['pages/lookup/pageForm', 0]);
  }

  onAction(event: { action: string, rowData: any }): void {
    switch(event.action) {
      case 'edit':
        this.editPage(event.rowData.id);
        break;
      case 'delete':
        this.confirmDeletePage(event.rowData.id);
        break;
      default:
        console.error('Unknown action:', event.action);
    }
  }
}
