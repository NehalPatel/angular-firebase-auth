import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';

class MockAuthService {
  register = jasmine.createSpy('register').and.returnValue(of(void 0));
}

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        provideRouter([])
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
