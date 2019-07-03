import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../services/data.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.page.html',
  styleUrls: ['./edit-comment.page.scss'],
})
export class EditCommentPage implements OnInit {
  @Input('comment') comment;
  constructor(
    private dataService: DataService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    console.log(this.comment)
  }

  editComment(comment) {
    this.dataService.updateComment(this.comment.comment_id, comment).subscribe((response) => {
      this.comment.comment = comment;
      this.modalController.dismiss({
        comment: this.comment
      }, "update")
    })
  }
  back() {
    this.modalController.dismiss();
  }

}
