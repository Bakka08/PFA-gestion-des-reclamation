import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterloginUserComponent } from './afterlogin-user.component';

describe('AfterloginUserComponent', () => {
  let component: AfterloginUserComponent;
  let fixture: ComponentFixture<AfterloginUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AfterloginUserComponent]
    });
    fixture = TestBed.createComponent(AfterloginUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
