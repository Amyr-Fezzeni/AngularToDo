import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validator, Validators} from '@angular/forms';
import { ITask } from '../models/task';
import { User } from '../models/user';
import { AppService } from '../services/appService';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todoForm !: FormGroup;
  tasks : ITask [] = AppService.tasks;
  inProgress  : ITask [] = AppService.inProgress;
  done : ITask [] = AppService.done;
  username:String="";
  updateId: any;
  isEditEnabled: boolean = false;
  user?:User;
  users:User[]= AppService.users;
  constructor(private fb : FormBuilder) {
    this.user = AppService.user;
   }

  ngOnInit(): void {
  this.todoForm = this.fb.group({
    item : ['', Validators.required]
  })
  }
  addUser(){
    this.users.push({name:"admin",email:"",password:""});
  }
  addTask(){
    this.tasks.push({
      description:this.todoForm.value.item,
      done:false
    });
    this.todoForm.reset()
    this.saveData();
  }
  deleteTask(i : number){
    this.tasks.splice(i,1);
    this.saveData();
    
  }
  deleteInProgressTask(i : number){
    this.inProgress.splice(i,1);
    this.saveData();
  }
  deleteDoneTask(i : number){
    this.done.splice(i,1);
    this.saveData();
  }
  editTask(item: ITask,i : number){
    this.todoForm.controls['item'].setValue(item.description);
    this.updateId = i;
    this.isEditEnabled = true;
    this.saveData();
   
  }
  updateTask(){
    this.tasks[this.updateId].description = this.todoForm.value.item;
    this.tasks[this.updateId].done = false;
    this.todoForm.reset();
    this.updateId = undefined;
    this.isEditEnabled = false;
    this.saveData();
  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  this.saveData();
  }
    saveData(){
      AppService.tasksB = this.tasks;
      AppService.inProgressB = this.inProgress;
      AppService.doneB = this.done;
    }
}
