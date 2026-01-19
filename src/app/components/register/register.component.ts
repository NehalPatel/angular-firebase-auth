import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  authService = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);

  registerForm = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  errorMessage: string | null = null;
  isLoading = false;

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = null;
      const { email, username, password } = this.registerForm.value;
      
      this.authService.register(email!, username!, password!).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/profile']);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.message;
        }
      });
    }
  }
}
