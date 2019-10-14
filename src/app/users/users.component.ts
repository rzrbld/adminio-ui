import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {FormControl, FormGroup, Validators, ReactiveFormsModule} from "@angular/forms";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  validatingForm: FormGroup;
  users;
  userToDelete;
  objectKeys = Object.keys;
  policies;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  	this.getListOfUsers()
  	this.getListOfPolicies()
	this.resetForm()
  }

  get newUserAccess() {
	return this.validatingForm.get('newUserAccess');
  }

  get newUserSecret() {
	return this.validatingForm.get('newUserSecret');
  } 

  get newUserPolicy() {
	return this.validatingForm.get('newUserPolicy');
  } 

  private generatePassword(length) {
    var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }

    return retVal;
  }

  private resetForm(){
  	this.validatingForm = new FormGroup({
      newUserAccess: new FormControl(this.generatePassword(16), Validators.minLength(5)),
      newUserSecret: new FormControl(this.generatePassword(24), Validators.minLength(10)),
      newUserPolicy: new FormControl('',Validators.minLength(0))
    });
  }

  private getListOfUsers(){
  	this.apiService.getUsers().subscribe((data)=>{
      this.users = data;
    });
  }


  private getListOfPolicies(){
  	this.apiService.getPolicies().subscribe((data)=>{
      this.policies = Object.keys(data);
    });
  }

  private createUser(){
  	var userAccess = this.newUserAccess.value;
  	var userSecret = this.newUserSecret.value;
  	var userPolicy = this.newUserPolicy.value;

  	console.log(userPolicy)

  	if(userPolicy!=''){
  		this.apiService.addUserExtended(userAccess,userSecret,userPolicy).subscribe((data)=>{
	      console.log(data);
	      this.getListOfUsers();
	    });
  	}else{
  		this.apiService.addUser(userAccess,userSecret).subscribe((data)=>{
	      console.log(data);
	      this.getListOfUsers();
	    });
  	}
  }

  private setStatusUser(accessKey,status){
  	if(status == 'enabled'){
  		status = 'disabled'
  	}else{
  		status = 'enabled'
  	}
  	this.apiService.setStatusUser(accessKey,status).subscribe((data)=>{
      console.log(data);
      this.getListOfUsers();
    });
  }

  private deleteUserPrepare(accessKey){
  	this.userToDelete = accessKey
  }

  private deleteUser(){
  	this.apiService.deleteUser(this.userToDelete).subscribe((data)=>{
      console.log(data);
      this.getListOfUsers();
    });
  }

}
