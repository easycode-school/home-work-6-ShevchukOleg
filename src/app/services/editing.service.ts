import { Injectable } from '@angular/core';
import { Post } from '../interfaces/postInterface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditingService {
  // private editingPost: Post = {
  //   userId: 0,
  //   id: 0,
  //   title: '',
  //   body: ''
  // };

  // private _postSource = new BehaviorSubject(this.editingPost);

  // public postObservableSubject = this._postSource.asObservable();

  constructor() { }

}
