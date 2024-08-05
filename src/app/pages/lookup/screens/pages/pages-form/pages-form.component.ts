import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import { BaseRequestHeader } from 'src/app/shared/models/base-request-header';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { LookupService } from '../../../service/lookup.service';
import { PagesResponse } from '../../../models/pages/page-response';
import { SavePageRequest } from '../../../models/pages/save-page-request';

@Component({
  selector: 'app-page-form',
  templateUrl: './pages-form.component.html',
  styleUrls: ['./pages-form.component.css'],
})
export class PagesFormComponent implements OnInit {
  pageForm: FormGroup;
  id: number | null = null;
  currentLang: string = '';

  constructor(
    private fb: FormBuilder,
    private lookupService: LookupService,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) {
    this.pageForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
    this.currentLang = localStorage.getItem('currentLang') || 'en';
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = +params.get('id')!;
      if (this.id && this.id !== 0) {
        this.loadPage(this.id);
      }
    });

    this.router.events.subscribe(() => {
      const url = this.router.url;
      const urlId = Number(url.substring(url.lastIndexOf('/') + 1));
      if (urlId && urlId !== 0 && urlId !== this.id) {
        this.id = urlId;
        this.loadPage(this.id);
      }
    });
  }

  loadPage(id: number): void {
    this.lookupService.getPageById(id).subscribe({
      next: (response: PagesResponse) => {
        if (response.success && response.result) {
          this.pageForm.patchValue(response.result);
        } else {
          Swal.fire('Error', 'Page not found', 'error');
        }
      },
      error: (err: any) => {
        console.error('Failed to load page', err);
        Swal.fire('Error', 'Failed to load page', 'error');
      },
    });
  }

  save(): void {
    if (this.pageForm.valid) {
      const savePageRequest: SavePageRequest = {
        id: this.pageForm.value.id || 0,
        name: this.pageForm.value.name,
      };

      const requestPayload: BaseRequestHeader = {
        userId: 0,
        languageCode: 'en',
        data: savePageRequest,
      };

      this.lookupService.savePage(requestPayload).subscribe({
        next: () => {
          Swal.fire(
            'Success',
            this.pageForm.value.id
              ? 'Page updated successfully'
              : 'Page created successfully',
            'success'
          );
          this.pageForm.reset();
          this.router.navigate(['pages/lookup/pageForm', 0]);
        },
        error: (err: any) => {
          console.error('Failed to save page', err);
          Swal.fire('Error', 'Failed to save page. Please try again later.', 'error');
        },
      });
    } else {
      Swal.fire('Error', 'Please correct the errors in the form.', 'error');
    }
  }

  cancel(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/pages/lookup/pages']);
      }
    });
  }

  get name() {
    return this.pageForm.get('name');
  }
}
