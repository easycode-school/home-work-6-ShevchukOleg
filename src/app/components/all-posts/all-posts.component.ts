import { Component, OnInit } from '@angular/core';
import { Post } from '../../interfaces/postInterface';
import { EditingService } from '../../services/editing.service';
// import { MainFormComponent } from '../main-form/main-form.component';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})

export class AllPostsComponent implements OnInit {
  /**
   * -локальна база даних
   */
  public posts: Post[];

  constructor(
    public applicationData: EditingService
  ) { }

  /**
  * при завантажені компонети відправляємо запит на вервер, зберігаєсо копію БД в компоненті
  */
  ngOnInit() {
    this.applicationData.loadPosts();
    this.applicationData.allPostsObservableSubject.subscribe((data: Post[]) => {
      this.posts = data.slice();
    });
  }
}
