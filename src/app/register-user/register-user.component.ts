import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../services/appService';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {
  loginForm !: FormGroup;
  email:String = "";
  password:String = "";
  wrongPassword: boolean =false;
  constructor(private router: Router,private fb : FormBuilder, private http:HttpClient) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email : ['', Validators.required],
      password : ['', Validators.required]
    })
  }

  async login() {
    // this.http.get<any>('http://127.0.0.1:5000/login')
    // .subscribe((response)=> {
    //   alert(JSON.stringify(response))
    // })
    this.email = this.loginForm.value.email;
    this.password = this.loginForm.value.password;
    console.log(this.email);
    console.log(this.password);
    let data = await  AppService.login(this.email, this.password);
    console.log(data);
    if (data){
       this.router.navigate(["home"]);
    }else{
      this.wrongPassword = true;
    }
  }

}
