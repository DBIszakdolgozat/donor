import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent {

  email:string='';
  password:string='';
  showError:boolean = false;
  constructor(private auth: AngularFireAuth, private router: Router) {
  }

  login() {


    this.auth.signInWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          this.auth.updateCurrentUser(userCredential.user);

          this.router.navigate([ '/admin' ]);

        })
        .catch((error) => {
          this.showError = true;
          // ..
        });
  }
}
