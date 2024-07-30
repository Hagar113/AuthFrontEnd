import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LookupService } from '../../../service/lookup.service';
import { Role, RoleResponse } from '../../../models/roles/role-response';
import { RoleRequest } from '../../../models/roles/role-request';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  roles: Role[] = [];

  constructor(private lookupService: LookupService, private router: Router) { }

  ngOnInit(): void {
    this.getRoles();
    
  }
  getRoles(): void {
    this.lookupService.getAllRoles().subscribe({
      next: (response: RoleResponse) => {
        if (response.success) {
          this.roles = response.result;
        } else {
          console.error('Failed to fetch roles', response.responseMessage);
        }
      },
      error: (err) => {
        console.error('Failed to fetch roles', err.message);
        console.error('Full error details:', err);
      }
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
      }
    });
  }

  editRole(roleId: number): void {
    this.router.navigate(['pages/lookup/roleForm', roleId]);
  }
  
  addRole(): void {
    this.router.navigate(['pages/lookup/roleForm', 0]);
  }
}
