import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LookupService } from '../../../service/lookup.service';
import { SaveSubjectRequest } from '../../../models/subjects/save-subject-request';
import { BaseRequestHeader } from '../../../models/roles/base-request-header';
import { Subject, SubjectResponse } from '../../../models/subjects/subject-response'; 

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.css']
})
export class SubjectFormComponent implements OnInit {
  subjectForm: FormGroup;
  id: number | null = null;

  constructor(private fb: FormBuilder,
              private lookupService: LookupService,
              private router: Router,
              private route: ActivatedRoute) {
    this.subjectForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(3)]],
      academicYear: ['', [Validators.required, Validators.pattern(/^\d{4}(-\d{4})?$/)]]
    });
  }

  ngOnInit(): void {
  
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id')!;
      if (this.id && this.id !== 0) {
        this.loadSubject(this.id);
      }
    });

    
    this.router.events.subscribe(() => {
      const url = this.router.url;
      const urlId = Number(url.substring(url.lastIndexOf('/') + 1));
      if (urlId && urlId !== 0 && urlId !== this.id) {
        this.id = urlId;
        this.loadSubject(this.id);
      }
    });
  }

  
  loadSubject(id: number): void {
    this.lookupService.getSubjectById(id).subscribe({
      next: (response: SubjectResponse) => {
        if (response.success && response.result) {
          if (Array.isArray(response.result)) {
            
            const subject = response.result.find(subj => subj.id === id);
            if (subject) {
              this.subjectForm.patchValue(subject);
            } else {
              alert('Subject not found');
            }
          } else {
      
            this.subjectForm.patchValue(response.result);
          }
        } else {
          alert('Subject not found');
        }
      },
      error: (err: any) => {
        console.error('Failed to load subject', err);
        alert('Failed to load subject');
      }
    });
  }


  save(): void {
    if (this.subjectForm.valid) {
      const saveSubjectRequest: SaveSubjectRequest = {
        SubjectId: this.subjectForm.value.id,
        SubjectName: this.subjectForm.value.name,
        academicYear: this.subjectForm.value.academicYear
      };
  
      const baseRequestHeader: BaseRequestHeader = {
        userId: null, 
        languageCode: 'en',
        data: JSON.stringify(saveSubjectRequest)
      };
  
      this.lookupService.saveSubject(baseRequestHeader).subscribe({
        next: () => {
          alert(this.subjectForm.value.id ? 'Subject updated successfully' : 'Subject created successfully');
        
          this.subjectForm.reset();
          
          this.router.navigate(['pages/lookup/subjectForm', 0]);
        },
        error: (err: any) => {
          console.error('Failed to save subject', err);
          alert('Failed to save subject');
        }
      });
    }
  }
  

  cancel(): void {
    this.router.navigate(['pages/lookup/subjectForm']);
  }

  get Name() {
    return this.subjectForm.get('name');
  }

  get AcademicYear() {
    return this.subjectForm.get('academicYear');
  }
}
