import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferCardCompComponent } from './transfer-card-comp.component';

describe('TransferCardCompComponent', () => {
  let component: TransferCardCompComponent;
  let fixture: ComponentFixture<TransferCardCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferCardCompComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferCardCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
