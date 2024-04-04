import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { BlogService } from '../../../services/blog.service';
import { Blog } from '../../../models/blog.model';
import { Editor, toHTML, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: [ './blog-details.component.css' ]
})
export class BlogDetailsComponent implements OnInit, OnDestroy, OnChanges {
  editor: Editor;
  toolbar: Toolbar = [
    [ 'bold', 'italic' ],
    [ 'underline', 'strike' ],
    [ 'code', 'blockquote' ],
    [ 'ordered_list', 'bullet_list' ],
    [ { heading: [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ] } ],
    [ 'link', 'image' ],
    [ 'text_color', 'background_color' ],
    [ 'align_left', 'align_center', 'align_right', 'align_justify' ],
  ];
  @Input() blog?: Blog;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentBlog: Blog = {
    title: '',
    description: '',
    published: false
  };
  message = '';
  protected readonly alert = alert;

  constructor(private BlogService: BlogService) {

    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  ngOnInit(): void {
    this.editor = new Editor();
    this.editor.valueChanges.subscribe(value => {
      this.currentBlog.description = toHTML(value);

    })
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentBlog = { ...this.blog };
  }

  updatePublished(status: boolean): void {
    if ( this.currentBlog.key ) {
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

    if ( this.currentBlog.key ) {
      this.BlogService.update(this.currentBlog.key, data)
          .then(() => this.message = 'The Blog was updated successfully!')
          .catch(err => console.log(err));
    }
  }

  deleteBlog(): void {
    if ( this.currentBlog.key ) {
      this.BlogService.delete(this.currentBlog.key)
          .then(() => {
            this.refreshList.emit();
            this.message = 'The Blog was updated successfully!';
          })
          .catch(err => console.log(err));
    }
  }
}
