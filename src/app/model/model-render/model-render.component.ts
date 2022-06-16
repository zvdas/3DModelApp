import { Component, OnInit } from '@angular/core';
import { Model } from 'src/app/classes/model';
import { ModelcrService } from 'src/app/services/modelcr.service';

@Component({
  selector: 'app-model-render',
  templateUrl: './model-render.component.html',
  styleUrls: ['./model-render.component.css']
})

export class ModelRenderComponent implements OnInit {

  index!:number;
  modelfile = new Array<Model>();

  constructor(private mcrs: ModelcrService) { }

  ngOnInit(): void {
    this.index = this.mcrs.setIndex();
    
    this.mcrs.receiveModelFile().subscribe(
      (response) => {this.modelfile = response},
      (error) => console.log(error),
      () => console.log("completed")
    )
  }

}