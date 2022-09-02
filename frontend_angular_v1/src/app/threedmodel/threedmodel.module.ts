import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ErrorComponent } from './components/error/error.component';
import { ListModelsComponent } from './components/list-models/list-models.component';
import { RenderModelsComponent } from './components/render-models/render-models.component';
import { UploadModelsComponent } from './components/upload-models/upload-models.component';
import { ListModelsFirestoreComponent } from './components/list-models-firestore/list-models-firestore.component';
import { RenderModelsFirestoreComponent } from './components/render-models-firestore/render-models-firestore.component';
import { UploadModelsFirestoreComponent } from './components/upload-models-firestore/upload-models-firestore.component';

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    ErrorComponent,
    ListModelsComponent,
    RenderModelsComponent,
    UploadModelsComponent,
    ListModelsFirestoreComponent,
    RenderModelsFirestoreComponent,
    UploadModelsFirestoreComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    NavbarComponent
  ]
})

export class ThreedmodelModule { }