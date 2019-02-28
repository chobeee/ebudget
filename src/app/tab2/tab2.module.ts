import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { BudgetPageModule } from '../modals/budget/budget.module';
import { BudgetPage } from '../modals/budget/budget.page';
import { TransactionPageModule } from '../modals/transaction/transaction.module';
import { TransactionPage } from '../modals/transaction/transaction.page';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    BudgetPageModule,
    TransactionPageModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }])
  ],
  declarations: [Tab2Page],
  entryComponents: [BudgetPage, TransactionPage],
})
export class Tab2PageModule { }
