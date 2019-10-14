// Angular imports
import { Component, OnInit } from '@angular/core';

// Custom imports
import { AppWebUrls } from '../models/app-web-urls';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.scss']
})
export class HostComponent implements OnInit {
  public appWebUrls = AppWebUrls;
  constructor() { }

  ngOnInit() {
  }

}
