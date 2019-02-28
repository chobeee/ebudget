import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private router: Router, private authService: AuthService, private alertController: AlertController) { }

  ngOnInit() {
  }

  login() {
    this.router.navigate(["login"]);

  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      header: message,
      buttons: ['OK']
    });

    await alert.present();
  }
  register(email, password, name, gender) {
    if (email != "" && password != "" && name != "") {
      this.authService.register(email, password, name, gender).subscribe((successData) => {
        if (successData.status == "success") {
          this.presentAlert("Registration Success");
        } else {
          this.presentAlert(successData.message);
        }

      }, (error) => console.log(error))
    } else {
      this.presentAlert("Please fill all fields")
    }
  }

}
