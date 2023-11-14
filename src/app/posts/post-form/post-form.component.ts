import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AddPost,UpdatePost } from '../../state/post.action';
import { Post } from '../../models/post.model';
@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.sass'],
})
export class PostFormComponent {
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Input() editingPost: Post | null = null;
  postForm!: FormGroup;
  constructor(private fb: FormBuilder, private store: Store) {
  }
  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.postForm = this.fb.group({
      title: [this.editingPost ? this.editingPost.title : '', Validators.required],
      body: [this.editingPost ? this.editingPost.body : '', Validators.required],
      userId: [this.editingPost ? this.editingPost.userId : '1', Validators.required],
    });
  }
  onSubmit() {
    if (this.postForm.valid) {
      const postData: Partial<Post> = this.postForm.value;
      if (this.editingPost) {
        this.updatePost(this.editingPost.id, postData);
      } else {
        this.addNewPost(postData);
      }
      this.resetFormAndClose();
    }
  }
  addNewPost(newPostData: Partial<Post>): void {
    this.store.dispatch(new AddPost(newPostData));
  }
   updatePost(postId: number, updatedPostData: Partial<Post>): void {
    this.store.dispatch(new UpdatePost(postId, updatedPostData));
  }
   resetFormAndClose(): void {
    this.postForm.reset();
    this.closeModal.emit();
  }
}
