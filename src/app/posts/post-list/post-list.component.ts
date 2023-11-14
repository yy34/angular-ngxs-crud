import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetPosts, DeletePost } from '../../state/post.action';
import { Post } from '../../models/post.model';
import { PostState } from '../../state/post.state';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.sass'],
})

export class PostListComponent implements OnInit {
  showPostForm = false;
  editingPost: Post | null = null;

  openPostForm(post?: Post) {
    this.showPostForm = true;
    this.editingPost = post !== undefined ? post : null;
  }

  closeForm() {
    this.showPostForm = false;
  }
  @Select(PostState.getPosts) posts$: Observable<Post[]> | any;
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(new GetPosts());
  }
  onDeletePost(id: number): void {
    this.store.dispatch(new DeletePost(id));
  }
  trackById(index: number, post: Post): number {
    return post.id;
  }
}
