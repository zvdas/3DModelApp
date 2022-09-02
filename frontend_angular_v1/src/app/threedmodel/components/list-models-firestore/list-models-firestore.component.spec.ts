import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListModelsFirestoreComponent } from './list-models-firestore.component';

describe('ListModelsFirestoreComponent', () => {
  let component: ListModelsFirestoreComponent;
  let fixture: ComponentFixture<ListModelsFirestoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListModelsFirestoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListModelsFirestoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
