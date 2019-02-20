import { Injectable } from '@angular/core';
import { Post } from '../interfaces/postInterface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditingService {
  private _postSource = new BehaviorSubject({});
  public postObservableSubject = this._postSource.asObservable();

  private _postCancleEditSource = new BehaviorSubject(true);
  public postCancleEditObservableSubject = this._postCancleEditSource.asObservable();

  private _postDeleteSource = new BehaviorSubject({
    userId: 0,
    id: 0,
    title: '',
    body: ''
  });
  public postDeleteObservableSubject = this._postDeleteSource.asObservable();

  constructor() { }

  public deletePost(post: Post) {
    this._postDeleteSource.next(post);
  }

  public editSinglePost(post: Post) {
    this._postSource.next(Object.assign({}, post));
  }

  public cancleEditSinglePost() {
    console.log('відміна у сервісі');
    this._postCancleEditSource.next(true);
  }

}
