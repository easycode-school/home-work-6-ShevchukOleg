import { Component, OnInit, Input } from '@angular/core';
import { ServerInteractionService } from '../../services/http.service';
import { Post } from '../../interfaces/postInterface';
import { Coment } from '../../interfaces/comentsInterface';
import { EditingService } from '../../services/editing.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {
  @Input() post: Post;
  /**
   * чи редагується пост
   */
  public isAditPost = false;
  /**
   * БД коментарів до посту
   */
  public postComents: Coment[];
  /**
   * тригер відображення коментів
   */
  public comentsViev = false;

  constructor(
    private serverService: ServerInteractionService,
    private applicationData: EditingService
    ) { }
    /**
     * при запускі компоненти відбувається підписка на отримання коментарів, що потім фільтруються у відпосідності до посту,
     * та передаються в БД коментів
     */
  ngOnInit() {
    this.applicationData.postComentObservableSubject.subscribe((data: Coment[]) => {
      if (data.length) {
        let resivedComents = [];
        console.log(this.post.id);
        resivedComents = data.filter((item: Coment) => {
          return item.postId === this.post.id;
        }).slice();
        this.postComents = resivedComents;
        console.log(this.postComents);
      }
    });
  }

  /**
   * deletePost - метод видалення постів, передає команду в сервіс взаємодії компонент
   */
  deletePost() {
    this.applicationData.deletePost(this.post.id);
  }

  /**
   * editPost - метод редагування посту, змінює стан росту, передає команду на редагування посту в сервіс взаємодії компонент
   */
  editPost() {
    this.isAditPost = true;
    this.applicationData.editSinglePost(this.post);
  }

  /**
   *cancleEditPost - метод припинення редагування посту, змінює стан і передає команду на редагування посту в серві
   * взаємодії компонент
   */
  cancleEditPost() {
    console.log('Редагування відмінено в пості');
    this.isAditPost = false;
    this.applicationData.cancleEditSinglePost();
  }

  /**
   * showComents - метод для показу коментарів до посту
   */
  showComents() {
    console.log('Команда на показ постів отримана');
    if (this.comentsViev) {
      this.comentsViev = false;
    } else {
      this.applicationData.getComents(this.post.id);
      this.comentsViev = true;
    }
  }
}
