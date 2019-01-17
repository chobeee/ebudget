import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      header: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  login(email, password) {
    if (email != "" && password != "") {
      this.authService.login(email, password).subscribe((successData) => {
        if (successData.message == "success") {
          localStorage.setItem("id", successData.id.toString());
          this.router.navigate(["tab"]);

        } else {
          this.presentAlert("Incorrect Email Or Password");
        }

      }, (error) => console.log(error));
    } else {
      this.presentAlert("Please fill all fields")
    }
  }

  register() {
    this.router.navigate(["register"]);
  }

}
