import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthServiceService } from '../Auth Service/auth-service.service';
import ValidateForm from '../helpers/ValidateForm';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthServiceService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      loginId: ['', [Validators.required, this.emailOrPhoneValidator]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),  
        Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)] 
      ]
    });
  }
  hideShowPass() {
    this.isText = !this.isText;
    this.eyeIcon = this.isText ? "fa-eye" : "fa-eye-slash";
    this.type = this.isText ? "text" : "password";
  }

  emailOrPhoneValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const  emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^(010|011|012)\d{8}$/;

    if (control.value) {
      if (emailPattern.test(control.value) || phonePattern.test(control.value)) {
        return null;
      }
      return { 'emailOrPhone': true };
    }
    return null;
  }

  onLogin() {
    if (this.loginForm.valid) {
      const formData = {
        data: {
          email_phone: this.loginForm.value.loginId,
          password: this.loginForm.value.password
        }
      };
  
      console.log('Request Payload:', formData); // Log the payload for debugging
  
      this.auth.login(formData).subscribe({
        next: (res:any) => {
          console.log('Response:', res); // Log the response for debugging
          alert(res.message || 'Login successful');
        },
        error: (err:any) => {
          console.error('Error:', err); // Log the error for debugging
          alert(err.error.message || 'An error occurred during login');
        }
      });
    } else {
      alert("Please fill in all required fields correctly.");
      ValidateForm.validateAllFormFileds(this.loginForm);
    }
  }



}
