import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideFirebaseApp(() => initializeApp({
          projectId: "test",
          appId: "test",
          storageBucket: "test",
          apiKey: "test",
          authDomain: "test",
          messagingSenderId: "test"
        })),
        provideAuth(() => getAuth())
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
