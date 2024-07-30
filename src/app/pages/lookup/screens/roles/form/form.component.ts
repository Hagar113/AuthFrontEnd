// src/app/components/form/form.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LookupService } from '../../../service/lookup.service';
import { SaveRoleRequest } from '../../../models/roles/save-role-request';
import { BaseRequestHeader } from '../../../models/roles/base-request-header';
import { RoleResponse } from '../../../models/roles/role-response';


@Component({
  selector: 'app-role-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  roleForm: FormGroup;
  id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private lookupService: LookupService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.roleForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(3)]],
      roleCode: ['', [Validators.required, Validators.pattern(/^[A-Z0-9]{3,10}$/)]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
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
          alert('Role not found');
        }
      },
      error: (err: any) => {
        console.error('Failed to load role', err);
        alert('Failed to load role');
      }
    });
  }

  save(): void {
    if (this.roleForm.valid) {
      const saveRoleRequest: SaveRoleRequest = {
        id: this.roleForm.value.id,
        name: this.roleForm.value.name,
        roleCode: this.roleForm.value.roleCode
      };

      const baseRequestHeader: BaseRequestHeader = {
        userId: 0,
        languageCode: 'en',
        data: JSON.stringify(saveRoleRequest)
      };

      this.lookupService.saveRole(baseRequestHeader).subscribe({
        next: () => {
          alert(this.roleForm.value.id ? 'Role updated successfully' : 'Role created successfully');
          this.roleForm.reset();
          this.router.navigate(['pages/lookup/roleForm', 0]);
        },
        error: (err: any) => {
          console.error('Failed to save role', err);
          alert('Failed to save role');
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/roles']);
  }

  get name() {
    return this.roleForm.get('name');
  }

  get roleCode() {
    return this.roleForm.get('roleCode');
  }
}
