import { Component, OnInit } from '@angular/core';
import { categories } from '../../data/categories';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  categories: any;
  constructor(private modalController: ModalController) { }

  ngOnInit() {
    //Get Categories
    console.log(categories)
    this.categories = categories;
  }

  selectCategory(selectedCategory) {

    this.modalController.dismiss(selectedCategory);

  }

  back() {
    this.modalController.dismiss({
      icon_src: "assets/icon/question.png",
      name: ""
    });
  }



}
