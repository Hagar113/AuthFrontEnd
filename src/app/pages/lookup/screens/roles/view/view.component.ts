import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LookupService } from '../../../service/lookup.service';
import { Role, RoleResponse } from '../../../models/roles/role-response';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  roles: Role[] = [];
  pageName: string = 'roleView';
  columns = [
    { key: 'displayId', title: 'Id' },
    { key: 'name', title: 'Name' },
    { key: 'roleCode', title: 'Role Code' },
  ];

  actions = [
    {
      key: 'edit',
      title: 'Edit',
      handler: (rowData: any) => {
        if (rowData && rowData.id) {
          this.editRole(rowData.id);
        } else {
          console.error('Invalid rowData for edit:', rowData);
        }
      },
    },
    {
      key: 'delete',
      title: 'Delete',
      handler: (rowData: any) => {
        if (rowData && rowData.id) {
          this.deleteRole(rowData.id);
        } else {
          console.error('Invalid rowData for delete:', rowData);
        }
      },
    },
  ];

  constructor(private lookupService: LookupService, private router: Router) {}

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles(): void {
    this.lookupService.getAllRoles().subscribe({
      next: (response: RoleResponse) => {
        if (response.success) {
          const roles = Array.isArray(response.result) ? response.result : [response.result];
          this.roles = roles.map((role, index) => ({
            ...role,
            displayId: index + 1,
          }));
          console.log('Roles fetched successfully:', this.roles);
        } else {
          console.error('Failed to fetch roles', response.responseMessage);
        }
      },
      error: (err) => {
        console.error('Failed to fetch roles', err.message);
        console.error('Full error details:', err);
      },
    });
  }

  deleteRole(roleId: number): void {
    this.lookupService.deleteRole(roleId).subscribe({
      next: () => {
        alert('Role deleted successfully');
        this.getRoles(); // Refresh the list after deletion
      },
      error: (err) => {
        console.error('Failed to delete role', err);
      },
    });
  }

  editRole(roleId: number): void {
    this.router.navigate(['pages/lookup/roleForm', roleId]);
  }

  addRole(): void {
    this.router.navigate(['pages/lookup/roleForm', 0]);
  }
}
