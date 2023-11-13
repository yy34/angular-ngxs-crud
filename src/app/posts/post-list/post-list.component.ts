import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetPosts, DeletePost } from '../../state/post.action';
import { Post } from '../../models/post.model';
import { PostState } from '../../state/post.state';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.sass'],
})
export class PostListComponent implements OnInit {
  @Select(PostState.getPosts) posts$: Observable<Post[]> | any;
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(new GetPosts());
  }
  onDeletePost(id: number): void {
    this.store.dispatch(new DeletePost(id));
  }
  trackById(index: number, post: Post): number {
    console.log('test',post);
    return post.id;
  }
}
