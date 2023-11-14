import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { PostState } from './state/post.state';
import { PostService } from './services/post.service';
import { AppComponent } from './app.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostDetailsComponent } from './posts/post-details/post-details.component';
import { PostFormComponent } from './posts/post-form/post-form.component';
@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,PostDetailsComponent,PostFormComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([PostState]),
  ],
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
