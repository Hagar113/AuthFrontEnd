import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LookupService } from '../../../service/lookup.service';
import { SaveRoleRequest } from '../../../models/roles/save-role-request';
import { RoleResponse } from '../../../models/roles/role-response';
import { BaseRequestHeader } from 'src/app/shared/models/base-request-header';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-role-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  roleForm: FormGroup;
  id: number | null = null;
  currentLang: string = '';

  constructor(
    private fb: FormBuilder,
    private lookupService: LookupService,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) {
    this.roleForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(3)]],
      roleCode: [
        '',
        [Validators.required, Validators.pattern(/^[A-Z0-9]{3,10}$/)],
      ],
    });
    this.currentLang = localStorage.getItem('currentLang') || 'en';
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = +params.get('id')!;
      if (this.id && this.id !== 0) {
        this.loadRole(this.id);
      }
    });

    this.router.events.subscribe(() => {
      const url = this.router.url;
      const urlId = Number(url.substring(url.lastIndexOf('/') + 1));
      if (urlId && urlId !== 0 && urlId !== this.id) {
        this.id = urlId;
        this.loadRole(this.id);
      }
    });
  }

  loadRole(id: number): void {
    this.lookupService.getRoleById(id).subscribe({
      next: (response: RoleResponse) => {
        if (response.success && response.result) {
          this.roleForm.patchValue(response.result);
        } else {
          Swal.fire('Error', 'Role not found', 'error');
        }
      },
      error: (err: any) => {
        console.error('Failed to load role', err);
        Swal.fire('Error', 'Failed to load role', 'error');
      },
    });
  }

  save(): void {
    if (this.roleForm.valid) {
      const saveRoleRequest: SaveRoleRequest = {
        id: this.roleForm.value.id || 0,
        name: this.roleForm.value.name,
        roleCode: this.roleForm.value.roleCode,
      };

      const requestPayload: BaseRequestHeader = {
        userId: 0,
        languageCode: 'en',
        data: saveRoleRequest,
      };

      this.lookupService.saveRole(requestPayload).subscribe({
        next: () => {
          Swal.fire(
            'Success',
            this.roleForm.value.id
              ? 'Role updated successfully'
              : 'Role created successfully',
            'success'
          );
          this.roleForm.reset();
          this.router.navigate(['pages/lookup/roleForm', 0]);
        },
        error: (err: any) => {
          console.error('Failed to save role', err);
          Swal.fire('Error', 'Failed to save role. Please try again later.', 'error');
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
        this.router.navigate(['/pages/lookup/roles']);
      }
    });
  }

  get name() {
    return this.roleForm.get('name');
  }

  get roleCode() {
    return this.roleForm.get('roleCode');
  }
}
