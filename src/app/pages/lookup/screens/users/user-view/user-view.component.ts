import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { UserResponse, UserResponseWrapper } from '../../../models/users/user-response';
import { LookupService } from '../../../service/lookup.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  users: UserResponse[] = [];
  pageName: string = 'userView';
  columns = [
    { key: 'displayId', title: this.translate.instant('Id') },
    { key: 'userName', title: this.translate.instant('Username') },
    { key: 'firstName', title: this.translate.instant('First Name') },
    { key: 'email', title: this.translate.instant('Email') },
    { key: 'phone', title: this.translate.instant('Phone') },
    { key: 'age', title: this.translate.instant('Age') },
    { key: 'dateOfBirth', title: this.translate.instant('Date of Birth') }, // Add this line for Date of Birth
    { key: 'academicYear', title: this.translate.instant('Academic Year') },
    { key: 'roleName', title: this.translate.instant('Role') },
    { key: 'password', title: this.translate.instant('Password') }
  ];

  actions = [
    { key: 'edit', title: this.translate.instant('Edit'), handler: (rowData: any) => this.editUser(rowData) },
    { key: 'delete', title: this.translate.instant('Delete'), handler: (rowData: any) => this.deleteUser(rowData) }
  ];

  constructor(
    private lookupService: LookupService,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.lookupService.getAllUsers().subscribe({
      next: (response: UserResponseWrapper) => {
        if (response.success) {
          const users = Array.isArray(response.result) ? response.result : [response.result];
          this.users = users.map((user, index) => ({
            ...user,
            displayId: index + 1,
            roleName: this.getRoleName(user.roleId),
            dateOfBirth: user.dateOfBirth // Include Date of Birth in the mapped user
          }));
          console.log('Users fetched successfully:', this.users);
        } else {
          console.error('Failed to fetch users:', response.error);
        }
      },
      error: (err) => {
        console.error('Failed to fetch users:', err.message);
        console.error('Full error details:', err);
      }
    });
  }

  getRoleName(roleId: number | undefined): string {
    // Implement logic to map roleId to roleName or fetch from a service
    return 'Role Name'; // Replace with actual role name logic
  }

  addUser(): void {
    this.router.navigate(['pages/lookup/userForm', 0]);
  }

  editUser(user: UserResponse): void {
    this.router.navigate(['pages/lookup/userForm', user.id]);
  }

  deleteUser(user: UserResponse): void {
    this.confirmDeleteUser(user.id);
  }

  confirmDeleteUser(userId: number): void {
    Swal.fire({
      title: this.translate.instant('Are you sure?'),
      text: this.translate.instant('You won\'t be able to revert this!'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.translate.instant('Yes, delete it!'),
      cancelButtonText: this.translate.instant('No, keep it')
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteUserById(userId);
      }
    });
  }

  deleteUserById(userId: number): void {
    this.lookupService.deleteUser(userId).subscribe({
      next: () => {
        Swal.fire(
          this.translate.instant('Deleted!'),
          this.translate.instant('The user has been deleted.'),
          'success'
        );
        this.getUsers(); // Refresh the user list
      },
      error: (err) => {
        console.error('Failed to delete user:', err.message);
        Swal.fire(
          this.translate.instant('Error'),
          this.translate.instant('An error occurred while deleting the user.'),
          'error'
        );
      }
    });
  }

  onAction(event: { action: string, rowData: any }): void {
    const action = this.actions.find(a => a.key === event.action);
    if (action) {
      action.handler(event.rowData);
    } else {
      console.log('Unknown action type:', event.action);
    }
  }
}
