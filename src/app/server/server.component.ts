import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit {

  objectKeys = Object.keys;
  math = Math;
  servers;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  	this.serverInfo()
  }

  private serverInfo(){
  	this.apiService.serverInfo().subscribe((data)=>{
      console.log(data);
      this.servers = data;
    });
  }

}
