import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterloginAdminComponent } from './afterlogin-admin.component';

describe('AfterloginAdminComponent', () => {
  let component: AfterloginAdminComponent;
  let fixture: ComponentFixture<AfterloginAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AfterloginAdminComponent]
    });
    fixture = TestBed.createComponent(AfterloginAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
