import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadModelsFirestoreComponent } from './upload-models-firestore.component';

describe('UploadModelsFirestoreComponent', () => {
  let component: UploadModelsFirestoreComponent;
  let fixture: ComponentFixture<UploadModelsFirestoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadModelsFirestoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadModelsFirestoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
