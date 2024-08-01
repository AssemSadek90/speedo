import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferCompComponent } from './transfer-comp.component';

describe('TransferCompComponent', () => {
  let component: TransferCompComponent;
  let fixture: ComponentFixture<TransferCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferCompComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
