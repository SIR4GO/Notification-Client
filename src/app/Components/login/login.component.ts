import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {UserService} from '../../Services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:string;
  password:string;


  constructor(private userService: UserService ,private router: Router) {}

  ngOnInit() {
    const height = $(window).height();
    $('.body-background').height(height);

  }

  onSubmit(){
    // console.log(this.username);
    // console.log(this.password);
    this.userService.senderAuth(this.username , this.password).subscribe(
      (data) => {
        localStorage.setItem('userAuth' , data);
         this.router.navigate(['/']);
      } ,
      error1 => $('#error-msg').text( '*' + error1.error.message)
    );
  }



}
