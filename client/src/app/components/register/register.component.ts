import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { NgFlashMessageService } from "ng-flash-messages";

import { ValidateService } from "../../services/validate.service";
import { AuthService } from "../../services/auth.service";

import { Post } from "../../models/post.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private router: Router,
    private flashMessage: NgFlashMessageService,
    private validateService: ValidateService,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  onHandleSubmit(form: NgForm) {
    if (form.invalid) {
      return false;
    }

    let user = {
      name: form.value.name,
      email: form.value.email,
      username: form.value.username,
      password: form.value.password
    };

    //Check for Invalid Name
    if (!this.validateService.validateName(user.name)) {
      this.flashMessage.showFlashMessage({
        messages: ['Invalid Name!'],
        dismissible: true,
        timeout: 5000,
        type: 'danger'
      });
      return false;
    }

    //Check for Invalid Email Id
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.showFlashMessage({
        messages: ['Invalid Email!'],
        dismissible: true,
        timeout: 5000,
        type: 'danger'
      });
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
    this.authService.registerUser(user).subscribe((data: Post) => {
      if (data.success) {
        this.flashMessage.showFlashMessage({
          messages: ['User Successfully Saved!'],
          dismissible: true,
          timeout: 5000,
          type: 'success'
        });
        this.router.navigate(['auth']);
        return true;
      } else {
        this.flashMessage.showFlashMessage({
          messages: ['Something Went Wrong!'],
          dismissible: true,
          timeout: 5000,
          type: 'danger'
        });
        this.router.navigate(['register']);
        return false;
      }
    });
  }
}
