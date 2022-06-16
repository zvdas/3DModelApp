import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModelRenderComponent } from './model/model-render/model-render.component';
import { ModelUploadComponent } from './model/model-upload/model-upload.component';

const routes: Routes = [
  {path:'', component:ModelUploadComponent},
  {path:'render', component:ModelRenderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})

export class AppRoutingModule { }