import { Component } from '@angular/core';
import * as date_fns from "date-fns";
import { AlertController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  week_array = Array.apply(null, Array());
  budget: number;
  weekBoardData: any;

  date: any;


  constructor(public alertController: AlertController, private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(date_fns.eachDay(date_fns.startOfWeek(new Date(), { weekStartsOn: 1 }), date_fns.endOfWeek(new Date(), { weekStartsOn: 1 })));

    date_fns.eachDay(
      date_fns.startOfWeek(new Date(), { weekStartsOn: 1 }),
      date_fns.endOfWeek(new Date(), { weekStartsOn: 1 })
    ).forEach((val) => {
      this.week_array.push(date_fns.format(val, "YYYY-MM-DD"));
    })


    // let formated = date_fns.format(this.week_array[0], "MM/DD/YYYY");
    console.log(this.week_array)

  }
  ionViewWillEnter() {
    this.weekBoardData = []
    this.checkIfParticipant();
  }
  update(day_id, expenses, today_budget) {
    let save = today_budget - expenses;
    console.log("You save " + save);
    this.dataService.updateDay(day_id, expenses, save).subscribe((successData) => {
      console.log(successData);
      this.getWeekBoard();

    }, (error) => console.log(error))
  }
  async presentAlertConfirm(day_id, expenses, today_budget) {
    const alert = await this.alertController.create({
      message: '<strong>Please confirm to update</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirm',
          handler: () => {
            this.update(day_id, expenses, today_budget);
          }
        }
      ]
    });

    await alert.present();
  }

  getWeekBoard() {
    let id = localStorage.getItem("id");
    let start = this.week_array[0];
    let end = this.week_array[this.week_array.length - 1];

    this.dataService.getWeekBoard(id, start, end).subscribe((successData) => {
      console.log(successData);
      this.weekBoardData = successData;
      this.date = this.weekBoardData[0].start + " - " + this.weekBoardData[0].end;

    }, (error) => console.log(error))

  }
  change(event) {
    console.log(event)
  }

  checkIfParticipant() {
    //Get current week
    let id = localStorage.getItem("id");
    let start = this.week_array[0];
    let end = this.week_array[this.week_array.length - 1];
    console.log("Start " + start)
    console.log("end " + end);


    this.dataService.isCurrentWeekParticipant(id, start, end).subscribe((successData) => {
      if (successData.status == "success") {
        this.presentAlertPrompt();
      } else {
        this.getWeekBoard();
      }
    }, (error) => console.log(error))
  }

  insertParticipant() {
    let id = localStorage.getItem("id");
    let start = this.week_array[0];
    let end = this.week_array[this.week_array.length - 1];

    this.dataService.participantCurrentWeek(id, this.budget, start, end, this.week_array).subscribe((successData) => {
      console.log(successData);
      this.getWeekBoard();


    }, (error) => console.log(error))
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: `How much is your budget this week? (${date_fns.format(date_fns.startOfWeek(new Date(), { weekStartsOn: 1 }), "MM/DD/YYYY")} - ${date_fns.format(date_fns.endOfWeek(new Date(), { weekStartsOn: 1 }), "MM/DD/YYYY")})`,
      inputs: [
        {
          name: 'budget',
          type: 'text',
          placeholder: "Enter your budget here.."
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.router.navigate(["tab/tab1"]);
          }
        }, {
          text: 'Ok',
          handler: () => {
            alert.onDidDismiss().then((data) => {
              console.log(data)
              console.log(data.data.values.budget)
              this.budget = data.data.values.budget;
              this.insertParticipant();
            }).catch((error) => console.log(error))
          }
        }
      ]
    });

    await alert.present();
    // await alert.onDidDismiss().then((data) => {
    //   console.log(data)
    //   this.budget = data.data.values.budget;
    //   this.insertParticipant();
    // }).catch((error) => console.log(error))
  }
}
