import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TransactionPage } from './transaction.page';
import { CategoriesPageModule } from '../categories/categories.module';
import { CategoriesPage } from '../categories/categories.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriesPageModule
  ],
  declarations: [TransactionPage],
  entryComponents: [CategoriesPage]
})
export class TransactionPageModule { }
