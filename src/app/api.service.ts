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

  public diskInfo(){
    return this.httpClient.get(this.baseUrl+'/api/v1/disk-info');
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

  public getBucketsExtended(){
    return this.httpClient.get(this.baseUrl+'/api/v1/list-buckets-extended');
  }

  public enableNotificationForBucket(bucket, stsARN, eventTypes, filterPrefix, filterSuffix){
    //put,get,delete
    let form = new FormData();

    form.append('bucket', bucket);
    form.append('stsARN', stsARN);
    form.append('eventTypes', eventTypes);
    form.append('filterPrefix', filterPrefix);
    form.append('filterSuffix', filterSuffix);

    return this.httpClient.post(this.baseUrl+'/api/v1/set-bucket-events', form)
  }

  public getBucketEvents(bucket){
    let form = new FormData();

    form.append('bucket', bucket);
    return this.httpClient.post(this.baseUrl+'/api/v1/get-bucket-events',form)
  }

  public removeBucketEvents(bucket){
    let form = new FormData();

    form.append('bucket', bucket);
    return this.httpClient.post(this.baseUrl+'/api/v1/remove-bucket-events',form)
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

  public setLifecycle(bucketName,lifecycle){
    let form = new FormData();

    form.append('bucketName', bucketName);
    form.append('lifecycle', lifecycle);

    return this.httpClient.post(this.baseUrl+'/api/v1/set-bucket-lifecycle', form);
  }


  public getLifecycle(bucketName){
    let form = new FormData();

    form.append('bucketName', bucketName);

    return this.httpClient.post(this.baseUrl+'/api/v1/get-bucket-lifecycle', form);
  }

  public checkAuthStatus(){
    return this.httpClient.get(this.baseUrl+'/auth/check');
  }

}
