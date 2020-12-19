import { Component, OnInit } from '@angular/core';
import { AuthProvider, Theme, AuthProcessService } from 'ngx-auth-firebaseui';

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  providers = AuthProvider;
  themes = Theme;
  constructor(public auth: AuthProcessService) { }

  ngOnInit(): void {
    //this.auth.user$.pipe().subscribe(val => console.log(val));
  }

  printUser(event) {
    console.log(event);
    //this.router.navigate(['locationname']);
  }

  printError(event) {
   console.error(event);
  }

}
