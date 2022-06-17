import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Model } from '../classes/model';

@Injectable({
  providedIn: 'root'
})

export class ModelcrService {

  /*
  // API URL (JSON Server)
  baseApiUrl = "http://localhost:3000/model";
  */

  /*
  // API URL (for MongoDB local)
  baseApiUrl = "http://localhost:4000/models";
  */

  //index for render
  index!:number;

  constructor(private http: HttpClient, private fs: AngularFirestore) { }

  // send to database
  uploadModelFile(modelString: string, filename: string){
    /*
    // API Server
    this.http.post(this.baseApiUrl, {"modelstring": modelString, "filename": filename}).subscribe(
      (response) => console.log(response),
      (error) => console.log(error),
      () => console.log("completed")
    )
    */

    // /*
    // Firestore
    this.fs.collection('model').add({"modelstring": modelString, "filename": filename})
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
      .finally(() => console.log("completed"))
    // */
  }

  //retrieve from database
  receiveModelFile(){
    /*
    // API Server
    return this.http.get<Model[]>(this.baseApiUrl);
    */
    
    // /*
    //Firestore
    return this.fs.collection('model').snapshotChanges();
    // */
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