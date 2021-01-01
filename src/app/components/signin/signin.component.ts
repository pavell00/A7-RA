import { Component, OnInit } from '@angular/core';
import { AuthProvider, Theme, AuthProcessService } from 'ngx-auth-firebaseui';
import { AngularFireAuth } from '@angular/fire/auth'

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  providers = AuthProvider;
  themes = Theme;
  constructor(public auth: AuthProcessService, public aa: AngularFireAuth) { }

  ngOnInit(): void {
    /* this.auth.afa.idTokenResult.subscribe(
      idTokenResult => {
        const claims = idTokenResult.claims
        if (!!claims) {console.log(claims)}
      }
    ) */
    //this.auth.user$.pipe().subscribe(val => console.log(val));
    /*this.auth.afa.idToken.toPromise().then(
      res => {console.log(res)}
    )*/
  }

  printUser(event) {
    console.log(event);
    //this.router.navigate(['locationname']);
  }

  printError(event) {
   console.error(event);
  }

}
