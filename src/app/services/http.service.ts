import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import {catchError, map, retry } from 'rxjs/operators';
import { Post } from '../interfaces/postInterface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiUrl: string = environment.apiUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  public getPost() {
    return this.http.get(`${this.apiUrl}/posts`).pipe(
      retry(3),
    );
  }

  public deletePost(post: Post) {
    return this.http.delete(`${this.apiUrl}/posts/${post.id}`, this.httpOptions).pipe(
      retry(3)
    );
  }
  // Не впливає на завантаження
  public sendNewPost(post: Post) {
    return this.http.post(`${this.apiUrl}/posts`, post, this.httpOptions);
  }
}
