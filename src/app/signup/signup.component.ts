import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../services/appService';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm !: FormGroup;
  name:String="";
  email:String = "";
  password:String = "";
  wrongPassword: boolean =false;
  constructor(private router: Router,private fb : FormBuilder, private http:HttpClient) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email : ['', Validators.required],
      password : ['', Validators.required],
      name : ['', Validators.required]
    })
  }
async signup(){
  this.name = this.signupForm.value.name;
  this.email = this.signupForm.value.email;
  this.password = this.signupForm.value.password;
  let data =  AppService.signUp(this.name,this.email, this.password);
  console.log(data);
  if (data){
     this.router.navigate(["home"]);
  }else{
    this.wrongPassword = true;
  }
}

}
