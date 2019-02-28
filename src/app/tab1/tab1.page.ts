import { Component } from '@angular/core';
import * as date_fns from "date-fns";
import { DataService } from '../services/data.service';
import { PopoverController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  week_array = Array.apply(null, Array());
  leaderboard = Array.apply(null, Array());

  constructor(private dataService: DataService,
    public toastController: ToastController,
    public storage: Storage) { }


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    date_fns.eachDay(
      date_fns.startOfWeek(new Date(), { weekStartsOn: 1 }),
      date_fns.endOfWeek(new Date(), { weekStartsOn: 1 })
    ).forEach((val) => {
      this.week_array.push(date_fns.format(val, "YYYY-MM-DD"));
    })

    //Check if email is verified if not notify the user to verify his/her account



  }
  ionViewWillEnter() {
    this.storage.get("isNotified").then((isNotified) => {
      if (!isNotified) {
        this.storage.get("user_data").then((user_data) => {
          let data = JSON.parse(user_data);
          if (!data.isVerified) {
            this.presentUnverifiedEmail();
            this.storage.set("isNotified", true);
          }
        });
      }
    })
    this.getLeaderBoard(date_fns.format(date_fns.startOfWeek(new Date(), { weekStartsOn: 1 }), "YYYY-MM-DD"), date_fns.format(date_fns.endOfWeek(new Date(), { weekStartsOn: 1 }), "YYYY-MM-DD"));
    this.leaderboard = [];
  }

  getColor(index) {
    let colors = ["green", "blue", "yellow"];
    if (index > 2) {
      return "gray";
    } else {
      return colors[index];
    }
  }
  async presentUnverifiedEmail() {
    const toast = await this.toastController.create({
      message: 'Please verify your email',
      duration: 10000,
      showCloseButton: true,
      position: 'top',
      closeButtonText: 'Okay',
      color: "danger"
    });
    toast.present();
  }



  getLeaderBoard(start, end) {
    this.dataService.getLeaderboard(start, end).subscribe((successData) => {
      console.log(successData)
      this.leaderboard = successData;

      // //Sort it
      // this.leaderboard.sort((a, b) => parseFloat(b.save) - parseFloat(a.save));
    }, (error) => console.log(error))
  }
}
