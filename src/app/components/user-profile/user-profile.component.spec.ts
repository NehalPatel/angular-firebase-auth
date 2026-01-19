import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfileComponent } from './user-profile.component';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';

class MockAuthService {
  user$ = of(null);
  logout = jasmine.createSpy('logout').and.returnValue(of(void 0));
  updateProfile = jasmine.createSpy('updateProfile').and.returnValue(of(void 0));
}

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        provideRouter([])
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
