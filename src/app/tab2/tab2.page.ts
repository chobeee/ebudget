import { Component } from '@angular/core';
import * as date_fns from "date-fns";
import * as moment from 'moment'
import { AlertController } from '@ionic/angular';
import { ModalController, Platform } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { BudgetPage } from '../modals/budget/budget.page';
import { TransactionPage } from '../modals/transaction/transaction.page';
import { SearchDatePage } from '../modals/search-date/search-date.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  transactions: any;
  expenses_today = 0;
  isTodaysDate = true;
  gotBudget = false;
  suggestedBudgetPerDay: string;
  budgetInfo: any;
  user_data: any;
  week_array = Array.apply(null, Array());
  budget: number;
  weekBoardData: any;
  active = 'weekly';
  customStart: any;
  customEnd: any;
  isBetween = true;
  hasCustom = false;

  date: any;
  //Today Date
  todayStartWeekDate = date_fns.startOfWeek(new Date(), { weekStartsOn: 1 });
  todayEndWeekDate = date_fns.endOfWeek(new Date(), { weekStartsOn: 1 });
  todayYear = date_fns.getYear(this.todayEndWeekDate);

  //Current Date Controlled by user
  currentStartWeekDate = date_fns.startOfWeek(new Date(), { weekStartsOn: 1 });
  currentEndOfWeekDate = date_fns.endOfWeek(new Date(), { weekStartsOn: 1 });

  //Display for user
  displayCurrentStartWeek = date_fns.format(this.currentStartWeekDate, "DD MMM");
  displayCurrentEndWeek = date_fns.format(this.currentEndOfWeekDate, "DD MMM");
  currentYear = date_fns.getYear(this.currentEndOfWeekDate);

  constructor(public alertController: AlertController,
    private dataService: DataService,
    private router: Router,
    private storage: Storage,
    private modalController: ModalController,
    private plt: Platform) {

  }

  

    //Check if there is a budget in this current week
  convertDecimalPlaces(percentage: number) {
    return Number(percentage).toFixed(2);
  }

  sum(a, b): number {
    return  (Number(a) + Number(b))
  }

  minus(a,b){
    return ((Number(a) - Number(b)))
  }

  getBudgetCurrentWeek() {
    this.budgetInfo = null;
    this.transactions = []
    this.expenses_today = 0;
    this.suggestedBudgetPerDay = "";
    this.storage.get("user_data").then((user_data) => {
      let data = JSON.parse(user_data);
      this.user_data = JSON.parse(user_data);
      console.log(data);
      this.dataService.getBudget(data.id,
        date_fns.format(this.currentStartWeekDate, "YYYY-MM-DD"),
        date_fns.format(this.currentEndOfWeekDate, "YYYY-MM-DD"))
        .subscribe((successData) => {
          //Disable add budget button
          this.gotBudget = true;
          this.budgetInfo = successData;
          let diffInDays = date_fns.differenceInCalendarDays(date_fns.parse(this.budgetInfo.end), new Date())
          console.log(this.budgetInfo)
          this.suggestedBudgetPerDay = this.convertDecimalPlaces((Number(this.budgetInfo.budget) + Number(this.budgetInfo.expenses))/ 7);
          //Get Transactions
          console.log(this.suggestedBudgetPerDay)
          this.getTransactions();

        }, (err => {
          //Enable add budget button
          console.log(err);
          this.gotBudget = false;
        }));
    });
  }

  getTransactions() {
    this.dataService.getTransactions(this.budgetInfo.week_id).subscribe((successData) => {
      console.log(successData);
      this.transactions = [];
      let close = [];
      let isToday = false;

      successData.forEach((firstElement, firstIndex) => {

        if (close.includes(firstElement.date)) return;
        this.transactions.push({
          name: firstElement.date,
          data: [],
          day: date_fns.format(firstElement.date, "dddd"),
          beautyDate: date_fns.format(firstElement.date, "DD MMMM YYYY")
        });
        console.log(firstIndex)
        close.push(firstElement.date)

        if (date_fns.isEqual(firstElement.date, date_fns.format(new Date(), "YYYY-MM-DD"))) {
          isToday = true;
        } else {
          isToday = false;
        }
        successData.forEach((secondElement, secondIndex) => {

          if (firstElement.date == secondElement.date) {
            if (isToday) {
              this.expenses_today += Number(secondElement.amount);
            }
            console.log(firstIndex)
            this.transactions[this.transactions.length - 1].data.push(secondElement)
          }
        });
      });
      console.log(this.expenses_today)

    }, (error => console.log(error)))
  }

  addBudget() {

  }
  reset() {

    if(this.active != 'weekly'){
      this.getCustom();
      return;
    }

    //Reset into todays date
    this.currentStartWeekDate = this.todayStartWeekDate;
    this.currentEndOfWeekDate = this.todayEndWeekDate;

    this.displayCurrentStartWeek = date_fns.format(this.currentStartWeekDate, "DD MMM");
    this.displayCurrentEndWeek = date_fns.format(this.currentEndOfWeekDate, "DD MMM");
    this.currentYear = date_fns.getYear(this.currentEndOfWeekDate);
    this.isTodaysDate = true;
    this.getBudgetCurrentWeek();
  }

  moveWeek(direction) {
    let newDate: any;
    if (direction == "forward") {
      newDate = date_fns.addWeeks(this.currentStartWeekDate, 1);
    } else {
      newDate = date_fns.subWeeks(this.currentStartWeekDate, 1);
    }

    //Set the new start week and end week date using the (lastweek) date
    this.currentStartWeekDate = date_fns.startOfWeek(newDate, { weekStartsOn: 1 });
    this.currentEndOfWeekDate = date_fns.endOfWeek(newDate, { weekStartsOn: 1 });

    //Set the display date for user
    this.currentYear = date_fns.getYear(this.currentEndOfWeekDate);
    this.displayCurrentStartWeek = date_fns.format(this.currentStartWeekDate, "DD MMM");
    this.displayCurrentEndWeek = date_fns.format(this.currentEndOfWeekDate, "DD MMM");
    //Check if the current week is the todays week
    if (date_fns.isEqual(this.todayStartWeekDate, this.currentStartWeekDate) && date_fns.isEqual(this.todayEndWeekDate, this.currentEndOfWeekDate)) {
      this.isTodaysDate = true;
    } else {
      this.isTodaysDate = false;
    }
    this.getBudgetCurrentWeek();

  }

  async presentModal() {
    if(this.active == 'weekly'){
      this.presentModalWeekly();
    }else{
      this.presentModalCustom();
    }
   
  }

  async presentModalCustom(){
    const modal = await this.modalController.create({
      component: SearchDatePage,
      componentProps: {
        budgetInfo: this.budgetInfo,
        todayDate: date_fns.format(new Date(), "YYYY-MM-DD"),
        title: 'Create custom date',
        button: 'Create',
        isCreate: true
      }
    });

    modal.onWillDismiss().then((val) => {
      if(!val.data.budget){
        return;
      }

      let custom_data = {
        user_id: this.user_data.id,
        startDate:  date_fns.format(val.data.startDate, "YYYY-MM-DD"),
        endDate: date_fns.format(val.data.endDate, "YYYY-MM-DD"),
        budget: val.data.budget
      };
      console.log(custom_data);
      this.dataService.addCustomBudget(custom_data).subscribe(data => {
        console.log(data);
        if(data['message'] == 'Custom Budget Added'){
          console.log('success');
          this.reset();
        }else{
          console.log(data['message']);
          
        }
      });
    });
    return await modal.present();
  }

  // async presentError(){
  //   const alert = await this.alertController.create({
  //     header: 'Error',
  //     subHeader: "Same date" ,
  //     message: ,
  //     buttons: ['Dismiss']
  //   });

  //   await alert.present();
  // }

 async presentModalWeekly(){
  let displayDates = {
    currentStartWeek: this.displayCurrentStartWeek,
    currentEndWeek: this.displayCurrentEndWeek,
    currentYear: this.currentYear
  };
  let realDates = {
    currentStartWeek: date_fns.format(this.currentStartWeekDate, "YYYY-MM-DD"),
    currentEndWeek: date_fns.format(this.currentEndOfWeekDate, "YYYY-MM-DD"),
    month: date_fns.getMonth(this.currentEndOfWeekDate),
    year: date_fns.getYear(this.currentEndOfWeekDate)
  }
  const modal = await this.modalController.create({
    component: BudgetPage,
    componentProps: {
      displayDates,
      realDates
    }
  });
  modal.onWillDismiss().then((val) => {
    this.getBudgetCurrentWeek();
  });
  return await modal.present();
  }

  async presentTransactionModal() {

    // let testData = {
    //   week_id: 7
    // }

    let custom = false;
    if(this.active != "weekly"){
      custom = true;
    }
    const modal = await this.modalController.create({
      component: TransactionPage,
      componentProps: {
        budgetInfo: this.budgetInfo,
        todayDate: date_fns.format(new Date(), "YYYY-MM-DD"),
        custom: custom
      }
    });

    modal.onWillDismiss().then((val) => {
      if(custom){
        this.getCustom();
        return;
      }
      this.getBudgetCurrentWeek();
    });
    return await modal.present();
  }

  async presentSearchModal() {
    const modal = await this.modalController.create({
      component: SearchDatePage,
      componentProps: {
        budgetInfo: this.budgetInfo,
        todayDate: date_fns.format(new Date(), "YYYY-MM-DD"),
        title: 'Search by date',
        button: 'Search'
      }
    });

    modal.onWillDismiss().then((val) => {
      console.log(val);
          //Current Date Controlled by user
      this.currentStartWeekDate = date_fns.startOfWeek(val.data.startDate, { weekStartsOn: 1 });
      this.currentEndOfWeekDate = date_fns.endOfWeek(val.data.endDate, { weekStartsOn: 1 });

      //Display for user
      this.displayCurrentStartWeek = date_fns.format(this.currentStartWeekDate, "DD MMM");
      this.displayCurrentEndWeek = date_fns.format(this.currentEndOfWeekDate, "DD MMM");
      this.currentYear = date_fns.getYear(this.currentEndOfWeekDate);

      this.getBudgetCurrentWeek();
    });
    return await modal.present();
  }

  getCustom(){
    console.log("custom");
    this.budgetInfo = null;
    this.transactions = []
    this.expenses_today = 0;
    this.suggestedBudgetPerDay = "";
    this.storage.get("user_data").then((user_data) => {
      let data = JSON.parse(user_data);
      this.user_data = JSON.parse(user_data);
      console.log(data);
      this.dataService.getCustomBudget(data.id)
        .subscribe((successData) => {
          //Disable add budget button
          this.gotBudget = true;
          this.budgetInfo = successData;
          let diffInDays = date_fns.differenceInCalendarDays(date_fns.parse(this.budgetInfo.end), date_fns.parse(this.budgetInfo.start))
          console.log(this.budgetInfo)
          this.customStart = date_fns.format(this.budgetInfo.start, "DD MMM");
          this.customEnd = date_fns.format(this.budgetInfo.end, "DD MMM")
          this.currentYear = date_fns.getYear(this.budgetInfo.end);
          this.suggestedBudgetPerDay = this.convertDecimalPlaces((Number(this.budgetInfo.budget) + Number(this.budgetInfo.expenses))/ (diffInDays+1));
          //Get Transactions
          console.log(this.suggestedBudgetPerDay)
          this.hasCustom = true;
          this.getCustomTransactions();
          if(date_fns.isBefore(this.budgetInfo.start, new Date()) && 
          date_fns.isAfter(this.budgetInfo.end, new Date())){
            this.isBetween = true;
          }else{
            this.isBetween = false;
          }

          console.log(this.isBetween);

        }, (err => {
          //Enable add budget button
          console.log(err);
          this.gotBudget = false;
          this.isBetween = false;
          this.hasCustom = false;
        }));
    });

  }


  getCustomTransactions(){
    this.dataService.getCustomTransactions(this.budgetInfo.custom_id).subscribe((successData) => {
      console.log(successData);
      this.transactions = [];
      let close = [];
      let isToday = false;

      successData.forEach((firstElement, firstIndex) => {

        if (close.includes(firstElement.date)) return;
        this.transactions.push({
          name: firstElement.date,
          data: [],
          day: date_fns.format(firstElement.date, "dddd"),
          beautyDate: date_fns.format(firstElement.date, "DD MMMM YYYY")
        });
        console.log(firstIndex)
        close.push(firstElement.date)

        if (date_fns.isEqual(firstElement.date, date_fns.format(new Date(), "YYYY-MM-DD"))) {
          isToday = true;
        } else {
          isToday = false;
        }
        successData.forEach((secondElement, secondIndex) => {

          if (firstElement.date == secondElement.date) {
            if (isToday) {
              this.expenses_today += Number(secondElement.amount);
            }
            console.log(firstIndex)
            this.transactions[this.transactions.length - 1].data.push(secondElement)
          }
        });
      });
      console.log(this.expenses_today)

    }, (error => console.log(error)))
  }

  segmentChanged(ev: any) {
    this.transactions = [];
    this.budgetInfo = null;

    this.active = ev.detail.value;
    // console.log(this.active);
    // console.log('Segment changed', ev);
    if(this.active == 'weekly'){
      this.getBudgetCurrentWeek();
    }else{
      this.getCustom();
    }
  }


  ngOnInit(): void {


    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(date_fns.eachDay(date_fns.startOfWeek(new Date(), { weekStartsOn: 1 }), date_fns.endOfWeek(new Date(), { weekStartsOn: 1 })));

    date_fns.eachDay(
      date_fns.startOfWeek(new Date(), { weekStartsOn: 1 }),
      date_fns.endOfWeek(new Date(), { weekStartsOn: 1 })
    ).forEach((val) => {
      // this.week_array.push(date_fns.format(val, "YYYY-MM-DD"));
      this.week_array.push(val);
    })

    console.log(date_fns.addWeeks(date_fns.startOfWeek(new Date(), { weekStartsOn: 1 }), 1))


    // let formated = date_fns.format(this.week_array[0], "MM/DD/YYYY");
    console.log(this.week_array)

  }


  ionViewWillEnter() {

    this.weekBoardData = []
    this.getBudgetCurrentWeek();
    // this.storage.get('user_data').then((val) => this.checkIfParticipant(JSON.parse(val)));
  }



}
