import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavLoginCompComponent } from './nav-login-comp.component';

describe('NavLoginCompComponent', () => {
  let component: NavLoginCompComponent;
  let fixture: ComponentFixture<NavLoginCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavLoginCompComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavLoginCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
