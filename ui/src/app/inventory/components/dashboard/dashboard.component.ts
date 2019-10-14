import { Component, OnInit } from '@angular/core';
import { AppWebUrls, HttpRequestHandlerService, Endpoints } from 'src/app/core';
import { HttpResponse } from '@angular/common/http';
import { Dashboard } from '../../models/dashboard';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public appWebUrls = AppWebUrls;
  dashboardData: Dashboard;
  constructor(private httpReqHandlerService: HttpRequestHandlerService) {
  }

  ngOnInit() {
    this.getDashboardData();
  }

  private getDashboardData() {
    this.httpReqHandlerService.get<Dashboard>(Endpoints.dashboard).pipe().subscribe(
      (response: HttpResponse<Dashboard>) => {
      if (response.ok) {
          this.dashboardData = response.body;
      }
    });
  }
}
