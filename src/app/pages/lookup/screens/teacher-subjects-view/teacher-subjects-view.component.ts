import { Component, OnInit } from '@angular/core';
import { LookupService } from '../../service/lookup.service';
import { Subject, SubjectResponse } from '../../models/subjects/subject-response';
import { TeacherResponse } from '../../models/teachers/teacher-response';


@Component({
  selector: 'app-teacher-subjects-view',
  templateUrl: './teacher-subjects-view.component.html',
  styleUrls: ['./teacher-subjects-view.component.css']
})
export class TeacherSubjectsViewComponent implements OnInit {
  subjects: Subject[] = [];
  teachers: TeacherResponse[] = [];
  selectedSubject: number | null = null;
  selectedTeacher: number | null = null;

  constructor(private lookupService: LookupService) {}

  ngOnInit(): void {
    this.getSubjects();
    this.getTeachers();
  }

  getSubjects(): void {
    this.lookupService.getAllSubjects().subscribe({
      next: (response: SubjectResponse) => {
        if (response.success) {
          this.subjects = Array.isArray(response.result) ? response.result : [response.result];
          console.log('Subjects fetched successfully:', this.subjects);
        } else {
          console.error('Failed to fetch subjects', response.responseMessage);
        }
      },
      error: (err) => {
        console.error('Failed to fetch subjects', err.message);
      },
    });
  }

  getTeachers(): void {
    this.lookupService.getAllTeachers().subscribe({
      next: (response: { success: boolean; result: TeacherResponse[]; responseMessage?: string }) => {
        if (response.success) {
          this.teachers = Array.isArray(response.result) ? response.result : [response.result];
          console.log('Teachers fetched successfully:', this.teachers);
        } else {
          console.error('Failed to fetch teachers', response.responseMessage);
        }
      },
      error: (err) => {
        console.error('Failed to fetch teachers', err.message);
      },
    });
  }

  saveSelection(): void {
    if (this.selectedTeacher && this.selectedSubject) {
      this.lookupService.assignSubjectToTeacher(this.selectedTeacher, this.selectedSubject).subscribe({
        next: (response: any) => {
          if (response.success) {
            console.log('Subject assigned to teacher successfully');
          } else {
            console.error('Failed to assign subject to teacher:', response.responseMessage || 'Unknown error');
          }
        },
        error: (err) => {
          console.error('Failed to assign subject to teacher', err.message);
          console.log('Full error response:', err);
        }
      });
    } else {
      console.error('Please select both teacher and subject');
    }
  }
  
  onTeacherSelectionChange(): void {
    if (this.selectedTeacher) {
      this.lookupService.getAssignedSubjects(this.selectedTeacher).subscribe({
        next: (response) => {
          if (response.success) {
            this.selectedSubject = response.result.id; // Assign the subject ID
            console.log('Assigned subject loaded:', this.selectedSubject);
          } else {
            console.error('Failed to load assigned subject:', response.responseMessage);
          }
        },
        error: (err) => {
          console.error('Failed to load assigned subject', err.message);
          console.log('Full error response:', err);
        }
      });
    } else {
      this.selectedSubject = null; 
    }
  }
  
  
}
