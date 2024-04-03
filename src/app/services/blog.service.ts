import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Blog } from '../models/blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private dbPath = 'blogs';

  BlogsRef: AngularFireList<Blog>;

  constructor(private db: AngularFireDatabase) {
    this.BlogsRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Blog> {
    return this.BlogsRef;
  }

  create(Blog: Blog): any {
    return this.BlogsRef.push(Blog);
  }

  update(key: string, value: any): Promise<void> {
    return this.BlogsRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.BlogsRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.BlogsRef.remove();
  }
}
