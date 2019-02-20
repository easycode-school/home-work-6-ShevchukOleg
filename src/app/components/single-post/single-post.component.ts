import { Component, OnInit, Input } from '@angular/core';
import { ServerInteractionService } from '../../services/http.service';
import { Post } from '../../interfaces/postInterface';
import { EditingService } from '../../services/editing.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {
  @Input() post: Post;
  public isAditPost = false;
  constructor(
    private http: ServerInteractionService,
    private applicationData: EditingService
    ) { }

  ngOnInit() {
  }

  /**
   * deletePost - метод видалення постів, визначаєсь
   * @param event - подія при натиcнені на клавішу видалення в пості
   */
  deletePost() {
    this.http.deletePost(this.post).subscribe(
      () => {
        console.log(`Сервер підтвердив видалення посту №${this.post.id}`);
        this.applicationData.deletePost(this.post);
      }
    );
  }

  editPost() {
    this.isAditPost = true;
    this.applicationData.editSinglePost(this.post);
  }
  cancleEditPost() {
    console.log('відміна');
    this.isAditPost = false;
    this.applicationData.cancleEditSinglePost();
  }
}
