import { Component, OnInit } from '@angular/core';
import { ThreedmodelService } from '../../services/threedmodel/threedmodel.service';

@Component({
  selector: 'app-upload-models',
  templateUrl: './upload-models.component.html',
  styleUrls: ['./upload-models.component.css']
})

export class UploadModelsComponent implements OnInit {

  filename:string='';
  modelString:string='';
  file!: File;
  msg:string='';
  constructor(private tdms: ThreedmodelService) { }

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

  //send to model service
  submit(){
    this.tdms.uploadModelFile(this.modelString, this.filename);
    this.msg='File uploaded successfully';
  }

}