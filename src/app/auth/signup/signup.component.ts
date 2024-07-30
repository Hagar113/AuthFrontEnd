import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../Auth Service/auth-service.service';
import { Router } from '@angular/router';
import ValidateForm from '../helpers/ValidateForm';
import { RoleResponse } from '../models/role-response';

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
      error: (err:any) => {
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
        alert("Age does not match the date of birth.");
        return;
      }

      // Update role validation based on RoleId
      const selectedRole = this.roles.find(role => role.id == this.signUpForm.value.RoleId);
      if (!selectedRole) {
        alert("Invalid role selected.");
     
        return;
      }
  
      if (selectedRole.code === 'STUDENT_CODE' && (calculatedAge < 14 || calculatedAge > 25)) {
        alert("Invalid age for student.");
        return;
      }
  
      if (selectedRole.code === 'TEACHER_CODE' && (calculatedAge < 25 || calculatedAge > 60)) {
        alert("Invalid age for teacher.");
        return;
      }
  
      const formData = {
        data: this.signUpForm.value  // Wrap form data in "data" object
      };
  
      //console.log('Payload:', formData);  // Log the payload for debugging
      console.log(this.signUpForm.value);
      this.auth.signup(formData).subscribe({
        next: (res:any) => {
          console.log('Response:', res);
          alert(res.message || 'Sign Up Successful');
          this.redirectBasedOnRole(this.signUpForm.value.RoleId);
        },
        error: (err:any) => {
          alert(err.error.message || 'An error occurred during sign up');
          console.log(JSON.stringify(formData));
        }
      });
    } else {
      ValidateForm.validateAllFormFileds(this.signUpForm);
      alert("Please fill in all required fields correctly.");
    }
  }
  
  private redirectBasedOnRole(roleId: string) {
    const role = this.roles.find(role => role.id === roleId);
    switch (role?.code) {
      case 'STUDENT_CODE':
        this.router.navigate(['/student']);
        break;
      case 'TEACHER_CODE':
        this.router.navigate(['/teacher']);
        break;
      default:
        this.router.navigate(['/login']);
        break;
    }
  }
}

