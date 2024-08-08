import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../Auth Service/auth-service.service';
import { Router } from '@angular/router';
import ValidateForm from '../helpers/ValidateForm';
import { RoleResponse } from '../models/role-response';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  signUpForm!: FormGroup;
  roles: any[] = [];

  constructor(private fb: FormBuilder, private auth: AuthServiceService, private router: Router) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      phone: ['', [
        Validators.required,
        Validators.pattern(/^(010|011|012)\d{8}$/)
      ]],
      age: ['', [Validators.required, Validators.min(1)]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', Validators.required],
      RoleId: ['', Validators.required],
      academicYear: ['', [
        Validators.required,
        Validators.pattern(/^\d{4}(-\d{4})?$/)
      ]],
      dateOfBirth: ['', Validators.required]
    });

    this.auth.getRoles().subscribe({
      next: (response: RoleResponse) => {
        if (response.success) {
          this.roles = response.result;
        } else {
          console.error('Failed to retrieve roles:', response.responseMessage);
        }
      },
      error: (err: any) => {
        console.error('Error fetching roles', err);
      }
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.eyeIcon = this.isText ? "fa-eye" : "fa-eye-slash";
    this.type = this.isText ? "text" : "password";
  }

  changeType(controlName: string, type: string) {
    const control = document.querySelector(`[formControlName="${controlName}"]`) as HTMLInputElement;
    control.type = type;
  }

  resetType(controlName: string, type: string) {
    const control = document.querySelector(`[formControlName="${controlName}"]`) as HTMLInputElement;
    if (!control.value) {
      control.type = type;
    }
  }

  onSignup() {
    if (this.signUpForm.valid) {
      // Additional validation for dateOfBirth and age
      const dob = new Date(this.signUpForm.value.dateOfBirth);
      const today = new Date();
      let calculatedAge = today.getFullYear() - dob.getFullYear();
      if (dob > new Date(today.setFullYear(today.getFullYear() - calculatedAge))) {
        calculatedAge--;
      }
  
      if (this.signUpForm.value.age !== calculatedAge) {
        Swal.fire({
          icon: 'error',
          title: 'Age Mismatch',
          text: 'Age does not match the date of birth.',
        });
        return;
      }
  
      // Update role validation based on RoleId
      const selectedRole = this.roles.find(role => role.id == this.signUpForm.value.RoleId);
      if (!selectedRole) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Role',
          text: 'Invalid role selected.',
        });
        return;
      }
  
      if (selectedRole.code === 'STUDENT' && (calculatedAge < 14 || calculatedAge > 25)) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Age for Student',
          text: 'Invalid age for student.',
        });
        return;
      }
  
      if (selectedRole.code === 'TEACHER' && (calculatedAge < 25 || calculatedAge > 60)) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Age for Teacher',
          text: 'Invalid age for teacher.',
        });
        return;
      }
  
      if (selectedRole.code === 'ADMIN' && (calculatedAge < 25 || calculatedAge > 60)) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Age for Admin',
          text: 'Invalid age for admin.',
        });
        return;
      }
  
      const formData = {
        data: this.signUpForm.value  // Wrap form data in "data" object
      };
  
      // Log the payload for debugging
      console.log('Payload:', formData);
      this.auth.signup(formData).subscribe({
        next: (res: any) => {
          console.log('Response:', res);
          Swal.fire({
            icon: 'success',
            title: 'Sign Up Successful',
            text: res.message || 'Sign Up Successful',
          }).then(() => {
            this.router.navigate(['/auth/login']); // Redirect to login page
          });
        },
        error: (err: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Sign Up Error',
            text: err.error.message || 'An error occurred during sign up',
          });
          console.log(JSON.stringify(formData));
        }
      });
    } else {
      ValidateForm.validateAllFormFileds(this.signUpForm);
      Swal.fire({
        icon: 'warning',
        title: 'Validation Warning',
        text: 'Please fill in all required fields correctly.',
      });
    }
  }
  
 
  
  
}
