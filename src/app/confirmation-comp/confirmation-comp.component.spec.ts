import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationCompComponent } from './confirmation-comp.component';

describe('ConfirmationCompComponent', () => {
  let component: ConfirmationCompComponent;
  let fixture: ComponentFixture<ConfirmationCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationCompComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
