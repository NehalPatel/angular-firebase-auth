import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { provideRouter } from '@angular/router';
import { AuthService } from './services/auth.service';
import { BehaviorSubject, of } from 'rxjs';
import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { User } from '@angular/fire/auth';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

class MockAuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  login(email: string, password: string) {
    // Simulate successful login by updating user state
    this.userSubject.next({
      uid: '123',
      email: email,
      displayName: 'Test User',
      photoURL: null,
      emailVerified: true,
      isAnonymous: false,
      metadata: {},
      providerData: [],
      refreshToken: '',
      tenantId: null,
      delete: () => Promise.resolve(),
      getIdToken: () => Promise.resolve(''),
      getIdTokenResult: () => Promise.resolve({} as any),
      reload: () => Promise.resolve(),
      toJSON: () => ({}),
      phoneNumber: null,
      providerId: 'firebase'
    } as unknown as User);
    return of(void 0);
  }

  logout() {
    this.userSubject.next(null);
    return of(void 0);
  }

  register() { return of(void 0); }
  resetPassword() { return of(void 0); }
  updateProfile() { return of(void 0); }
}

describe('Authentication Flow Integration', () => {
  let harness: RouterTestingHarness;
  let authService: MockAuthService;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideRouter(routes),
        provideNoopAnimations(),
        { provide: AuthService, useClass: MockAuthService }
      ]
    }).compileComponents();

    harness = await RouterTestingHarness.create();
    authService = TestBed.inject(AuthService) as unknown as MockAuthService;
    location = TestBed.inject(Location);
  });

  it('should navigate from login to profile upon successful login', fakeAsync(async () => {
    // 1. Start at root, should redirect to login
    await harness.navigateByUrl('/');
    tick();
    expect(location.path()).toBe('/login');

    // 2. Fill out the login form
    const loginComponent = await harness.navigateByUrl('/login', LoginComponent); // Actually it loads LoginComponent inside router-outlet
    // harness.routeNativeElement gives the root of the component for the route

    // Since we are using standalone components and loadComponent, interacting via DOM is best
    const emailInput = harness.routeNativeElement!.querySelector('input[type="email"]') as HTMLInputElement;
    const passwordInput = harness.routeNativeElement!.querySelector('input[type="password"]') as HTMLInputElement;
    const submitBtn = harness.routeNativeElement!.querySelector('button[type="submit"]') as HTMLButtonElement;

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();

    emailInput.value = 'test@example.com';
    emailInput.dispatchEvent(new Event('input'));

    passwordInput.value = 'password123';
    passwordInput.dispatchEvent(new Event('input'));

    harness.detectChanges();

    // 3. Submit the form
    submitBtn.click();
    tick(); // Wait for async login observable

    // 4. Should now be at /profile
    // Note: The AuthGuard needs the user$ to be emitting a user. 
    // Our MockAuthService.login updates the subject immediately.

    expect(location.path()).toBe('/profile');
  }));
});
