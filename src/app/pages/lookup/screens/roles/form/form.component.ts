import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LookupService } from '../../../service/lookup.service';
import { SaveRoleRequest } from '../../../models/roles/save-role-request';
import { Role, RoleResponse } from '../../../models/roles/role-response';
import { BaseRequestHeader } from 'src/app/shared/models/base-request-header';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { Page, PagesResponse } from '../../../models/pages/page-response';

@Component({
  selector: 'app-role-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  roleForm: FormGroup;
  id: number | null = null;
  dropdownOptions: Array<{ value: string; label: string }> = [];

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
      roleCode: ['', [Validators.required, Validators.pattern(/^[A-Z0-9]{3,10}$/)]],
      dropdown: [[], Validators.required]  // Ensure this is an array
    });
  }

  ngOnInit(): void {
    this.loadPages(); // Load pages when component initializes

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

  loadPages(): void {
    this.lookupService.getAllPages().subscribe({
      next: (response: PagesResponse) => {
        if (response.success) {
          const pages: Page[] = Array.isArray(response.result) ? response.result : [response.result];
          this.dropdownOptions = pages.map((page: Page) => ({
            value: page.id.toString(),
            label: page.name
          }));
        } else {
          Swal.fire('Error', 'Failed to load pages', 'error');
        }
      },
      error: (err: any) => {
        console.error('Failed to load pages', err);
        Swal.fire('Error', 'Failed to load pages', 'error');
      },
    });
  }

  loadRole(id: number): void {
    this.lookupService.getRoleById(id).subscribe({
      next: (response: RoleResponse) => {
        if (response.success && response.result) {
          const role = response.result as Role;
          this.roleForm.patchValue({
            ...role,
            dropdown: role.dropdown || []
          });
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
        dropdown: this.roleForm.value.dropdown
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
      text: 'Any unsaved changes will be lost!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.id && this.id !== 0) {
          // If editing an existing item, reload the data
          this.loadRole(this.id);
        } else {
          // If adding a new item, reset the form
          this.roleForm.reset();
        }
        this.router.navigate(['pages/lookup/roleForm', 0]);
      }
    });
  }
  

  get name() {
    return this.roleForm.get('name');
  }

  get roleCode() {
    return this.roleForm.get('roleCode');
  }

  get dropdown() {
    return this.roleForm.get('dropdown');
  }
}
