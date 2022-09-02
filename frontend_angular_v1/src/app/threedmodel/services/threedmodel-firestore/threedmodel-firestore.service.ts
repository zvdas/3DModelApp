import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})

export class ThreedmodelFirestoreService {

  //index for render
  index!:number;

  constructor(private fs: AngularFirestore) { }

  // send to database
  uploadModelFile(modelString: string, filename: string){
    this.fs.collection('model').add({"modelstring": modelString, "filename": filename})
    .then((response) => console.log(response))
    .catch((error) => console.log(error))
    .finally(() => console.log("completed"))
  }

  //retrieve from database
  receiveModelFile(){
    return this.fs.collection('model').snapshotChanges();
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