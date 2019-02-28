import { Component, OnInit, Input } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.page.html',
  styleUrls: ['./budget.page.scss'],
})
export class BudgetPage implements OnInit {
  @Input() displayDates: any;
  @Input() realDates: any;



  constructor(private alertController: AlertController,
    private dataService: DataService,
    private storage: Storage,
    private modalController: ModalController,
    private toastController: ToastController) { }

  ngOnInit() {
    console.log(this.displayDates)
    console.log(this.realDates)
  }

  submit(value) {

    if (value != "") {
      this.storage.get("user_data").then((user_data) => {
        let data = JSON.parse(user_data);
        let budget_data = {
          budget: value,
          start: this.realDates.currentStartWeek,
          end: this.realDates.currentEndWeek,
          month: this.realDates.month,
          year: this.realDates.year,
          user_id: data.id
        }

        this.dataService.addBudget(budget_data).subscribe((successData) => {
          console.log("added?")
          this.presentToast();
          this.modalController.dismiss();

        }, (err => console.error(err)));
      });
    } else {
      this.presentAlert("Please input a budget");
    }
  }


  async presentAlert(message) {
    const alert = await this.alertController.create({
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: `Created Budget for this week ${this.displayDates.currentStartWeek} - ${this.displayDates.currentEndWeek} ${this.displayDates.currentYear}`,
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }

  cancel() {
    this.modalController.dismiss();
  }

}
