import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent {

  constructor(private auth: AngularFireAuth, private router: Router) {
  }

  login() {


    this.auth.signInWithEmailAndPassword('alpek.albert1990@gmail.com', 'Albi1234')
        .then((userCredential) => {
          this.auth.updateCurrentUser(userCredential.user);

          this.router.navigate([ '/admin' ]);

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
  }
}
