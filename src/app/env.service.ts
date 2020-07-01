import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class EnvService {

  // The values that are defined here are the default values that can
  // be overridden by env.js

  // API url
  public apiBaseUrl = '';
  public apiMultiBackend = false;
  public apiBackends = '';

  constructor() {
  }

}
