import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFirestoreService } from '../../services/auth-firestore/auth-firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  newUser:boolean = false;
  email:string = '';
  password:string = '';
  message:string = '';

  constructor(private fas: AuthFirestoreService, private router: Router) { }

  ngOnInit(): void {
    localStorage.getItem('user') !== null ? this.fas.isLoggedIn = true : this.fas.isLoggedIn = false;
  }

  signUpOrLogin(){
    this.newUser =! this.newUser;
  }

  onSignup(){
    this.fas.signup(this.email, this.password);
    this.message = this.fas.message;
  }

  onLogin(){
    this.fas.login(this.email, this.password);
    this.message = this.fas.message;
    this.fas.isLoggedIn == true ? this.router.navigate(['/list']) : this.message = 'Login failed. Please try again or sign up.';
  }

}