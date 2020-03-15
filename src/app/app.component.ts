import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Adminio-UI';

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  	this.checkAuthStatus()
  }

  private checkAuthStatus(){
    this.apiService.checkAuthStatus().subscribe((data)=>{
      console.log("DATA AUTH>>>", data);
      this.validateAuth(data)
    });
  }

  private validateAuth(data){
    if(data.oauth != false && data.auth != true){
      window.location.href = environment.apiBaseUrl+'/auth/?state='+window.location.href;
    }
  }
}
