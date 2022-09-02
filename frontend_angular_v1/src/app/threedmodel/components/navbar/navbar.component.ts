import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFirestoreService } from '../../services/auth-firestore/auth-firestore.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  constructor(private fas: AuthFirestoreService, private router: Router) { }

  ngOnInit(): void {
  }

  goToHome(){
    this.router.navigate(['/home']);
  }

  goToModelsList(){
    this.router.navigate(['/list']);
  }

  goToModelsUpload(){
    this.router.navigate(['/upload']);
  }

  onLogout(){
    this.fas.logout();
    this.router.navigate(['/home']);
  }

}