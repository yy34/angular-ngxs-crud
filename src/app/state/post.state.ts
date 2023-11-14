import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { GetPosts, AddPost, UpdatePost, DeletePost } from './post.action';
import { PostService } from '../services/post.service';
import { tap } from 'rxjs/operators';
import { Post } from '../models/post.model';

export class PostStateModel {
  posts: Post[] = [];
}

@State<PostStateModel>({
  name: 'posts',
  defaults: {
    posts: []
  },
})
@Injectable()
export class PostState {
  constructor(private postService: PostService) {}

  @Selector()
  static getPosts(state: PostStateModel): Post[] {
    return state.posts;
  }

  @Action(GetPosts)
  getPosts(ctx: StateContext<PostStateModel>) {
    return this.postService.getPosts().pipe(
      tap((posts) => {
        ctx.patchState({ posts });
      })
    );
  }


  @Action(AddPost)
  addPost(ctx: StateContext<PostStateModel>, { payload }: AddPost) {
    return this.postService.addPost(payload).pipe(
      tap((post) => {
        const state = ctx.getState();
        ctx.patchState({ posts: [...state.posts, post] });
      })
    );
  }

  @Action(UpdatePost)
  updatePost(ctx: StateContext<PostStateModel>, { id, payload }: UpdatePost) {
    return this.postService.updatePost(id, payload).pipe(
      tap(() => {
        const state = ctx.getState();
        const updatedPosts = state.posts.map((post) => (post.id === id ? { ...post, ...payload } : post));
        ctx.patchState({ posts: updatedPosts });
      })
    );
  }

  @Action(DeletePost)
  deletePost(ctx: StateContext<PostStateModel>, { id }: DeletePost) {
    return this.postService.deletePost(id).pipe(
      tap(() => {
        const state = ctx.getState();
        const filteredPosts = state.posts.filter((post) => post.id !== id);
        ctx.patchState({ posts: filteredPosts });
      })
    );
  }
}
