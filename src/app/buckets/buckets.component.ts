import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../api.service';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-buckets',
  templateUrl: './buckets.component.html',
  styleUrls: ['./buckets.component.scss']
})
export class BucketsComponent implements OnInit,  AfterViewInit  {
  objectKeys = Object.keys;
  buckets = {};
  bucketToDelete;
  newBucketName = "";

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
  	this.getBuckets()
  }

  private searchItems() {
    console.log('callled')
    const prev = this.mdbTable.getDataSource();

    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.buckets = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.buckets = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(10);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  private getBuckets(){
  	this.apiService.getBuckets().subscribe((data)=>{
      console.log(data);
      this.buckets = data;
      this.mdbTable.setDataSource(this.buckets);
      this.previous = this.mdbTable.getDataSource();
    });
  }

  private deleteBucketPrepare(bucketName){
  	this.bucketToDelete = bucketName;
  }

  private deleteBucket(){
  	this.apiService.deleteBucket(this.bucketToDelete).subscribe((data)=>{
      console.log(data);
      if(data["Success"]){
        this.toastr.success('Bucket has been deleted', 'Success');
      }else{
        this.toastr.success(JSON.stringify(data), 'Error while deleting bucket');
      }
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
      if(data["Success"]){
        this.toastr.success('Bucket: '+bucket+' has been created', 'Success');
      }else{
        this.toastr.success(JSON.stringify(data), 'Error while creating bucket');
      }
      this.getBuckets();
    });
  }

}
