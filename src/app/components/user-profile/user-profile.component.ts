import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);
  
  user: User | null = null;
  
  profileForm = this.fb.group({
    displayName: ['', [Validators.required]],
    photoURL: ['']
  });

  message: string | null = null;
  errorMessage: string | null = null;
  isLoading = false;

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
      if (user) {
        this.profileForm.patchValue({
          displayName: user.displayName,
          photoURL: user.photoURL
        });
      }
    });
  }

  updateProfile(): void {
    if (this.profileForm.valid) {
      this.isLoading = true;
      this.message = null;
      this.errorMessage = null;
      const { displayName, photoURL } = this.profileForm.value;
      
      this.authService.updateProfile(displayName!, photoURL || undefined).subscribe({
        next: () => {
          this.isLoading = false;
          this.message = 'Profile updated successfully.';
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.message;
        }
      });
    }
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
