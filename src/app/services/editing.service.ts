import { Injectable } from '@angular/core';
import { Post } from '../interfaces/postInterface';
import { Coment } from '../interfaces/comentsInterface';
import { BehaviorSubject, Observable } from 'rxjs';
import { ServerInteractionService } from '../services/http.service';

@Injectable({
  providedIn: 'root'
})
export class EditingService {
  /**
   * основне місце збереження постів
   */
  private _posts: Post[];
  /**
   * основна БД коментарів
   */
  private _allComents: Coment[];
  /**
   * BS. для рекції на змыну станів у БД всіх постів
   */
  private _allPostsSource = new BehaviorSubject([]);
  public allPostsObservableSubject = this._allPostsSource.asObservable();
  /**
   * BS. для трансляції даних про редагування посту
   */
  private _postEditSource = new BehaviorSubject({
    userId: 0,
    id: 0,
    title: '',
    body: ''
  });
  public postEditingObservableSubject = this._postEditSource.asObservable();

  /**
   * BS. для передачі сигналу про відміну редагування
   */
  private _postCancleEditSource = new BehaviorSubject(false);
  public postCancleEditObservableSubject = this._postCancleEditSource.asObservable();
  /**
   * BS. для передачі даних про отримані коментарі
   */
  private _postsComentSource = new BehaviorSubject([]);
  public postComentObservableSubject = this._postsComentSource.asObservable();

  constructor(
    public serverService: ServerInteractionService
  ) { }

  /**
   * loadPosts -метод для завантаження постів з серверу, та еміту події зміни БД усіх постів
   */
  public loadPosts() {
    this.serverService.getPost().subscribe (
          (data: Post[]) => {
            this._posts = data;
            this._allPostsSource.next(this._posts); },
          (error) => {console.log(error); },
          () => console.log('Робота з сервером завершена')
        );
  }

    /**
     * метод видалення посту, активує метод видалення в сервісі роботи з сервером,
     * по відповіді серверу видаляє пост з БД, повыдомляє компоненту всіх постів про зміни
     * @param postId - ідентифікатор посту
     */
  public deletePost(postId: number) {
    console.log(`Наказ про  видалення посту №${postId} у сервісі компонент`);
    this.serverService.deletePost(postId).subscribe(() => {
      console.log(`Сервер підтвердив видалення посту №${postId}`);
      this._posts = this._posts.filter((restPost) => {
        return restPost.id !== postId;
      });
      this._allPostsSource.next(this._posts);
    });
  }

  /**
   * addNewPost - метод створення нового посту, створює новий пост і надсилає до сервісу роботи
   * з сервером, по відповіді серверу, змінює БД і повідомляє відповідну компоненту
   * @param postTitle - заголовок посту
   * @param postBody -  основний зміст
   */
  public addNewPost(postTitle: string, postBody: string) {
    const timestamp = +new Date;
    const newPost = {
      userId: 1,
      id: timestamp - 1000,
      title: postTitle,
      body: postBody
    };
    console.log('Сервіс додає пост на сервер.');
    this.serverService.sendNewPost(newPost).subscribe(
        (data: Post) => {
          console.log('Сервер прийняв інформацію.', data);
          this._posts.unshift(newPost);
          console.log('Пост додано в БД');
          this._allPostsSource.next(this._posts);
        },
        (error) => {console.log(error); },
        () => console.log('Роботу з сервером завершено')
      );
  }
  /**
   * editSinglePost - метод зміни одного постуб приймає пост з компоненти, через BS.
   * передає дані до форми для відображення
   * @param post - пост що редагується
   */
  public editSinglePost(post: Post) {
      this._postEditSource.next(Object.assign({}, post));
  }

  /**
   * cancleEditSinglePost - метод припинення редагування посту, повідомляє про відміну
   */
  public cancleEditSinglePost() {
    console.log('Відміна редагування у сервісі');
    this._postCancleEditSource.next(true);
  }
  /**
   * replacePost - метод заміни редагованого посту, провідомляє про зміни в БД  усіх постів
   * @param post - новий пост на заміну
   */
  public replacePost(post: Post) {
    this._posts = this._posts.map((singlePost) => {
      if (singlePost.id === post.id) {
        return Object.assign({}, post);
      } else {
        return singlePost;
      }
    });
    this._allPostsSource.next(this._posts);
  }

  /**
   * getComents - метод отримання коментарів, через сервіс взаємодії з сервером заповнює
   * основну БД коментарів, передає коментарі в компоненту посту на фільтрування
   * @param postId - ідентифікарот посту
   */
  public getComents(postId: number) {
    console.log(`Отримати коментарі для посту №${postId}`);
    this.serverService.getAllComents().subscribe((response: Coment[]) => {
      this._allComents = response;
      console.log('Від серверу отримано коментарі');
      this._postsComentSource.next(this._allComents);
    });
  }
}
