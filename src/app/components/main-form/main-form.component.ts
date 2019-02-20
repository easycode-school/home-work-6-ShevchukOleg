import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServerInteractionService } from '../../services/http.service';
import { Post } from '../../interfaces/postInterface';
import { EditingService } from '../../services/editing.service';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.css']
})
export class MainFormComponent implements OnInit {
  public processingPost: Post;
  constructor( public http: ServerInteractionService, public applicationData: EditingService) {}

  ngOnInit() {
    this.applicationData.postObservableSubject.subscribe((post: Post) => {
      this.processingPost = post;
      console.log(this.processingPost);
    });

    this.applicationData.postCancleEditObservableSubject.subscribe(() => console.log('Редагування припинено!'));
  }

  sendForm(form: NgForm) {
    const post = {
      userId: 101,
      id: 101,
      title: form.value.title,
      body: form.value.body
    };
    console.log(`Пост для відправки ${post}`);
    // this.http.sendNewPost(post).subscribe(
    //   (data: Post) => this.posts.addNewPost(data),
    //   (error) => {console.log(error); },
    //   () => console.log('New post add!')
    //   );
    //   form.reset();
  }
}
