import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

import { Task } from '../task';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  error: any;
  headers: string[];
  private todoList: Task[] = [];

  constructor(private data: DataService) { }

  ngOnInit() {

    this.getTodoList();
  }

  getTodoList()
  {
    this.data.getTodoList()
    .subscribe(resp => {
    // access the body directly, which is typed as `Child`.
    resp.forEach(task => {
      this.todoList.push(new Task(task));
    });
    },
    error => { console.log(error); this.error = error} // error path
  );
  }



}
