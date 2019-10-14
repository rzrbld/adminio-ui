import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-buckets',
  templateUrl: './buckets.component.html',
  styleUrls: ['./buckets.component.scss']
})
export class BucketsComponent implements OnInit {
  objectKeys = Object.keys;
  buckets = {};
  bucketToDelete;
  newBucketName = "";

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  	this.getBuckets()
  }

  private getBuckets(){
  	this.apiService.getBuckets().subscribe((data)=>{
      console.log(data);
      this.buckets = data;
    });
  }

  private deleteBucketPrepare(bucketName){
  	this.bucketToDelete = bucketName;
  }

  private deleteBucket(){
  	this.apiService.deleteBucket(this.bucketToDelete).subscribe((data)=>{
      console.log(data);
      this.getBuckets();
    });
  }

  private resetForm(){
  	this.newBucketName = "";
  }

  private createBucket(){
  	if(this.newBucketName.indexOf(',')>-1){
  		var bucketsArr = this.newBucketName.split(',')
  		for (var i = 0; i < bucketsArr.length; i++) {
  			if(bucketsArr[i]!=''){
  				this.createBucketSimple(bucketsArr[i])
  			}
  		}
  	}else{
  		this.createBucketSimple(this.newBucketName)
  	}
  }

  private createBucketSimple(bucket){
  	this.apiService.createBucket(bucket).subscribe((data)=>{
      console.log(data);
      this.getBuckets();
    });
  }

}
