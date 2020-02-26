import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { TopNavComponent } from './top-nav/top-nav.component';
import { HttpClientModule } from '@angular/common/http';
import { TodoListComponent } from './todo-list/todo-list.component';
import { AddTaskComponent } from './add-task/add-task.component';


@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    TodoListComponent,
    AddTaskComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'todo-list',
          component: TodoListComponent
      },
      {
        path: 'add-task',
          component: AddTaskComponent
      }


  ])
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
