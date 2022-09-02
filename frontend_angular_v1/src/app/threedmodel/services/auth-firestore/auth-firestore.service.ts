import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthFirestoreService {

  isLoggedIn:boolean = false;
  message:string = '';

  constructor(private fa: AngularFireAuth) { }

  async login(email:string, password:string){
    await this.fa
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        this.isLoggedIn = true;
        this.message = 'User login successful';
        localStorage.setItem('user', JSON.stringify(res.user));
      })
  }

  async signup(email:string, password:string){
    await this.fa
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.isLoggedIn = true;
        this.message = 'User sign up successful';
        localStorage.setItem('user', JSON.stringify(res.user));
      })
      .catch(err => this.message = err)
  }

  async logout(){
    await this.fa
      .signOut()
      .then(() => {
        this.isLoggedIn = false;
        localStorage.removeItem('user');
      })
      .catch((err) => console.log(`Logout error: ${err}`));
  }
  
}
