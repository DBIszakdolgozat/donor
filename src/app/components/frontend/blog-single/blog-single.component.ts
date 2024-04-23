import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './blog-single.component.html',
  styleUrls: [ './blog-single.component.css' ]
})
export class BlogSingleComponent {

  id :string;
  constructor(private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    console.log(this.id)
  }

}
