import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
   
  constructor(private httpClient: HttpClient) { }

  baseUrl='http://localhost:8080';

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

}

