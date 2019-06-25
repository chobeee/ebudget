import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isLogin = true;
  constructor(private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private storage: Storage) { }

  ngOnInit() {
  }



  register(email, password, name, gender, confirmpassword) {
    if (email != "" && password != "" && name != "") {
      if(confirmpassword == password){
      this.authService.register(email, password, name, gender).subscribe((successData) => {
        if(confirmpassword != password){
          this.presentAlert("Password Do Not Match");
        }  
        else {
          this.presentAlert(successData.message);
        }

      }, (error) => console.log(error))
    }else{
      this.presentAlert("Passwords do not match")
    }
  }
    else {
      this.presentAlert("Please fill all fields")
    }
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      header: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  segmentChanged(ev) {
    if (ev.detail.value == "register") {
      this.isLogin = false;
    } else {
      this.isLogin = true;

    }
  }

  login(email, password) {
    if (email != "" && password != "") {
      this.authService.login(email, password).subscribe((successData) => {
        let user_data = {
          id: successData.id,
          email: successData.email,
          full_name: successData.full_name,
          avatar_src: successData.avatar_src
        }
        console.log(successData)
        this.storage.set('user_data', JSON.stringify(user_data));
        this.storage.set('isNotified', false);

        this.router.navigate(["tab"]);


      }, (error) => {
        console.log(error)
        this.presentAlert(error.error.message);
      });
    } else {
      this.presentAlert("Please fill all fields")
    }
  }



}
