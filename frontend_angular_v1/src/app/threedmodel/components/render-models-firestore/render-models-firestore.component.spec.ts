import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderModelsFirestoreComponent } from './render-models-firestore.component';

describe('RenderModelsFirestoreComponent', () => {
  let component: RenderModelsFirestoreComponent;
  let fixture: ComponentFixture<RenderModelsFirestoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderModelsFirestoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderModelsFirestoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
