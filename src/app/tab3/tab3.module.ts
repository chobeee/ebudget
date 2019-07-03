import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { EditPage } from '../edit/edit.page';
import { CommentsPage } from '../comments/comments.page';
import { CommentsPageModule } from '../comments/comments.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }]),
    CommentsPageModule,
  ],
  entryComponents: [EditPage, CommentsPage],
  declarations: [Tab3Page, EditPage]
})
export class Tab3PageModule { }
