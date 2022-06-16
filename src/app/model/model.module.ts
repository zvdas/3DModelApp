import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelListComponent } from './model-list/model-list.component';
import { ModelUploadComponent } from './model-upload/model-upload.component';
import { FormsModule } from '@angular/forms';
import { ModelRenderComponent } from './model-render/model-render.component';



@NgModule({
  declarations: [
    ModelListComponent,
    ModelUploadComponent,
    ModelRenderComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ], 
  exports: [
    ModelListComponent,
    ModelUploadComponent
  ]
})
export class ModelModule { }
