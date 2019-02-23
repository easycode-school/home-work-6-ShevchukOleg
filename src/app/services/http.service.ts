import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import {catchError, map, retry } from 'rxjs/operators';
import { Post } from '../interfaces/postInterface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServerInteractionService {
  private apiUrl: string = environment.apiUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(
    private http: HttpClient
  ) { }
    /**
     * getPost - метод запиту на отримання постів
     */
  public getPost() {
    console.log('Роблю запит на отримання всіх постів.');
    return this.http.get(`${this.apiUrl}/posts`).pipe(
      retry(3),
    );
  }

  /**
   * deletePost - метод запиту на видалення посту
   * @param postId - ідентифікатор посту на видалення
   */
  public deletePost(postId: number) {
    console.log(`Видаляю пост №${postId}`);
    return this.http.delete(`${this.apiUrl}/posts/${postId}`, this.httpOptions).pipe(
      retry(3)
    );
  }

  /**
   * sendNewPost - метод відправки на сервер нового посту
   * @param newPost - новий пост
   */
  public sendNewPost(newPost: Post) {
    return this.http.post(`${this.apiUrl}/posts`, newPost, this.httpOptions);
  }

  /**
   * editPost - метод відправки на сервер посту що редагується
   * @param post - пост, що редагується
   */
  public editPost(post: Post) {
    return this.http.post(`${this.apiUrl}/posts`, post, this.httpOptions);
  }

  /**
   * getAllComents - метод запиту на отримання усіх коментарів
   */
  public getAllComents() {
    return this.http.get(`${this.apiUrl}/posts/1/comments`).pipe(
      retry(3),
    );
  }
}
