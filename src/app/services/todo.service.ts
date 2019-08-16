import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/Http';
import { Observable } from 'rxjs';
import { Todo } from '../models/Todo';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TodoService {

todosUrl = 'https://jsonplaceholder.typicode.com/todos';

todosLimit = '?_limit=5';

  constructor(private httpClient: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(`${this.todosUrl}${this.todosLimit}`);
  }

  deleteTodo(todo: Todo): Observable<Todo>{

    const url = `${this.todosUrl}/${todo.id}`;
    return this.httpClient.delete<Todo>(url, httpOptions);
  }

  toggleCompleted(todo: Todo): Observable<any> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.httpClient.put(url, todo, httpOptions);
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.httpClient.post<Todo>(this.todosUrl, todo, httpOptions);
  }
}
