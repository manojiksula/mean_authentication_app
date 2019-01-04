import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { NgFlashMessageService } from "ng-flash-messages";

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(
    private router: Router,
    private flashMessage: NgFlashMessageService
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('access_token')) {
      return true;
    }

    this.flashMessage.showFlashMessage({
      messages: ['Please login first!'],
      dismissible: true,
      timeout: 5000,
      type: 'danger'
    });
    this.router.navigate(['auth']);
  }

}
