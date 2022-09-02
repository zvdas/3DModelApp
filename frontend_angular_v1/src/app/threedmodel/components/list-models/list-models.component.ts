import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Threedmodel } from '../../models/threedmodel';
import { ThreedmodelService } from '../../services/threedmodel/threedmodel.service';

@Component({
  selector: 'app-list-models',
  templateUrl: './list-models.component.html',
  styleUrls: ['./list-models.component.css']
})

export class ListModelsComponent implements OnInit {

  modelfile = new Array<Threedmodel>();

  constructor(private tdms: ThreedmodelService, private router: Router) { }

  ngOnInit(): void {
    this.getModelList();
  }

  getModelList(){
     this.tdms.receiveModelFile().subscribe(
      (response) => { this.modelfile = response; },
      (error) => console.log(error),
      () => console.log("completed")
    );
  }

  render(i: number){
    this.tdms.getIndex(i);
    this.router.navigate(['/render']);
  }

}