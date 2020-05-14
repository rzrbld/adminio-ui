import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  baseUrl = environment.apiBaseUrl;
  multiBackend = environment.apiMultiBackend;
  backendsUrls = environment.apiBackends;

  public overrideBackend(newBackend){
    this.baseUrl = environment.apiBaseUrl;
  }

  public getMultiBackendStatus(){
    return this.multiBackend;
  }

  public getBackendsUrls(){
    return this.backendsUrls;
  }

  public validateAuthInResponse(data){
    if(data != null && typeof data.oauth != "undefined" && typeof data.auth != "undefined" && data.oauth != false && data.auth != true){
      window.location.href = environment.apiBaseUrl+'/auth/?state='+window.location.href;
    }
  }

  public serverInfo(){
    return this.httpClient.get(this.baseUrl+'/api/v2/server/common-info');
  }

  public diskInfo(){
    return this.httpClient.get(this.baseUrl+'/api/v2/server/disk-info');
  }

  public getUsers(){
    return this.httpClient.get(this.baseUrl+'/api/v2/users/list');
  }

  public addUser(access,secret){
    let form = new FormData();

    form.append('accessKey', access);
    form.append('secretKey', secret);

    return this.httpClient.post(this.baseUrl+'/api/v2/user/create', form)
  }

  public addUserExtended(access,secret,policy){
    let form = new FormData();

    form.append('accessKey', access);
    form.append('secretKey', secret);
    form.append('policyName', policy);

    return this.httpClient.post(this.baseUrl+'/api/v2/user/create-extended', form)
  }

  public updateUser(access,secret,policy,status){
    let form = new FormData();

    form.append('accessKey', access);
    form.append('secretKey', secret);
    form.append('policyName', policy);
    form.append('status', status);

    return this.httpClient.post(this.baseUrl+'/api/v2/user/update', form)
  }


  public setStatusUser(access,status){
    let form = new FormData();

    form.append('accessKey', access);
    form.append('status', status);

    return this.httpClient.post(this.baseUrl+'/api/v2/user/set-status', form)
  }

  public deleteUser(access){
    let form = new FormData();

    form.append('accessKey', access);

    return this.httpClient.post(this.baseUrl+'/api/v2/user/delete', form)
  }

  public getPolicies(){
    return this.httpClient.get(this.baseUrl+'/api/v2/policies/list');
  }

  public deletePolicy(policy){
    let form = new FormData();

    form.append('policyName', policy);

    return this.httpClient.post(this.baseUrl+'/api/v2/policy/delete', form)
  }

  public addPolicy(policyName, policyString){
    let form = new FormData();

    form.append('policyName', policyName);
    form.append('policyString', policyString);

    return this.httpClient.post(this.baseUrl+'/api/v2/policy/create', form)
  }

  public getBuckets(){
    return this.httpClient.get(this.baseUrl+'/api/v2/buckets/list');
  }

  public getBucketsExtended(){
    return this.httpClient.get(this.baseUrl+'/api/v2/buckets/list-extended');
  }

  public enableNotificationForBucket(bucket, stsARN, eventTypes, filterPrefix, filterSuffix){
    //put,get,delete
    let form = new FormData();

    form.append('bucket', bucket);
    form.append('stsARN', stsARN);
    form.append('eventTypes', eventTypes);
    form.append('filterPrefix', filterPrefix);
    form.append('filterSuffix', filterSuffix);

    return this.httpClient.post(this.baseUrl+'/api/v2/bucket/set-events', form)
  }

  public getBucketEvents(bucket){
    let form = new FormData();

    form.append('bucket', bucket);
    return this.httpClient.post(this.baseUrl+'/api/v2/bucket/get-events',form)
  }

  public removeBucketEvents(bucket){
    let form = new FormData();

    form.append('bucket', bucket);
    return this.httpClient.post(this.baseUrl+'/api/v2/bucket/remove-events',form)
  }

  public deleteBucket(bucket){
    let form = new FormData();

    form.append('bucketName', bucket);

    return this.httpClient.post(this.baseUrl+'/api/v2/bucket/delete', form)
  }

  public createBucket(bucket){
    let form = new FormData();

    form.append('newBucket', bucket);

    return this.httpClient.post(this.baseUrl+'/api/v2/bucket/create', form)
  }

  public getGroups(){
    return this.httpClient.get(this.baseUrl+'/api/v2/groups/list');
  }

  public updateMembersGroup(group,members,IsRemove){
    let form = new FormData();

    form.append('group', group);
    form.append('members', members);
    form.append('IsRemove', IsRemove);

    return this.httpClient.post(this.baseUrl+'/api/v2/group/update-members', form);
  }

  public getGroupDescription(group){
    let form = new FormData();

    form.append('group', group);

    return this.httpClient.post(this.baseUrl+'/api/v2/group/get-description', form);
  }

  public setStatusGroup(group,status){
    let form = new FormData();

    form.append('group', group);
    form.append('status', status);

    return this.httpClient.post(this.baseUrl+'/api/v2/group/set-status', form);
  }

  public setPolicy(policyName,entityName,isGroup){
    let form = new FormData();

    form.append('policyName', policyName);
    form.append('entityName', entityName);
    form.append('isGroup', isGroup);

    return this.httpClient.post(this.baseUrl+'/api/v2/policy/update', form);
  }

  public setLifecycle(bucketName,lifecycle){
    let form = new FormData();

    form.append('bucketName', bucketName);
    form.append('lifecycle', lifecycle);

    return this.httpClient.post(this.baseUrl+'/api/v2/bucket/set-lifecycle', form);
  }


  public getLifecycle(bucketName){
    let form = new FormData();

    form.append('bucketName', bucketName);

    return this.httpClient.post(this.baseUrl+'/api/v2/bucket/get-lifecycle', form);
  }

  public checkAuthStatus(){
    return this.httpClient.get(this.baseUrl+'/auth/check');
  }

}
