import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './threedmodel/components/home/home.component';
import { ListModelsComponent } from './threedmodel/components/list-models/list-models.component';
import { RenderModelsComponent } from './threedmodel/components/render-models/render-models.component';
import { UploadModelsComponent } from './threedmodel/components/upload-models/upload-models.component';
import { ListModelsFirestoreComponent } from './threedmodel/components/list-models-firestore/list-models-firestore.component';
import { RenderModelsFirestoreComponent } from './threedmodel/components/render-models-firestore/render-models-firestore.component';
import { UploadModelsFirestoreComponent } from './threedmodel/components/upload-models-firestore/upload-models-firestore.component';
import { ErrorComponent } from './threedmodel/components/error/error.component';

const routes: Routes = [
  {path:'home', component: HomeComponent},
  /*
  {path:'list', component: ListModelsComponent},
  {path:'upload', component: UploadModelsComponent},
  {path:'render', component: RenderModelsComponent},
  */
  {path:'list', component: ListModelsFirestoreComponent},
  {path:'upload', component: UploadModelsFirestoreComponent},
  {path:'render', component: RenderModelsFirestoreComponent},
  {path:'', redirectTo:'/home', pathMatch:'full'},
  {path:'**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})

export class AppRoutingModule { }