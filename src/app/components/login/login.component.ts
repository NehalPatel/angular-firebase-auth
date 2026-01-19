import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  errorMessage: string | null = null;
  isLoading = false;

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = null;
      const { email, password } = this.loginForm.value;
      
      this.authService.login(email!, password!).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/profile']);
        },
        error: (err) => {
          this.isLoading = false;
          // Simple error handling for demonstration
          this.errorMessage = err.message;
        }
      });
    }
  }
}
