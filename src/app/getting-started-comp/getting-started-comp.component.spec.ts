import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GettingStartedCompComponent } from './getting-started-comp.component';

describe('GettingStartedCompComponent', () => {
  let component: GettingStartedCompComponent;
  let fixture: ComponentFixture<GettingStartedCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GettingStartedCompComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GettingStartedCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
