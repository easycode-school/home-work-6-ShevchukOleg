import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServerInteractionService } from '../../services/http.service';
import { EditingService } from '../../services/editing.service';
import { Post } from '../../interfaces/postInterface';


@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.css']
})
export class MainFormComponent implements OnInit {
  /**
   * -передаємо шаблонну змінну форми у компоненту
   */
  @ViewChild('mainForm', { static: true }) form: NgForm;

  /**
   * пост що редагується
   */
  public processingPost: Post = {
    userId: 0,
    id: 0,
    title: '',
    body: ''
  };

  /**
   * - новий пост
   */
  private newPost: Post;

  constructor( public serverService: ServerInteractionService, public applicationData: EditingService) {}

  /**
   * при запуску компоненти підписуємось на данні про пости на редагування
   */
  ngOnInit() {
    this.applicationData.postEditingObservableSubject.subscribe((editPost) => {
      if (editPost.id !== 0) {
        this.processingPost = editPost;
        console.log('Пост прийшов на редагування');
        console.log(this.processingPost);
      }
    });
/**
 * - підписка на відміну редагування
 */
    this.applicationData.postCancleEditObservableSubject.subscribe((state) => {
      if (state) {
        console.log('Редагування припинено!');
        this.processingPost = {
          userId: 0,
          id: 0,
          title: '',
          body: ''
        };
      }
    });
  }
/**
 * - метод відправки форми, якщо немає id відправляється як новий пост, якщо є то
 * відбувається редагування існуючого
 * @param form - стан форми
 */
  sendForm(form: NgForm) {
    console.log(`Відправлення посту`);
    if (this.processingPost.id !== 0) {
      this.newPost = {
        userId: 1, // можно делать авторизацию, но сервер сам определяет эти параметры
        id: this.processingPost.id,
        title: form.value.title,
        body: form.value.body
      };
      this.serverService.editPost(this.newPost).subscribe(() => {
        console.log('сервер підтвердив зміни на', this.newPost);
        this.applicationData.replacePost(this.newPost);
        this.processingPost = {
          userId: 0,
          id: 0,
          title: '',
          body: ''
        };
        form.reset();
      });
    } else {
      this.applicationData.addNewPost (form.value.title, form.value.body);
      form.reset();
    }
  }
/**
 * -метод відміни редагування посту
 */
  cancleEditPost() {
    this.applicationData.cancleEditSinglePost();
  }
}
