import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LookupService } from '../../../service/lookup.service';
import { SaveUserRequest } from '../../../models/users/save-user-request';
import { UserResponseWrapper } from '../../../models/users/user-response';
import Swal from 'sweetalert2';
import { RoleResponse } from 'src/app/auth/models/role-response';
import { RolesResponse } from '../../../models/roles/get-all-roles-res';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  id: number | null = null;
  roles: { id: number, name: string }[] = [];

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
      role: [null, [Validators.required]] // Add the role form control
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

    this.loadRoles(); // Load roles when the component initializes
  }

  loadUser(id: number): void {
    this.lookupService.getUserById(id).subscribe({
      next: (response: UserResponseWrapper) => {
        if (response.success && response.result.length > 0) {
          const user = response.result[0];
          this.userForm.patchValue(user);
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
    this.lookupService.getRoles().subscribe({
      next: (response: RolesResponse) => {
        if (response.success) {
          // Convert the roles to match the expected type
          this.roles = response.result.map(role => ({
            id: +role.id, // Convert id from string to number
            name: role.name
          }));
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
  
  save(): void {
    // Check for errors in each form control
    Object.keys(this.userForm.controls).forEach(key => {
        const controlErrors: ValidationErrors | null = this.userForm.get(key)?.errors || null;
        if (controlErrors != null) {
            console.log('Key control: ' + key + ', Errors: ' + JSON.stringify(controlErrors));
        }
    });

    if (this.userForm.valid) {
        // Preparing the SaveUserRequest object
        const saveUserRequest: SaveUserRequest = {
            id: this.userForm.value.id,
            userName: this.userForm.value.userName,
            firstName: this.userForm.value.firstName,
            email: this.userForm.value.email,
            phone: this.userForm.value.phone,
            age: this.userForm.value.age,
            password: this.userForm.value.password,
            academicYear: this.userForm.value.academicYear,
            dateOfBirth: this.userForm.value.dateOfBirth,
            roleId: this.userForm.value.role 
        };

        // Log the data that will be sent
        console.log('Saving user with data:', saveUserRequest);

        // Call the service to save the user
        this.lookupService.saveUser(saveUserRequest).subscribe({
            next: () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: this.userForm.value.id
                        ? 'User updated successfully'
                        : 'User created successfully'
                });

                this.userForm.reset();
                this.router.navigate(['pages/lookup/userForm', 0]);
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
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Please correct the errors in the form.'
        });
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

  get role() {
    return this.userForm.get('role');
  }
}
