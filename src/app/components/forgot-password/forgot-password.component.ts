import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  authService = inject(AuthService);
  fb = inject(FormBuilder);

  resetForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  message: string | null = null;
  errorMessage: string | null = null;
  isLoading = false;

  onSubmit(): void {
    if (this.resetForm.valid) {
      this.isLoading = true;
      this.message = null;
      this.errorMessage = null;
      const { email } = this.resetForm.value;
      
      this.authService.resetPassword(email!).subscribe({
        next: () => {
          this.isLoading = false;
          this.message = 'Password reset email sent. Please check your inbox.';
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.message;
        }
      });
    }
  }
}
