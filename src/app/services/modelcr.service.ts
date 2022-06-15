import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Model } from '../classes/model';

@Injectable({
  providedIn: 'root'
})

export class ModelcrService {

   // API url
   baseApiUrl = "http://localhost:3000/model";

  constructor(private http: HttpClient) { }

  // send to database
  uploadModelFile(modelString: string, filename: string){  
    this.http.post(this.baseApiUrl, {"modelstring": modelString, "filename": filename}).subscribe(
    // this.http.post<Model>(this.baseApiUrl, [modelString, filename]).subscribe(  
      (response) => console.log(response),
      (error) => console.log(error),
      () => console.log("completed")
    )
  }

  //retrieve from database
  receiveModelFile(){
    return this.http.get<Model[]>(this.baseApiUrl);
  }

}