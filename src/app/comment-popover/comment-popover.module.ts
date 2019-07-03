import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CommentPopoverPage } from './comment-popover.page';
import { EditCommentPage } from '../edit-comment/edit-comment.page';
import { EditCommentPageModule } from '../edit-comment/edit-comment.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditCommentPageModule
  ],
  entryComponents: [EditCommentPage],
  declarations: [CommentPopoverPage]
})
export class CommentPopoverPageModule { }
