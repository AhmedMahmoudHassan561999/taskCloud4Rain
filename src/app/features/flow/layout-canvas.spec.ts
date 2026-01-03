import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutCanvas } from './layout-canvas';

describe('LayoutCanvas', () => {
  let component: LayoutCanvas;
  let fixture: ComponentFixture<LayoutCanvas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutCanvas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutCanvas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
