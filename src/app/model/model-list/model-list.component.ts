import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Model } from 'src/app/classes/model';
import { ModelcrService } from 'src/app/services/modelcr.service';

@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.css']
})

export class ModelListComponent implements OnInit {

  modelfile = new Array<Model>();

  constructor(private mcrs: ModelcrService, private router: Router) { }

  ngOnInit(): void {
    this.getModelList();
  }

  getModelList(){
    /*
    // From JSON API
     this.mcrs.receiveModelFile().subscribe(
      (response) => { this.modelfile = response; },
      (error) => console.log(error),
      () => console.log("completed")
    );
    */
   
    //From firestore 
    return this.mcrs.receiveModelFile().subscribe(
      (response) => {this.modelfile = response.map(res=>res.payload.doc.data()) as Model[]},
      (error) => console.log(error),
      () => console.log("completed")
    )
  }

  render(i: number){
    this.mcrs.getIndex(i);
    this.router.navigate(['/render']);
  }

}