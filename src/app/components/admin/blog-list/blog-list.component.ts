import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../services/blog.service';
import { Blog } from '../../../models/blog.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-Blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogsListComponent implements OnInit {
  BlogList?: Blog[];
  currentBlog?: Blog;
  currentIndex = -1;
  title = '';

  constructor(private BlogService: BlogService) { }

  ngOnInit(): void {
    this.retrieveBlogs();
  }

  refreshList(): void {
    this.currentBlog = undefined;
    this.currentIndex = -1;
    this.retrieveBlogs();
  }

  retrieveBlogs(): void {
    this.BlogService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.BlogList = data;
    });
  }

  setActiveBlog(Blog: Blog, index: number): void {
    this.currentBlog = Blog;
    this.currentIndex = index;
  }

  removeAllBlogs(): void {
    this.BlogService.deleteAll()
      .then(() => this.refreshList())
      .catch(err => console.log(err));
  }
}
