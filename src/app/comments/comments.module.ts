import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CommentsPage } from './comments.page';
import { CommentPopoverPageModule } from '../comment-popover/comment-popover.module';
import { CommentPopoverPage } from '../comment-popover/comment-popover.page';

const routes: Routes = [
  {
    path: '',
    component: CommentsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommentPopoverPageModule
  ],
  entryComponents: [CommentPopoverPage],
  declarations: [CommentsPage]
})
export class CommentsPageModule { }
