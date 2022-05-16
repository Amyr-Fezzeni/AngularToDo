import { User } from "../models/user";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ITask } from "../models/task";

export class AppService{
    static user?: User;
    // static http: HttpClient;
    static tasks : ITask [] = [];
    static inProgress  : ITask [] = [];
    static done : ITask [] = [];
    static users : User[] = [];
    constructor(){}
    static tasksB: ITask[] = [];
    static inProgressB  : ITask [] = [];
    static doneB : ITask [] = [];
    static userB? : User;

    static async login(email:String, password:String) {
    
        // let data = await AppService.http.get('http://127.0.0.1:5000/login?email=anotique@gmail.com&password=login');
        if (email=="anotique@gmail.com" && password == "login"){
          
              this.users.push({
                name:"amyr fezzeni",
                email:"anotique@gmail.com",
                password:"login"
            });
                  this.user = {
                    name:"amyr fezzeni",
                    email:"anotique@gmail.com",
                    password:"login"
                };
              
              this.tasks = [
                  {
                      description:"profile screen ui",
                      done:false
                    },
                    {
                      description:"add user to board",
                      done:false
                    },
                
              ];
              this.inProgress = [
                  {
                      description:"api update card",
                      done:false
                    }, {
                      description:"api delete card",
                      done:false
                    },
                    {
                      description:"api post card",
                      done:false
                    },
                    {
                      description:"api get all cards",
                      done:false
                    }
              ];
              this.done = [
                  {
                      description:"login page ui",
                      done:false
                    },
                    {
                      description:"Home page ui",
                      done:false
                    }
              ];return true;
            }else if (email== this.userB?.email && password == this.userB.password){
              this.tasks = this.tasksB;
              this.inProgress = this.inProgressB;
              this.done = this.doneB;
              this.users = [this.userB, {
                name:"amyr fezzeni",
                email:"anotique@gmail.com",
                password:"login"
            }] ;
              return true;
            }
            
         
            return false;
        
    }

    static signUp(name:String, email:String, password:String){
      this.user = ({name:name,email:email,password:password});
      this.users = [this.user];
      this.userB = this.user;
      this.tasks = [];
      this.inProgress = [];
      this.done = [];
      return true;
    }
    static logOut(){
        this.user = undefined;
        this.users = [];
    }
    
}