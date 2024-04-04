import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogService } from '../../../services/blog.service';
import { Blog } from '../../../models/blog.model';
import { map } from 'rxjs/operators';
import { Editor, toHTML, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-Blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: [ './blog-list.component.css' ]
})
export class BlogsListComponent implements OnInit, OnDestroy {
  BlogList?: Blog[];
  currentBlog?: Blog;
  currentIndex = -1;
  title = '';
  blog: Blog = new Blog();
  action: 'new' | 'edit' | null = null;
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

  constructor(private BlogService: BlogService) {


    this.editor = new Editor();
  }

  ngOnDestroy(): void {

    this.editor.destroy();
  }

  ngOnInit(): void {
    this.retrieveBlogs();
    this.editor = new Editor();

    this.editor.valueChanges.subscribe(value => {
      this.blog.description = toHTML(value);
    })
  }

  refreshList(): void {
    this.action = null;
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
    this.action = 'edit';

    this.currentBlog = Blog;
    this.currentIndex = index;
  }

  removeAllBlogs(): void {
    this.BlogService.deleteAll()
        .then(() => this.refreshList())
        .catch(err => console.log(err));
  }

  saveBlog(): void {
    this.BlogService.create(this.blog).then(() => {
      this.action = null;
      this.newBlog();
      this.refreshList();
    });
  }

  newBlog(): void {
    this.blog = new Blog();
  }
}
