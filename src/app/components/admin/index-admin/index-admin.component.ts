import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-admin',
  templateUrl: './index-admin.component.html',
  styleUrl: './index-admin.component.css'
})
export class IndexAdminComponent {
  userName:string|null|undefined;
  constructor(private auth: AngularFireAuth, private router: Router) {
    this.auth.currentUser.then(value => this.userName = value?.displayName)
  }

  logout() {
    this.auth.signOut();
    this.router.navigate([ '/' ]);
  }

  isOverflown(element: HTMLElement) {
    return (
      element.scrollHeight > element.clientHeight ||
      element.scrollWidth > element.clientWidth
    );
  }

  onScrollbarUpdate($event: any) {
    // if ($event.verticalUsed) {
    // console.log('verticalUsed', $event.verticalUsed);
    // }
  }
}
