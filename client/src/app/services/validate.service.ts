import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  //Validate Name................
  validateName(name: String) {
    const nameregex = /^[a-zA-Z '.-]*$/;
    return nameregex.test(String(name));
  }

  //Validate Email Id.....................
  validateEmail(email: String) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  }

  //Validate Username
  validateUsername(username: String) {
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    return usernameRegex.test(String(username).toLowerCase());
  }
}
