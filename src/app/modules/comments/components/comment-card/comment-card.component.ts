import { Component, Input, OnInit } from '@angular/core';
import { DeleteActionService } from 'src/app/modules/comments/services/delete-action.service';
import { ReplyActionService } from 'src/app/modules/comments/services/reply-action.service';
import { UserProviderService } from 'src/app/modules/auth/services/user-provider.service';
import { CommentI } from 'src/app/modules/data/models/comment-i';
import { UserI } from 'src/app/modules/data/models/user-i';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.css'],
})
export class CommentCardComponent implements OnInit {
  constructor(
    private _reply: ReplyActionService,
    private _delete: DeleteActionService,
    private _user: UserProviderService
  ) {}
  @Input() comment!: CommentI;

  ownComment!: boolean;
  isReplying: boolean = false;

  ngOnInit(): void {
    this._user.currentUser.subscribe(
      (user: UserI) =>
        (this.ownComment = user.username === this.comment.user.username)
    );

    this._reply.replyingTo.subscribe((commentR: CommentI) => {
      this.isReplying = commentR.id === this.comment.id;
    });
  }

  replyComment() {
    this._reply.replyTo(this.comment.id || 0);
  }

  deleteComment() {
    this._delete.delete(this.comment.id || 0);
  }
}
