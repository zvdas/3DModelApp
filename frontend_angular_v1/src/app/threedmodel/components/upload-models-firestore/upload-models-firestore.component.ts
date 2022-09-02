import { Component, OnInit } from '@angular/core';
import { ThreedmodelFirestoreService } from '../../services/threedmodel-firestore/threedmodel-firestore.service';

@Component({
  selector: 'app-upload-models-firestore',
  templateUrl: './upload-models-firestore.component.html',
  styleUrls: ['./upload-models-firestore.component.css']
})

export class UploadModelsFirestoreComponent implements OnInit {

  filename:string='';
  modelString:string='';
  file!: File;
  msg:string='';

  constructor(private fs: ThreedmodelFirestoreService) { }

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
    this.fs.uploadModelFile(this.modelString, this.filename);
    this.msg='File uploaded successfully';
  }

}