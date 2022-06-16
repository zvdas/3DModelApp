import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModelRenderComponent } from './model/model-render/model-render.component';

const routes: Routes = [
  {path:'render', component:ModelRenderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }