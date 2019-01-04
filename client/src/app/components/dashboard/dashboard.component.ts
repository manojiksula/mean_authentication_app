import { Component, OnInit } from '@angular/core';

import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.fetchLocalUser();
  }

  fetchLocalUser() {
    this.authService.getDashBoard().subscribe((data) => {
      this.user = data;
    });
  }
}
