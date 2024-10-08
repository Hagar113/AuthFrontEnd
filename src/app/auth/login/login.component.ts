import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; 
import { AuthServiceService } from '../Auth Service/auth-service.service';
import { LoginResponse } from '../models/login-response';
import ValidateForm from '../helpers/ValidateForm';
import { PagesResponse } from 'src/app/pages/lookup/models/pages/page-response';
import { PageRleResponse } from '../models/page-rle-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthServiceService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      loginId: ['', [Validators.required, this.emailOrPhoneValidator]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)]],
      rememberMe: [false],
    });
    this.loadRememberedUser();
  }

  loadRememberedUser() {
    const rememberMe = localStorage.getItem('rememberMe') || 'false';
    if (rememberMe === 'true') {
      const formDataStr = localStorage.getItem('formData');
      if (formDataStr) {
        const request = JSON.parse(formDataStr);
        this.loginForm.patchValue({
          loginId: request.data.email_phone,
          password: request.data.password,
          rememberMe: true,
        });
      }
    }
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.eyeIcon = this.isText ? 'fa-eye' : 'fa-eye-slash';
    this.type = this.isText ? 'text' : 'password';
  }

  emailOrPhoneValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^(010|011|012)\d{8}$/;
    if (control.value) {
      if (emailPattern.test(control.value) || phonePattern.test(control.value)) {
        return null;
      }
      return { emailOrPhone: true };
    }
    return null;
  }

  onLogin() {
    if (this.loginForm.valid) {
        const formData = {
            data: {
                email_phone: this.loginForm.value.loginId,
                password: this.loginForm.value.password,
            },
        };

        console.log('Request Payload:', formData);

        this.auth.login(formData).subscribe({
            next: (res: LoginResponse) => {
                console.log('Response:', res);

                if (res.result && res.result.token) {
                    localStorage.setItem('token', res.result.token);
                }

                if (res.result && res.result.userDto && res.result.userDto.role) {
                    const roleCode = res.result.userDto.role.code; 

                    localStorage.setItem('roleCode', roleCode); 

                    this.fetchPagesAndStore(res.result.userDto.id, res.result.userDto.role.id); 
                }

                Swal.fire({
                    icon: 'success',
                    title: res.responseMessage || 'Login successful',
                    confirmButtonText: 'OK'
                });

                if (this.loginForm.value.rememberMe) {
                    localStorage.setItem('formData', JSON.stringify(formData));
                    localStorage.setItem('rememberMe', 'true');
                } else {
                    localStorage.setItem('rememberMe', 'false');
                }

                this.router.navigate(['pages/lookup/home']);
            },
            error: (err: any) => {
                console.error('Error:', err);
                Swal.fire({
                    icon: 'error',
                    title: err.error.message || 'An error occurred during login',
                    confirmButtonText: 'OK'
                });
            },
        });
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Please fill in all required fields correctly.',
            confirmButtonText: 'OK'
        });
        ValidateForm.validateAllFormFileds(this.loginForm);
    }
}

  
fetchPagesAndStore(userId: number, roleId: number) {
  const request = {
    userId: userId,
    roleId: roleId
  };

  this.auth.validateUserRole(request).subscribe({
    next: (res: PageRleResponse) => {
      if (res.success && res.result && Array.isArray(res.result.pages)) { 
        const pagesWithPaths = res.result.pages.map(page => ({
          pageId: page.pageId,
          pageName: page.pageName,
          pagePath: page.pagePath || ''
        }));

        localStorage.setItem('userPages', JSON.stringify(pagesWithPaths));
      } else {
        console.error('Pages data is missing or invalid', res);
      }
    },
    error: (err: any) => {
      console.error('Error:', err);
    }
  });
}

}
