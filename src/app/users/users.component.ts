import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../api.service';
import {FormControl, FormGroup, Validators, ReactiveFormsModule} from "@angular/forms";
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {
  validatingForm: FormGroup;
  updateUser: FormGroup;
  users = {};
  usersRaw = {};
  userToDelete;
  userToUpdate;
  objectKeys = Object.keys;
  objectValues = Object.values;
  jsn = JSON;
  policies;
  updateStatusValues = ['enabled','disabled'];

  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  previous: string;

  searchText: string = '';

  constructor(private apiService: ApiService, private cdRef: ChangeDetectorRef, private toastr: ToastrService) { }

  @HostListener('input') oninput() {
    if(event && event['target'] !== undefined && event.target["id"] !== undefined && event.target["id"] == "search"){
       this.searchItems();
    }
  }

  ngOnInit() {
  	this.getListOfUsers()
  	this.getListOfPolicies()
    this.resetForm()
    this.updateUserFrom()
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

  get accessKeyUpdate() {
    return this.updateUser.get('accessKeyUpdate');
  }

  get secretKeyUpdate() {
    return this.updateUser.get('secretKeyUpdate');
  }

  get policyUpdate() {
    return this.updateUser.get('policyUpdate');
  }

  get statusUpdate() {
    return this.updateUser.get('statusUpdate');
  }

  private updateUserFrom(){
    this.updateUser = new FormGroup({
      accessKeyUpdate: new FormControl({value: '', disabled: true}, Validators.required),
      secretKeyUpdate: new FormControl(''),
      policyUpdate: new FormControl('', Validators.required),
      statusUpdate: new FormControl('', Validators.required)
    });
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
      this.usersRaw = data;
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
        if(data["Success"]){
          this.toastr.success('User: '+userAccess+' with policy '+userPolicy+' has been created', 'Success');
        }else{
          this.toastr.success(JSON.stringify(data), 'Error while creating user');
        }
	    });
  	}else{
  		this.apiService.addUser(userAccess,userSecret).subscribe((data)=>{
	      console.log(data);
	      this.getListOfUsers();
        if(data["Success"]){
          this.toastr.success('User: '+userAccess+' has been created', 'Success');
        }else{
          this.toastr.success(JSON.stringify(data), 'Error while creating user');
        }
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
      if(data["Success"]){
          this.toastr.success('User: '+accessKey+' status has changed to '+status, 'Success');
      }else{
        this.toastr.success(JSON.stringify(data), 'Error while changing state for user');
      }
      this.getListOfUsers();
    });
  }

  private deleteUserPrepare(accessKey){
  	this.userToDelete = accessKey
  }

  private updateUserPrepare(accessKey){
    this.userToUpdate = accessKey
    this.updateUser.patchValue({'accessKeyUpdate': accessKey});
    if(this.usersRaw[accessKey]['policyName']){
      this.updateUser.patchValue({'policyUpdate': this.usersRaw[accessKey]['policyName']});
    }
    if(this.usersRaw[accessKey]['status']){
      this.updateUser.patchValue({'statusUpdate': this.usersRaw[accessKey]['status']});
    }
    console.log(this.usersRaw[accessKey])
  }

  private updateGenNewPassword(){
    this.updateUser.patchValue({'secretKeyUpdate': this.generatePassword(24)});
  }

  private updateUserSave(){
    var updatedSecret = this.updateUser.value.secretKeyUpdate;
    var updatedPolicy = this.updateUser.value.policyUpdate;
    var updatedStatus = this.updateUser.value.statusUpdate;

    this.apiService.updateUser(this.userToUpdate,updatedSecret,updatedPolicy,updatedStatus).subscribe((data)=>{
        console.log(data);
        this.getListOfUsers();
        if(data["Success"]){
          this.toastr.success('User: '+this.userToUpdate+' has been updated', 'Success');
        }else{
          this.toastr.success(JSON.stringify(data), 'Error while updating user');
        }
    });
  }


  private deleteUser(){
  	this.apiService.deleteUser(this.userToDelete).subscribe((data)=>{
      console.log(data);
      if(data["Success"]){
          this.toastr.success('User: '+this.userToDelete+' has been deleted', 'Success');
        }
      this.updateUserFrom();
      this.getListOfUsers();
    });
  }

}
