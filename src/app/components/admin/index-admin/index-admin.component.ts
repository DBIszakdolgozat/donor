import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-admin',
  templateUrl: './index-admin.component.html',
  styleUrl: './index-admin.component.css'
})
export class IndexAdminComponent {
  constructor(private auth: AngularFireAuth,private router: Router) {

  }
logout(){
    this.auth.signOut();
    this.router.navigate(['/']);
}
}
