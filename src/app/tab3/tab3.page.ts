import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';
import { CommentsPage } from '../comments/comments.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  [x: string]: any;
  user_data: any;


  constructor(
    private router: Router,
    private storage: Storage,
    private modalController: ModalController,


  ) { }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  async comments() {
    const modal = await this.modalController.create({
      component: CommentsPage,
      componentProps: { value: 123 }
    });
    return await modal.present();
  }

  logout() {
    this.router.navigate([""]);
  }

  ionViewWillEnter() {
    this.storage.get("user_data").then((user_data) => {
      let data = JSON.parse(user_data);
      this.user_data = data;
      console.log(this.user_data)

    })

  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: CommentsPage,
      componentProps: { userData: this.user_data }
    });
    return await modal.present();
  }
}
