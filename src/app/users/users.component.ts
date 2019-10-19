import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../api.service';
import {FormControl, FormGroup, Validators, ReactiveFormsModule} from "@angular/forms";
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {
  validatingForm: FormGroup;
  users = {};
  userToDelete;
  objectKeys = Object.keys;
  objectValues = Object.values;
  jsn = JSON;
  policies;

  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  previous: string;

  searchText: string = '';

  constructor(private apiService: ApiService, private cdRef: ChangeDetectorRef) { }

  @HostListener('input') oninput() {
    if(event && event['target'] !== undefined && event.target["id"] !== undefined && event.target["id"] == "search"){
       this.searchItems();
    }
  }

  ngOnInit() {
  	this.getListOfUsers()
  	this.getListOfPolicies()
    this.resetForm()
  }

  searchItems() {
    console.log(this.searchText)
    const prev = this.mdbTable.getDataSource();

    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.users = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.users = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(10);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
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
      console.log(data)
      const arrayOfUsers = Object.entries(data).map((e) => ( { [e[0]]: e[1] } ));
      this.users = arrayOfUsers;
      this.mdbTable.setDataSource(arrayOfUsers);
      console.log(arrayOfUsers)
      this.previous = this.mdbTable.getDataSource();
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
