import { Injectable } from '@angular/core';

import * as config from '../../../assets/config/config.json';

@Injectable({
  providedIn: 'root'
})
export class ConfigReaderService {
  constructor() { }

  get hospitalName() {
    return config.hospitalName;
  }

  get hospitalAddress() {
    return config.hospitalAddress;
  }
}
