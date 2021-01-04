import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../modal/Modal';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  progressBar = false;
  user: User = {} as User;
  username: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.username = this.userService.getUsername();
    if(this.username!=null) {
      this.userService.findUserByUsername(this.username).subscribe(user => {
        this.user = user;
        this.username = user.username;
      });
    }
  }

  onSubmit() {
    this.userService.findUserByUsername(this.user.username).subscribe(user => {
     if(this.user.username=='admin' && this.user.password == 'admin' 
     || this.user.username=='drmas' && this.user.password == 'drmas') {
       if(this.user!=null) {
         this.user.admin = true;
         this.userService.addUser(this.user).subscribe(addUser => {
           this.user = addUser;
           this.router.navigate(['/dashboard/', this.user.username]);
           this.userService.saveUsername(this.user.username);
         });
       }
       
     } else {
        if(this.user!=null) {
         this.user.admin = false;
         this.userService.addUser(this.user).subscribe(addUser => {
           this.user = addUser;
           this.userService.saveUsername(this.user.username);
           this.router.navigate(['/home/', this.user.username]);
         });
       }    
     }
 });
 
   }

  /*
  onSubmit() {
    this.progressBar = true;
    if(this.user.username!=null) {
    if(this.user.username == 'admin' && this.user.password == 'admin') {
      this.userService.addUser(this.user).subscribe(user => {
        this.user = user;
        this.router.navigate(['/dashboard/', this.user.username]);
      });
    } else {
      this.userService.addUser(this.user).subscribe(user => {
        this.user = user;
        this.router.navigate(['/home/', this.user.username]);
      });
    }
  } else {
    if(this.user.username == 'admin' && this.user.password == 'admin') {
      this.userService.editUser(this.user, this.user.id).subscribe(user => {
        this.user = user;
        this.router.navigate(['/dashboard/', this.user.username]);
      });
    } else {
      this.userService.editUser(this.user, this.user.id).subscribe(user => {
        this.user = user;
        this.router.navigate(['/home/', this.user.username]);
      });
    }
  }
  }
  */
}
