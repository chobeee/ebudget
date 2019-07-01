import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'tab', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'budget', loadChildren: './modals/budget/budget.module#BudgetPageModule' },
  { path: 'transaction', loadChildren: './modals/transaction/transaction.module#TransactionPageModule' },
  { path: 'categories', loadChildren: './modals/categories/categories.module#CategoriesPageModule' },  { path: 'edit', loadChildren: './edit/edit.module#EditPageModule' },
  { path: 'search-date', loadChildren: './modals/search-date/search-date.module#SearchDatePageModule' },
  { path: 'comments', loadChildren: './comments/comments.module#CommentsPageModule' },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
