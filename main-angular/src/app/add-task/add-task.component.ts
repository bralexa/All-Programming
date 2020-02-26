import { Component, OnInit } from '@angular/core';
import { FamilyMember } from '../family-member';
import { DataService } from 'src/app/data.service';
import { Task } from '../task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  private familyMembers: FamilyMember[] = [];
  private task: Task = new Task();
  private fMember: FamilyMember = new FamilyMember();
  error: any;
  headers: string[];

  constructor(private data: DataService) { }

  ngOnInit() {
    this.initalizeFamilyMembersList();
    this.fMember.nickname = 'Select family member';
  }


  initalizeFamilyMembersList():void{
    this.data.getHomeMembers()
    .subscribe(resp => {
        resp.forEach(member => {
          this.familyMembers.push(new FamilyMember(member));
        });
    },
    error => { console.log(error); this.error = error} // error path
  );
  }


  setSelectedFamilyMember(id, name)
  {
    this.task.fMemberId = id;
    this.fMember.nickname = name;
    this.fMember.id = id;

  }

  setFamilyMember(event ,val ):void{
    this.task.fMemberId = val;
  }

  addTodoList():void{
    this.data.addTodoList(this.task)
    .subscribe(resp => {
      console.log(resp);
      alert('Task added successfully :)');

    },
    error => { console.log(error); this.error = error} // error path
  );
  }
}
