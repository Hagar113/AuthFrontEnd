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

  constructor(private lookupService: LookupService, private router: Router) { }

  ngOnInit(): void {
    this.getSubjects();
  }

  getSubjects(): void {
    this.lookupService.getAllSubjects().subscribe({
      next: (response: SubjectResponse) => {
        if (response.success) {
          this.subjects = Array.isArray(response.result) ? response.result : [response.result];
        } else {
          console.error('Failed to fetch subjects', response.responseMessage);
        }
      },
      error: (err: any) => {
        console.error('Failed to fetch subjects', err);
      }
    });
  }

  deleteSubject(subjectId: number): void {
    const deleteSubjectRequest: DeleteSubjectRequest = { subjectId };
    this.lookupService.deleteSubject(deleteSubjectRequest).subscribe({
      next: () => {
        alert('Subject deleted successfully');
        this.getSubjects(); // Refresh the list after deletion
      },
      error: (err: any) => {
        console.error('Failed to delete subject', err);
      }
    });
  }

  editSubject(subjectId: number): void {
    this.router.navigate(['pages/lookup/subjectForm', subjectId]);
  }

  addSubject(): void {
    this.router.navigate(['pages/lookup/subjectForm', 0]);
  }
}
