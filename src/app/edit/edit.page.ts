import { ModalController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  user_data;
  constructor(public modalController: ModalController, public navParams: NavParams) { }


  ngOnInit() {
    this.user_data=this.navParams.get('userData')
    console.log(this.user_data)
  }

  
  
  back() {
    this.modalController.dismiss();
  }

}

