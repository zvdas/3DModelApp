import { Component, OnInit } from '@angular/core';
import { ModelcrService } from 'src/app/services/modelcr.service';


@Component({
  selector: 'app-model-upload',
  templateUrl: './model-upload.component.html',
  styleUrls: ['./model-upload.component.css']
})

export class ModelUploadComponent implements OnInit {

  filename:string='';
  modelString:string='';
  file!: File;

  // Inject service 
  constructor(private mcrs: ModelcrService) { }

  ngOnInit(): void {
  }

  // receive model file and convert to base64 string to send to database 
  onFileChange(event:any){
    if(event.target.files.length > 0){
      this.file = event.target.files[0];
      let reader = new FileReader();
      reader.readAsBinaryString(this.file);
      reader.onload = () => {
        this.modelString = btoa(reader.result as string);
      }
    }
  }

  //send to modelcr.service.ts
  submit(){
    this.mcrs.uploadModelFile(this.modelString, this.filename);
  }

}