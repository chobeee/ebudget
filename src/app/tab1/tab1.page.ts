import { Component } from '@angular/core';
import * as date_fns from "date-fns";
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  week_array = Array.apply(null, Array());
  constructor(private dataService: DataService) { }
  leaderboard = Array.apply(null, Array());
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    date_fns.eachDay(
      date_fns.startOfWeek(new Date(), { weekStartsOn: 1 }),
      date_fns.endOfWeek(new Date(), { weekStartsOn: 1 })
    ).forEach((val) => {
      this.week_array.push(date_fns.format(val, "YYYY-MM-DD"));
    })


  }
  ionViewWillEnter() {
    this.getLeaderBoard(this.week_array[0], this.week_array[this.week_array.length - 1]);
    this.leaderboard = [];
  }

  getLeaderBoard(start, end) {
    this.dataService.getLeaderBoard(start, end).subscribe((successData) => {
      console.log(successData)
      successData.forEach(element => {
        let save = 0;
        element.data.forEach(secondElement => {
          save += Number(secondElement.save);
        });

        this.leaderboard.push({
          budget: element.info.budget,
          full_name: element.info.full_name,
          email: element.info.email,
          save,
        })
        console.log(save)

      });
      console.log(this.leaderboard)

      //Sort it
      this.leaderboard.sort((a, b) => parseFloat(b.save) - parseFloat(a.save));
    }, (error) => console.log(error))
  }
}
