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
import { SearchDatePage } from '../modals/search-date/search-date.page';
import { SearchDatePageModule } from '../modals/search-date/search-date.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    BudgetPageModule,
    SearchDatePageModule,
    TransactionPageModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }])
  ],
  declarations: [Tab2Page],
  entryComponents: [BudgetPage, TransactionPage, SearchDatePage],
})
export class Tab2PageModule { }
