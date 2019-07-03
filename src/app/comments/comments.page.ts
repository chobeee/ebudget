import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import * as date_fns from "date-fns";
import { DataService } from '../services/data.service';
import { Storage } from '@ionic/storage';
import { CommentPopoverPage } from '../comment-popover/comment-popover.page';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {
  leaderboard: any;
  convo_name: string;
  user_data: any;
  comments: any[];
  topSaver: any;
  @ViewChild("message") messageBox: any;
  @ViewChild("content") content: any;
  constructor(
    private modalController: ModalController,
    private dataService: DataService,
    private storage: Storage,
    public popoverController: PopoverController,
    private _zone: NgZone
  ) { }

  async ngOnInit() {

  }

  async ionViewWillEnter() {
    this.getLeaderBoard(date_fns.format(date_fns.startOfWeek(new Date(), { weekStartsOn: 1 }), "YYYY-MM-DD"), date_fns.format(date_fns.endOfWeek(new Date(), { weekStartsOn: 1 }), "YYYY-MM-DD"));
    this.user_data = JSON.parse(await this.storage.get("user_data"));

  }


  back() {
    this.modalController.dismiss();
  }

  getComments(convo_name) {
    this.dataService.getComments(convo_name).subscribe((comments) => {
      this.comments = comments;
    }, err => console.log(err));
  }

  sendComment(comment) {
    this.dataService.sendComment(this.convo_name, comment, this.user_data.id).subscribe((comment) => {
      this.comments.push(comment)
      this._zone.run(() => {
        setTimeout(() => {
          this.content.scrollToBottom(300);
        });
      })
      this.messageBox.value = "";
    }, err => console.log(err));
  }
  durationLastOnline(date) {
    return date_fns.distanceInWordsToNow(date);
  }


  async showPopover(comment, index, ev: any) {
    const popover = await this.popoverController.create({
      component: CommentPopoverPage,
      event: ev,
      translucent: true,
      componentProps: { comment }
    });
    popover.onWillDismiss().then((data) => {
      console.log(data);
      if (data.role == "delete") {
        this.comments.splice(index, 1);
      } else if (data.role == "update") {
        this.comments[index] = data.data.comment;
      }
    }).catch(err => console.error(err));
    return await popover.present();
  }

  getLeaderBoard(start, end) {
    this.dataService.getLeaderboard(start, end).subscribe((successData) => {
      console.log(successData);
      this.leaderboard = successData;
      this.topSaver = successData[0];
      let convo_name = btoa(this.topSaver.email + this.topSaver.start + this.topSaver.end);
      this.convo_name = convo_name;
      this.getComments(this.convo_name);

      // //Sort it
      // this.leaderboard.sort((a, b) => parseFloat(b.save) - parseFloat(a.save));
    }, (error) => console.log(error))
  }

}
