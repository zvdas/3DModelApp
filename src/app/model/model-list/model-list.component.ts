import { Component, OnInit } from '@angular/core';
import { Model } from 'src/app/classes/model';
import { ModelcrService } from 'src/app/services/modelcr.service';

@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.css']
})

export class ModelListComponent implements OnInit {

  modelfile = new Array<Model>();

  constructor(private mcrs: ModelcrService) { }

  ngOnInit(): void {
    this.mcrs.receiveModelFile().subscribe(
      (response) => {this.modelfile = response},
      (error) => console.log(error),
      () => console.log("completed")
    ) 
  }

}