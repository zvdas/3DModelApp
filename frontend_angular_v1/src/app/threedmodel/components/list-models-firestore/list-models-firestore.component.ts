import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Threedmodel } from '../../models/threedmodel';
import { ThreedmodelFirestoreService } from '../../services/threedmodel-firestore/threedmodel-firestore.service';

@Component({
  selector: 'app-list-models-firestore',
  templateUrl: './list-models-firestore.component.html',
  styleUrls: ['./list-models-firestore.component.css']
})

export class ListModelsFirestoreComponent implements OnInit {

  modelfile = new Array<Threedmodel>();

  constructor(private fs: ThreedmodelFirestoreService, private router: Router) { }

  ngOnInit(): void {
    this.getModelList();
  }

  getModelList(){
    return this.fs.receiveModelFile().subscribe(
      (response) => {this.modelfile = response.map(res=>res.payload.doc.data()) as Threedmodel[]},
      (error) => console.log(error),
      () => console.log("completed")
    )
  }

  render(i: number){
    this.fs.getIndex(i);
    this.router.navigate(['/render']);
  }  

}