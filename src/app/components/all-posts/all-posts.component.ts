import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ServerInteractionService } from '../../services/http.service';
import { Post } from '../../interfaces/postInterface';
import { EditingService } from '../../services/editing.service';
// import { MainFormComponent } from '../main-form/main-form.component';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})

export class AllPostsComponent implements OnInit, AfterViewChecked {
  public posts: Post[];

  constructor(
    private http: ServerInteractionService,
    public applicationData: EditingService
  ) { }
  /**
  * при завантажені компонети отримуються данні від серверу, та записуються в this.posts
  */
  ngOnInit() {
    this.http.getPost().subscribe (
        (data: Post[]) => {
          this.posts = data; },
        (error) => {console.log(error); },
        () => console.log('Posts receive!')
      );
  }

  ngAfterViewChecked() {
    this.applicationData.postDeleteObservableSubject.subscribe((post: Post) => {
      console.log(`Отримано наказ видалити з розмітки пост ${post}`);
      this.posts = this.posts.filter((item) => {
        return item.id !== post.id;
      });
    });
}


  /**
   * -метод отримання постів
   */
  get allPosts() {
    return this.posts;
  }

  addNewPost(post: Post) {
    console.log(post);
    this.posts.push(post);
  }

}
