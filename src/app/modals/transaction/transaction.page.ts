import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { CategoriesPage } from '../categories/categories.page';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit {
  @Input() budgetInfo: any;
  @Input() todayDate: any;
  selectedCategory: any;
  constructor(private modalController: ModalController,
    private toastController: ToastController,
    private dataService: DataService) { }

  ngOnInit() {
    console.log(this.budgetInfo)
    //Set a default value for category
    this.selectedCategory = {
      icon_src: "assets/icon/question.png",
      name: ""
    }
  }

  back() {
    this.modalController.dismiss();
  }
  
  async presentSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Transaction Added..',
      duration: 2000
    });
    toast.present();
  }

  submit(amt, category, note) {
    if (amt != "" && category != "") {
      let data = {
        week_id: this.budgetInfo.week_id,
        amount: amt,
        note,
        name: this.selectedCategory.name,
        icon_src: this.selectedCategory.icon_src,
        date: this.todayDate
      }
      console.log(data)
      this.dataService.addTransaction(data).subscribe((successData) => {
        console.log(successData);
        this.presentSuccessToast();
        this.modalController.dismiss();
      }, (err => console.error(err)))

    }
  }

  async chooseCategory() {
    const modal = await this.modalController.create({
      component: CategoriesPage,
    });

    // modal.onWillDismiss().then((val) => {
    //   this.getBudgetCurrentWeek();
    // });
    modal.onDidDismiss().then((category) => {
      this.selectedCategory = category.data;
    });
    return await modal.present();
  }

}
