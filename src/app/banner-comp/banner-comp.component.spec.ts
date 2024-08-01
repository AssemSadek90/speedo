import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerCompComponent } from './banner-comp.component';

describe('BannerCompComponent', () => {
  let component: BannerCompComponent;
  let fixture: ComponentFixture<BannerCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerCompComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
