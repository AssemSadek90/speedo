import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAppCompComponent } from './mobile-app-comp.component';

describe('MobileAppCompComponent', () => {
  let component: MobileAppCompComponent;
  let fixture: ComponentFixture<MobileAppCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileAppCompComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileAppCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
