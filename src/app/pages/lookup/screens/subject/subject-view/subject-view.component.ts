import { Component, OnInit } from '@angular/core';
import { DeleteSubjectRequest } from '../../../models/subjects/delete-subject-request';
import { Subject, SubjectResponse } from '../../../models/subjects/subject-response'; // Adjusted import
import { LookupService } from '../../../service/lookup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subject-view',
  templateUrl: './subject-view.component.html',
  styleUrls: ['./subject-view.component.css']
})
export class SubjectViewComponent implements OnInit {
  subjects: Subject[] = [];
  pageName: string = 'subjectView';
  columns = [
    { key: 'displayId', title: 'Id' },
    { key: 'name', title: 'Name' },
    { key: 'academicYear', title: 'Academic Year' },
  ];

  constructor(private lookupService: LookupService, private router: Router) {}

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
    const confirmDelete = confirm('Are you sure you want to delete this subject?');
    if (confirmDelete) {
      this.deleteSubject(subjectId);
    }
  }

  deleteSubject(subjectId: number): void {
    const request: DeleteSubjectRequest = { subjectId };
    this.lookupService.deleteSubject(request).subscribe({
      next: () => {
        alert('Subject deleted successfully');
        this.getSubjects(); // Refresh the list after deletion
      },
      error: (err) => {
        console.error('Failed to delete subject', err);
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
