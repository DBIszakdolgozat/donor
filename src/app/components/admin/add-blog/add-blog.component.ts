import { Component } from '@angular/core';
import { BlogService } from '../../../services/blog.service';
import { Blog } from '../../../models/blog.model';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent {

  blog: Blog = new Blog();
  submitted = false;

  constructor(private BlogService: BlogService) { }

  saveBlog(): void {
    this.BlogService.create(this.blog).then(() => {
      console.log('Created new item successfully!');
      this.submitted = true;
    });
  }

  newBlog(): void {
    this.submitted = false;
    this.blog = new Blog();
  }
}
