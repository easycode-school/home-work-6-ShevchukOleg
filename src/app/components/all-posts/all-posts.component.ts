import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Post } from '../../interfaces/postInterface';
import { MainFormComponent } from '../main-form/main-form.component';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {
  public posts: Post[];

  constructor(
    public http: HttpService
  ) { }

  ngOnInit() {
    this.http.getPost().subscribe (
        (data: Post[]) => {
          this.posts = data; },
        (error) => {console.log(error); },
        () => console.log('Posts receive!')
      );
  }

  getPosts() {
    return this.posts;
  }

  deletePost(event) {
    const postId: number = +event.target.closest('.container').dataset.post_id;
    const deletedPost = this.posts.filter((post: Post) => {
      return post.id === postId;
      }
    )[0];
    this.http.deletePost(deletedPost).subscribe(
      (data: []) => {
        this.posts = this.posts.filter((post: Post) => {
          return post.id !== postId;
          }
        );
        console.log('Deleted post:', postId);
      }
    );
  }

  addNewPost(post: Post) {
    console.log(post);
    this.posts.push(post);
  }

  editPost(event) {
    const postId: number = +event.target.closest('.container').dataset.post_id;
    const requiredPost = this.posts.filter((post) => post.id === postId);
    console.log(requiredPost);
    return requiredPost;
  }
}
