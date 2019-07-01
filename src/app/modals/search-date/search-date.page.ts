import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-search-date',
  templateUrl: './search-date.page.html',
  styleUrls: ['./search-date.page.scss'],
})
export class SearchDatePage implements OnInit {

  // @Input() startDate: any;
  // @Input() endDate: any;
  // now: any;
  data :any;
  budget: any;

  
  startDate: String = new Date().toISOString();
  endDate: String = new Date().toISOString();

  constructor(private modalController: ModalController, private navParams: NavParams) { 
    this.data = this.navParams.data;
  }
  ngOnInit() {
    console.log(this.navParams.data.todayDate);
  }

  back() {
    this.modalController.dismiss();
  }

  search(){
    this.modalController.dismiss({
      startDate: this.startDate,
      endDate: this.endDate,
      budget: this.budget
    });
  }

}
