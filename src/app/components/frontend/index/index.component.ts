import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Blog } from '../../../models/blog.model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {

  blogList: Blog [] = [];

  constructor(
    private http: HttpClient) {

  }

  getBlogs() {
    this.blogList = [];

    return this.http
               .get<{
                 [key: string]: {
                   title: string
                   description: string
                   published: boolean
                 }
               }>(environment.firebase.databaseURL + 'blogs.json')
               .toPromise().then((value) => {

        if ( value ) {
          for ( const [ key, blog ] of Object.entries(value) ) {
            let temp = new Blog();

            temp.key = key;
            temp.title = blog.title;
            temp.description = blog.description;
            temp.published = blog.published;

            this.blogList.push(temp);
          }
        }

      })
  }

  public async ngOnInit() {
    await this.getBlogs();
  }
}
