import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  user_data: any;

  constructor(private router: Router,
    private storage: Storage) { }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }
  logout() {
    this.router.navigate([""]);
  }
  ionViewWillEnter() {
    this.storage.get("user_data").then((user_data) => {
      let data = JSON.parse(user_data);
      this.user_data = data;

    })

  }
}
