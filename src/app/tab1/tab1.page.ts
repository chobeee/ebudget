import { Component } from '@angular/core';
import * as date_fns from "date-fns";
import { DataService } from '../services/data.service';
import { PopoverController, ToastController, Platform, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  week_array = Array.apply(null, Array());
  leaderboard = Array.apply(null, Array());
  tips: any;

  constructor(private dataService: DataService,
    public toastController: ToastController,
    public storage: Storage, private plt: Platform, private localNotifications: LocalNotifications,
    private alertController: AlertController ) {

      // this.plt.ready().then((rdy) => {
      //   this.localNotifications.on('click').subscribe(notification => {
      //     let data = JSON.parse(notification.mydata);
      //     console.log(data);
      //   });
      // });
      
      this.dataService.getTip().subscribe((successData) => {
        console.log(successData)
        this.tips = successData;
  
        for(let a = 10; a < 15; a++){
          let index : number = Number.parseInt(Math.abs(Math.random() * Object.keys(this.tips).length - 1) + "");
          console.log(index);
          this.scheduleNotif(this.tips[index], (a ) * 2);
        }

        
  
      }, (error) => console.log(error))

     }

     



     async presentAlert(tip) {
      console.log(tip);
      //let icon = `<ion-thumbnail slot='start'><img [src]='assets/icon/bills_icon.png'></ion-thumbnail>`;

      const alert = await this.alertController.create({
        header: 'A Tip to save money',
        subHeader: tip.categories ,
        message: tip.content,
        buttons: ['Dismiss']
      });
  
      await alert.present();
    }
     
  scheduleNotif(tip, delay){
    this.localNotifications.schedule({
      id: 1,
      title: 'A tip to save money',
      text: 'Category: ' + tip.categories + "\n " + tip.content,
      trigger: {at: new Date(new Date().getTime() + delay * 1000)},
      led: 'FF0000',
      foreground: true,
      smallIcon: 'assets/icon/bills_icon.png',
      icon: 'assets/icon/fee.png'
    });
  }


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
    this.dataService.getTip().subscribe((successData) => {
      console.log(successData)
      this.tips = successData;

      let index : number = Number.parseInt(Math.abs(Math.random() * Object.keys(this.tips).length - 1) + "");
      console.log(index);
      this.presentAlert(this.tips[index]);

    }, (error) => console.log(error))


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

  convertDecimalPlaces(percentage: number) {
    return Number(percentage).toFixed(2);
  }
  calculate(firstNumber, secondNumber) {
    return Number(firstNumber) + Number(secondNumber);
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
      console.log(successData);
      this.leaderboard = successData;

      // //Sort it
      // this.leaderboard.sort((a, b) => parseFloat(b.save) - parseFloat(a.save));
    }, (error) => console.log(error))
  }
}
