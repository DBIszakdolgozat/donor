import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { BlogService } from '../../../services/blog.service';
import { Blog } from '../../../models/blog.model';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit, OnChanges {
  @Input() blog?: Blog;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentBlog: Blog = {
    title: '',
    description: '',
    published: false
  };
  message = '';

  constructor(private BlogService: BlogService) { }

  ngOnInit(): void {
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentBlog = { ...this.blog };
  }

  updatePublished(status: boolean): void {
    if (this.currentBlog.key) {
      this.BlogService.update(this.currentBlog.key, { published: status })
      .then(() => {
        this.currentBlog.published = status;
        this.message = 'The status was updated successfully!';
      })
      .catch(err => console.log(err));
    }
  }

  updateBlog(): void {
    const data = {
      title: this.currentBlog.title,
      description: this.currentBlog.description
    };

    if (this.currentBlog.key) {
      this.BlogService.update(this.currentBlog.key, data)
        .then(() => this.message = 'The Blog was updated successfully!')
        .catch(err => console.log(err));
    }
  }

  deleteBlog(): void {
    if (this.currentBlog.key) {
      this.BlogService.delete(this.currentBlog.key)
        .then(() => {
          this.refreshList.emit();
          this.message = 'The Blog was updated successfully!';
        })
        .catch(err => console.log(err));
    }
  }
}
