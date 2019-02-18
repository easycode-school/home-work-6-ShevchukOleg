import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { AllPostsComponent } from '../all-posts/all-posts.component';
import { Post } from '../../interfaces/postInterface';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.css']
})
export class MainFormComponent implements OnInit {

  constructor(public http: HttpService, public posts: AllPostsComponent) {}

  ngOnInit() { }

  sendForm(form: NgForm) {
    const id = this.posts.getPosts.length + 101;
    const post = {
      userId: id,
      id: 101,
      title: form.value.title,
      body: form.value.body
    };
    this.http.sendNewPost(post).subscribe(
      (data: Post) => this.posts.addNewPost(data),
      (error) => {console.log(error); },
      () => console.log('New post add!')
      );
      form.reset();
  }

  
}
