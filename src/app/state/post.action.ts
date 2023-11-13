import { Post } from '../models/post.model';

export class GetPosts {
  static readonly type = '[Post] Get Posts';
}

export class GetPost {
  static readonly type = '[Post] Get Post';
  constructor(public id: number) {}
}

export class AddPost {
  static readonly type = '[Post] Add Post';
  constructor(public payload: Post) {}
}

export class UpdatePost {
  static readonly type = '[Post] Update Post';
  constructor(public id: number, public payload: Partial<Post>) {}
}

export class DeletePost {
  static readonly type = '[Post] Delete Post';
  constructor(public id: number) {}
}
