import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonFormGroupComponent } from './comparison-form-group.component';

describe('ComparisonFormGroupComponent', () => {
  let component: ComparisonFormGroupComponent;
  let fixture: ComponentFixture<ComparisonFormGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparisonFormGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisonFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
