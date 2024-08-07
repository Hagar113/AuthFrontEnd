import { Component, OnInit } from '@angular/core';
import { DeleteSubjectRequest } from '../../../models/subjects/delete-subject-request';
import { Subject, SubjectResponse } from '../../../models/subjects/subject-response'; // Adjusted import
import { LookupService } from '../../../service/lookup.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subject-view',
  templateUrl: './subject-view.component.html',
  styleUrls: ['./subject-view.component.css']
})
export class SubjectViewComponent implements OnInit {
  subjects: Subject[] = [];
  pageName: string = 'subjectView';
  columns = [
    { key: 'displayId', title: this.translate.instant('Id') },
    { key: 'name', title: this.translate.instant('Name') },
    { key: 'academicYear', title: this.translate.instant('Academic Year') },
  ];

  constructor(
    private lookupService: LookupService,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.getSubjects();
  }

  getSubjects(): void {
    this.lookupService.getAllSubjects().subscribe({
      next: (response: SubjectResponse) => {
        if (response.success) {
          const subjects = Array.isArray(response.result) ? response.result : [response.result];
          this.subjects = subjects.map((subject, index) => ({
            ...subject,
            displayId: index + 1,
          }));
          console.log('Subjects fetched successfully:', this.subjects);
        } else {
          console.error('Failed to fetch subjects', response.responseMessage);
        }
      },
      error: (err) => {
        console.error('Failed to fetch subjects', err.message);
        console.error('Full error details:', err);
      },
    });
  }

  confirmDeleteSubject(subjectId: number): void {
    Swal.fire({
      title: this.translate.instant('Are you sure?'),
      text: this.translate.instant('You won\'t be able to revert this!'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.translate.instant('Yes, delete it!'),
      cancelButtonText: this.translate.instant('No, keep it')
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteSubject(subjectId);
      }
    });
  }

  deleteSubject(subjectId: number): void {
    const request: DeleteSubjectRequest = { subjectId };
    this.lookupService.deleteSubject(request).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: this.translate.instant('Deleted'),
          text: this.translate.instant('Subject deleted successfully')
        });
        this.getSubjects(); // Refresh the list after deletion
      },
      error: (err) => {
        console.error('Failed to delete subject', err);
        Swal.fire({
          icon: 'error',
          title: this.translate.instant('Error'),
          text: this.translate.instant('Failed to delete subject')
        });
      },
    });
  }

  editSubject(subjectId: number): void {
    this.router.navigate(['pages/lookup/subjectForm', subjectId]);
  }

  addSubject(): void {
    this.router.navigate(['pages/lookup/subjectForm', 0]);
  }

  onAction(event: { action: string, rowData: any }): void {
    switch(event.action) {
      case 'edit':
        this.editSubject(event.rowData.id);
        break;
      case 'delete':
        this.confirmDeleteSubject(event.rowData.id);
        break;
      default:
        console.error('Unknown action:', event.action);
    }
  }
}
