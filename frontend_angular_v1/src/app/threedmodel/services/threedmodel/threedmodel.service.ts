import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Threedmodel } from '../../models/threedmodel';

@Injectable({
  providedIn: 'root'
})

export class ThreedmodelService {

  // API URL (JSON Server)
  baseApiUrl = "http://localhost:3000/model";

  /*
  // API URL (for MongoDB local)
  baseApiUrl = "http://localhost:4000/models";
  */

  //index for render
  index!:number;

  constructor(private http: HttpClient) { }

  // send to database
  uploadModelFile(modelString: string, filename: string){
   
    this.http.post(this.baseApiUrl, {"modelstring": modelString, "filename": filename}).subscribe(
      (response) => console.log(response),
      (error) => console.log(error),
      () => console.log("completed")
    )
  
  }

  //retrieve from database
  receiveModelFile(){
    return this.http.get<Threedmodel[]>(this.baseApiUrl);
  }

  //get index from model-list
  getIndex(i: number){
    this.index = i;
  }

  // send index to model-render
  setIndex(){
    return this.index;
  }
  
}