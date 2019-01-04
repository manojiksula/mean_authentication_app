import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { NgFlashMessageService } from "ng-flash-messages";

import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  title: string;
  constructor(
    private router: Router,
    private flashMessage: NgFlashMessageService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.title = "MEAN AUTHENTICATION APP";
  }

  onHandleLogOut() {
    this.authService.logOutUser();
    this.flashMessage.showFlashMessage({
      messages: ['You are logged out!'],
      dismissible: true,
      timeout: 5000,
      type: 'success'
    });
    this.router.navigate(['']);
  }
}
