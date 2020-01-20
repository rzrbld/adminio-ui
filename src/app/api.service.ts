import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  baseUrl = environment.apiBaseUrl;

  public serverInfo(){
    return this.httpClient.get(this.baseUrl+'/api/v1/server-info');
  }

  public getUsers(){
    return this.httpClient.get(this.baseUrl+'/api/v1/list-users');
  }

  public addUser(access,secret){
    let form = new FormData();

    form.append('accessKey', access);
    form.append('secretKey', secret);

    return this.httpClient.post(this.baseUrl+'/api/v1/add-user', form)
  }

  public addUserExtended(access,secret,policy){
    let form = new FormData();

    form.append('accessKey', access);
    form.append('secretKey', secret);
    form.append('policyName', policy);

    return this.httpClient.post(this.baseUrl+'/api/v1/create-user-extended', form)
  }

  public updateUser(access,secret,policy,status){
    let form = new FormData();

    form.append('accessKey', access);
    form.append('secretKey', secret);
    form.append('policyName', policy);
    form.append('status', status);

    return this.httpClient.post(this.baseUrl+'/api/v1/set-user', form)
  }


  public setStatusUser(access,status){
    let form = new FormData();

    form.append('accessKey', access);
    form.append('status', status);

    return this.httpClient.post(this.baseUrl+'/api/v1/set-status-user', form)
  }

  public deleteUser(access){
    let form = new FormData();

    form.append('accessKey', access);

    return this.httpClient.post(this.baseUrl+'/api/v1/delete-user', form)
  }

  public getPolicies(){
    return this.httpClient.get(this.baseUrl+'/api/v1/list-policies');
  }

  public deletePolicy(policy){
    let form = new FormData();

    form.append('policyName', policy);

    return this.httpClient.post(this.baseUrl+'/api/v1/delete-policy', form)
  }

  public addPolicy(policyName, policyString){
    let form = new FormData();

    form.append('policyName', policyName);
    form.append('policyString', policyString);

    return this.httpClient.post(this.baseUrl+'/api/v1/add-policy', form)
  }

  public getBuckets(){
    return this.httpClient.get(this.baseUrl+'/api/v1/list-buckets');
  }

  public deleteBucket(bucket){
    let form = new FormData();

    form.append('bucketName', bucket);

    return this.httpClient.post(this.baseUrl+'/api/v1/delete-bucket', form)
  }

  public createBucket(bucket){
    let form = new FormData();

    form.append('newBucket', bucket);

    return this.httpClient.post(this.baseUrl+'/api/v1/make-bucket', form)
  }

  public getGroups(){
    return this.httpClient.get(this.baseUrl+'/api/v1/list-groups');
  }

  public updateMembersGroup(group,members,IsRemove){
    let form = new FormData();

    form.append('group', group);
    form.append('members', members);
    form.append('IsRemove', IsRemove);

    return this.httpClient.post(this.baseUrl+'/api/v1/update-members-group', form);
  }

  public getGroupDescription(group){
    let form = new FormData();

    form.append('group', group);

    return this.httpClient.post(this.baseUrl+'/api/v1/get-description-group', form);
  }

  public setStatusGroup(group,status){
    let form = new FormData();

    form.append('group', group);
    form.append('status', status);

    return this.httpClient.post(this.baseUrl+'/api/v1/set-status-group', form);
  }

  public setPolicy(policyName,entityName,isGroup){
    let form = new FormData();

    form.append('policyName', policyName);
    form.append('entityName', entityName);
    form.append('isGroup', isGroup);

    return this.httpClient.post(this.baseUrl+'/api/v1/set-policy', form);
  }

}
