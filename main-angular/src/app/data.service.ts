import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

// import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { FamilyMember } from './family-member';
import { Task } from './task';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  getHomeMembers(): Observable<FamilyMember[]> {
    return this.http.get<FamilyMember[]>("/familyMember");
  }
  getTodoList(): Observable<Task[]> {
    return this.http.get<Task[]>("/task");
  }

  addTodoList(task:Task): Observable<any> {
    return this.http.post('/task', task);
  }

  getMembers(): Observable<any> {
    return this.http.get('/member');
  }

  getMemberById(memberId: number): Observable<any> {
    return this.http.get(`/member/${memberId}`);
  }

  getCarById(carId: number): Observable<any> {
    return this.http.get(`/car/${carId}`);
  }


}
