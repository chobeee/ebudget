import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../services/data.service';
import { PopoverController, ModalController } from '@ionic/angular';
import { EditCommentPage } from '../edit-comment/edit-comment.page';

@Component({
  selector: 'app-comment-popover',
  templateUrl: './comment-popover.page.html',
  styleUrls: ['./comment-popover.page.scss'],
})
export class CommentPopoverPage implements OnInit {
  @Input("comment") comment;
  constructor(
    private dataService: DataService,
    private popoverController: PopoverController,
    public modalController: ModalController
  ) {

  }

  ngOnInit() {
    console.log(this.comment)
  }
  async update() {
    const modal = await this.modalController.create({
      component: EditCommentPage,
      componentProps: { comment: this.comment }
    });
    return await modal.present();
  }



  delete() {
    this.dataService.deleteComment(this.comment.comment_id).subscribe((response) => {
      this.popoverController.dismiss({
        comment: this.comment
      }, "delete")
    }, err => console.error(err));
  }

}
