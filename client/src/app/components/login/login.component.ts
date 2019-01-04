import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { NgFlashMessageService } from "ng-flash-messages";

import { ValidateService } from "../../services/validate.service";
import { AuthService } from "../../services/auth.service";

import { User } from "../../models/user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private flashMessage: NgFlashMessageService,
    private validateService: ValidateService,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  onHandleSubmit(form: NgForm) {
    let user = {
      username: form.value.username,
      password: form.value.password
    };

    if (form.invalid) {
      return false;
    }

    //Check for Username
    if (!this.validateService.validateUsername(user.username)) {
      this.flashMessage.showFlashMessage({
        messages: ['Invalid Username!'],
        dismissible: true,
        timeout: 5000,
        type: 'danger'
      });
      return false;
    }

    //If there is no any errors then let's add user
    this.authService.authenticateUser(user).subscribe((data: User) => {
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.flashMessage.showFlashMessage({
          messages: ['You are logged in!'],
          dismissible: true,
          timeout: 5000,
          type: 'success'
        });
        this.router.navigate(['dashboard']);
      } else {
        this.flashMessage.showFlashMessage({
          messages: ['User not found!'],
          dismissible: true,
          timeout: 5000,
          type: 'danger'
        });
        this.router.navigate(['auth']);
      }
    });
  }
}
