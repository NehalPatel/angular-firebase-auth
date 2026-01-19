import { Injectable, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  user,
  User,
  updateProfile
} from '@angular/fire/auth';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);

  // Observable that emits the current user or null
  user$: Observable<User | null> = user(this.auth);

  constructor() { }

  /**
   * Register a new user with email and password
   * @param email User's email
   * @param username User's display name
   * @param password User's password
   * @returns Observable that completes when registration is successful
   */
  register(email: string, username: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.auth, email, password)
      .then(userCredential => {
        // Update the user's display name immediately after registration
        return updateProfile(userCredential.user, { displayName: username });
      });
    return from(promise);
  }

  /**
   * Login with email and password
   * @param email User's email
   * @param password User's password
   * @returns Observable that completes when login is successful
   */
  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(this.auth, email, password)
      .then(() => { });
    return from(promise);
  }

  /**
   * Logout the current user
   * @returns Observable that completes when logout is successful
   */
  logout(): Observable<void> {
    const promise = signOut(this.auth);
    return from(promise);
  }

  /**
   * Send a password reset email
   * @param email The email address to send the reset link to
   * @returns Observable that completes when the email is sent
   */
  resetPassword(email: string): Observable<void> {
    const promise = sendPasswordResetEmail(this.auth, email);
    return from(promise);
  }

  /**
   * Update the user's profile
   * @param displayName New display name
   * @param photoURL New photo URL (optional)
   * @returns Observable that completes when update is successful
   */
  updateProfile(displayName: string, photoURL?: string): Observable<void> {
    if (!this.auth.currentUser) {
      return from(Promise.reject(new Error('No user logged in')));
    }
    const promise = updateProfile(this.auth.currentUser, { displayName, photoURL });
    return from(promise);
  }
}
