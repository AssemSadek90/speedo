import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountCompComponent } from './amount-comp.component';

describe('AmountCompComponent', () => {
  let component: AmountCompComponent;
  let fixture: ComponentFixture<AmountCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmountCompComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmountCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
