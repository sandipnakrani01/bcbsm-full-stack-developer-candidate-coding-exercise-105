import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailListingComponent } from './email-listing.component';

describe('EmailListingComponent', () => {
  let component: EmailListingComponent;
  let fixture: ComponentFixture<EmailListingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailListingComponent]
    });
    fixture = TestBed.createComponent(EmailListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
