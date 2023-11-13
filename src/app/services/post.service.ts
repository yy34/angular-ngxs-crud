import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  private makeRequest<T>(method: string, endpoint: string, data?: any): Observable<T> {
    const url = `${this.apiUrl}/${endpoint}`;
    let request: Observable<T>;

    switch (method.toLowerCase()) {
      case 'get':
        request = this.http.get<T>(url);
        break;
      case 'post':
        request = this.http.post<T>(url, data);
        break;
      case 'put':
        request = this.http.put<T>(url, data);
        break;
      case 'delete':
        request = this.http.delete<T>(url);
        break;
      default:
        throw new Error(`Invalid HTTP method: ${method}`);
    }

    return request.pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse): Observable<any> {
    console.error('API Error:', error);
    return of('An unexpected error occurred. Please try again later.');
  }
  getPosts(): Observable<Post[]> {
    return this.makeRequest('GET', '');
  }

  getPost(id: number): Observable<Post> {
    return this.makeRequest('GET', id.toString());
  }

  addPost(post: Post): Observable<Post> {
    return this.makeRequest('POST', '', post);
  }

  updatePost(id: number, post: Partial<Post>): Observable<any> {
    return this.makeRequest('PUT', id.toString(), post);
  }

  deletePost(id: number): Observable<any> {
    return this.makeRequest('DELETE', id.toString());
  }
}
