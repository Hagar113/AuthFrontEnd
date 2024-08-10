// src/app/pages/lookup/components/form/form.component.ts

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
import { AssignedPage, AssignedPagesResponse } from '../../../models/users/get-assigned-pages';

@Component({
  selector: 'app-role-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  roleForm: FormGroup;
  id: number | null = null;
  allPages: Page[] = []; // Store all pages
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
      SelectedPageIds: [[], Validators.required] // Ensure this is an array of numbers
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
        if (response.success && response.result) {
          this.allPages = response.result; 
          this.updateDropdownOptions();
        } else {
          Swal.fire('Error', 'Failed to load pages', 'error');
        }
      },
      error: (err: any) => {
        console.error('Error loading pages', err);
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
          });

          this.loadAssignedPages(id); // Load assigned pages to set selected options
        } else {
          Swal.fire('Error', 'Role not found', 'error');
        }
      },
      error: (err: any) => {
        Swal.fire('Error', 'Failed to load role', 'error');
      },
    });
  }

  loadAssignedPages(roleId: number): void {
    this.lookupService.getAssignedPagesForRole(roleId).subscribe({
      next: (response: AssignedPagesResponse) => {
        if (response.success && response.result) {
          
          const assignedPages: AssignedPage[] = response.result;
  
          
          this.dropdownOptions = this.allPages.map(page => ({
            value: page.pageId.toString(),
            label: page.pageName
          }));
  
        
          const selectedPageIds = assignedPages.map(page => page.id.toString());
          this.roleForm.patchValue({
            SelectedPageIds: selectedPageIds
          });
        } else {
          Swal.fire('Error', 'Failed to load assigned pages', 'error');
        }
      },
      error: (err: any) => {
        console.error('Error loading assigned pages', err);
        Swal.fire('Error', 'Failed to load assigned pages', 'error');
      }
    });
  }
  

  updateDropdownOptions(): void {
    this.dropdownOptions = this.allPages.map(page => ({
      value: page.pageId.toString(),
      label: page.pageName
    }));
  }

  save(): void {
    if (this.roleForm.valid) {
      const saveRoleRequest: SaveRoleRequest = {
        id: this.roleForm.value.id || 0,
        name: this.roleForm.value.name,
        roleCode: this.roleForm.value.roleCode,
        SelectedPageIds: this.roleForm.value.SelectedPageIds
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
          Swal.fire('Error', 'Failed to save role. Please try again later.', 'error');
        },
      });
    }
  }

  cancel(): void {
    this.router.navigate(['pages/lookup/roles']);
  }

  get name() {
    return this.roleForm.get('name');
  }

  get roleCode() {
    return this.roleForm.get('roleCode');
  }

  get SelectedPageIds() {
    return this.roleForm.get('SelectedPageIds');
  }
}
