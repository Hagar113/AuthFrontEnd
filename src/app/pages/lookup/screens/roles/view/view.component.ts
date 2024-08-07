import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LookupService } from '../../../service/lookup.service';
import { Role, RoleResponse } from '../../../models/roles/role-response';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  roles: Role[] = [];
  pageName: string = 'roleView';

  columns = [
    { key: 'displayId', title: '' },
    { key: 'name', title: '' },
    { key: 'roleCode', title: '' },
   
  ];


  constructor(
    private lookupService: LookupService,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.getRoles();
    this.setTranslations();
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

  setTranslations(): void {
    this.translate.get(['Id', 'Name', 'Role Code', 'Edit', 'Delete', 'Add', 'Actions']).subscribe(translations => {
      this.columns[0].title = translations['Id'];
      this.columns[1].title = translations['Name'];
      this.columns[2].title = translations['Role Code'];
    

      
    });
  }

  confirmDeleteRole(roleId: number): void {
    Swal.fire({
      title: this.translate.instant('Are you sure?'),
      text: this.translate.instant('You won\'t be able to revert this!'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('Yes, delete it!'),
      cancelButtonText: this.translate.instant('No, cancel!'),
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteRole(roleId);
      }
    });
  }

  deleteRole(roleId: number): void {
    this.lookupService.deleteRole(roleId).subscribe({
      next: () => {
        Swal.fire(this.translate.instant('Deleted!'), this.translate.instant('Role has been deleted.'), 'success');
        this.getRoles(); // Refresh the list after deletion
      },
      error: (err) => {
        Swal.fire(this.translate.instant('Failed!'), this.translate.instant('Failed to delete role.'), 'error');
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

  onAction(event: { action: string, rowData: any }): void {
    switch(event.action) {
      case 'edit':
        this.editRole(event.rowData.id);
        break;
      case 'delete':
        this.confirmDeleteRole(event.rowData.id);
        break;
      default:
        console.error('Unknown action:', event.action);
    }
  }
}
