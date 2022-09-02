import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderModelsComponent } from './render-models.component';

describe('RenderModelsComponent', () => {
  let component: RenderModelsComponent;
  let fixture: ComponentFixture<RenderModelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderModelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
