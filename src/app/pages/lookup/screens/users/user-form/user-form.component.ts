import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LookupService } from '../../../service/lookup.service';
import { SaveUserRequest } from '../../../models/users/save-user-request';
import { UserResponseWrapper } from '../../../models/users/user-response';
import { GetAssignedRoles } from '../../../models/users/get-assigned-roles';
import Swal from 'sweetalert2';
import { Role, RolesResponse } from '../../../models/roles/get-all-roles-res';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  id: number | null = null;
  roles: Role[] = [];
  selectedRole: string = '';

  constructor(
    private fb: FormBuilder,
    private lookupService: LookupService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      id: [null],
      userName: ['', [Validators.required, Validators.minLength(3)]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^(010|011|012)\d{8}$/)]],
      age: ['', [Validators.required, Validators.min(0)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      academicYear: ['', [Validators.required, Validators.pattern(/^\d{4}(-\d{4})?$/)]],
      dateOfBirth: ['', [Validators.required]],
      roleId: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id')!;
      if (this.id && this.id !== 0) {
        this.loadUser(this.id);
      }
    });

    this.router.events.subscribe(() => {
      const url = this.router.url;
      const urlId = Number(url.substring(url.lastIndexOf('/') + 1));
      if (urlId && urlId !== 0 && urlId !== this.id) {
        this.id = urlId;
        this.loadUser(this.id);
      }
    });

    this.loadRoles();
  }

  loadUser(id: number): void {
    this.lookupService.getUserById(id).subscribe({
      next: (response: UserResponseWrapper) => {
        if (response.success && response.result) {
          const user = response.result;
          
      
          console.log('User data:', user);
          
          this.userForm.patchValue({
            id: user.id,
            userName: user.userName,
            firstName: user.firstName,
            email: user.email,
            phone: user.phone,
            age: user.age,
            password: user.password,
            academicYear: user.academicYear,
            dateOfBirth: user.dateOfBirth,
            roleId: user.roleId
          });
  
       
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'User not found'
          });
        }
      },
      error: (err: any) => {
        console.error('Failed to load user', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load user'
        });
      }
    });
  }
  

 loadRoles(): void {
    this.lookupService.getAllRoles().subscribe({
      next: (response: RolesResponse) => {
        if (response.success) {
          this.roles = response.result;
        } else {
          console.error('Failed to retrieve roles:', response.responseMessage);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to retrieve roles'
          });
        }
      },
      error: (err: any) => {
        console.error('Error fetching roles', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error fetching roles'
        });
      }
    });
  }


  saveUser(): void {
    if (this.userForm.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Form',
        text: 'Please fill out the form correctly.'
      });
      return;
    }

    const userRequest: SaveUserRequest = this.userForm.value;

    this.lookupService.saveUser(userRequest).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Saved',
          text: 'User has been saved successfully'
        }).then(() => {
          this.router.navigate(['pages/lookup/userForm', 0]);
        });
      },
      error: (err: any) => {
        console.error('Failed to save user', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to save user'
        });
      }
    });
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
        this.router.navigate(['pages/lookup/userForm', 0]);
      }
    });
  }

  get userName() {
    return this.userForm.get('userName');
  }

  get firstName() {
    return this.userForm.get('firstName');
  }

  get email() {
    return this.userForm.get('email');
  }

  get phone() {
    return this.userForm.get('phone');
  }

  get age() {
    return this.userForm.get('age');
  }

  get password() {
    return this.userForm.get('password');
  }

  get academicYear() {
    return this.userForm.get('academicYear');
  }

  get dateOfBirth() {
    return this.userForm.get('dateOfBirth');
  }

  get roleId() {
    return this.userForm.get('roleId');
  }
}
