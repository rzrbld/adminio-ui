import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { ApiService } from '../api.service';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-buckets',
  templateUrl: './buckets.component.html',
  styleUrls: ['./buckets.component.scss']
})
export class BucketsComponent implements OnInit,  AfterViewInit  {
  math = Math;
  objectKeys = Object.keys;
  isNaN: Function = Number.isNaN;
  buckets = {};
  bucketToDelete;
  bucketToRemoveNotifications;
  editBucketName;
  newBucketName = "";
  serviceInfo;
  diskUsageInfo;
  newBucketEventARN = "";
  updateBucketEventARN = "";
  updateBucketEventFilterPrefix = "";
  updateBucketEventFilterSuffix = "";

  dropdownEventTypesList = [];
  selectedEventTypes = [];
  dropdownEventTypesSettings = {};
  newBucketEventFilterPrefix = "";
  newBucketEventFilterSuffix = "";

  uploadLifecycleName;
  uploadLifecycleFile;
  uploadLifecycleFileName;
  lifecycleBucketName;
  downloadJsonHref;
  downloadLifecycleAvailable = 0;

  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  previous: string;

  searchText: string = '';

  constructor(private apiService: ApiService, private cdRef: ChangeDetectorRef, private toastr: ToastrService, private sanitizer: DomSanitizer) { }

  @HostListener('input') oninput() {
    if(event && event['target'] !== undefined && event.target["id"] !== undefined && event.target["id"] == "search"){
       this.searchItems();
    }
  }

  @ViewChild('uploadLifecycleFile', { static: true })
  uploadFileInput: any;

  ngOnInit() {
  	this.getBuckets()
    this.getServerInfo()
    this.getDiskInfo()

    this.dropdownEventTypesList = [
	    {"id":1,"itemName":"put"},
	    {"id":2,"itemName":"get"},
	    {"id":3,"itemName":"delete"},
    ];

    this.dropdownEventTypesSettings = {
  		singleSelection: false,
  		text:"Select Event Types",
  		selectAllText:'Select All',
  		unSelectAllText:'UnSelect All',
  		enableSearchFilter: true,
      classes: "dropdownFix"
	  };
  }

  //condition select actions
  onEventTypesItemSelect(item:any){
	    console.log(item);
	    console.log(this.selectedEventTypes);
	}
	onEventTypesItemDeSelect(item:any){
	    console.log(item);
	    console.log(this.selectedEventTypes);
	}
	onEventTypesSelectAll(items: any){
	    console.log(items);
	}
	onEventTypesDeSelectAll(items: any){
	    console.log(items);
	}


  private getServerInfo(){
    this.apiService.serverInfo().subscribe((data)=>{
      this.serviceInfo = data;
    });
  }

  private getDiskInfo(){
  	this.apiService.diskInfo().subscribe((data)=>{
      this.diskUsageInfo = data;
    });
  }

  private searchItems() {
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
  	this.apiService.getBucketsExtended().subscribe((data)=>{
      console.log("BUCKETS >>>>>>",data);
      if(data!==null){
        this.buckets = data;
      }else{
        this.buckets = {};
      }
      this.mdbTable.setDataSource(this.buckets);
      this.previous = this.mdbTable.getDataSource();
    });
  }

  private deleteBucketPrepare(bucketName){
  	this.bucketToDelete = bucketName;
  }

  private removeBucketNotificationPrepare(bucketName){
  	this.bucketToRemoveNotifications = bucketName;
  }

  private updateBucketPrepare(bucketName){
    this.editBucketName = bucketName;
  }

  private deleteBucket(){
  	this.apiService.deleteBucket(this.bucketToDelete).subscribe((data)=>{
      console.log(data);
      if(data["Success"]){
        this.toastr.success('Bucket has been deleted', 'Success');
      }else{
        this.toastr.error(JSON.stringify(data), 'Error while deleting bucket');
      }
      this.getBuckets();
    });
  }

  private resetForm(){
  	this.newBucketName = "";
    this.newBucketEventARN = "";
    this.newBucketEventFilterPrefix = "";
    this.newBucketEventFilterSuffix = "";
    this.selectedEventTypes = [];
  }

  private resetUpdateForm() {
    this.updateBucketEventARN = "";
    this.selectedEventTypes = [];
    this.updateBucketEventFilterPrefix = "";
    this.updateBucketEventFilterSuffix = "";
  }

  private createBucket(){
  	if(this.newBucketName.indexOf(',')>-1){
  		var bucketsArr = this.newBucketName.split(',')
  		for (var i = 0; i < bucketsArr.length; i++) {
  			if(bucketsArr[i]!=''){
  				this.createBucketSimple(bucketsArr[i],this.newBucketEventARN)
  			}
  		}
  	}else{
  		this.createBucketSimple(this.newBucketName,this.newBucketEventARN)
  	}
  }

  private bucketLifecycle(bucket){
    this.lifecycleBucketName = bucket;
  }

  private updateBucket() {
    this.enableNotificationForBucket(this.editBucketName, this.updateBucketEventARN, this.selectedEventTypes, this.updateBucketEventFilterPrefix, this.updateBucketEventFilterSuffix, true)
  }

  private enableNotificationForBucket(bucket, stsARN, eventTypes, filterPrefix, filterSuffix, updateListAfter){
    var eventTypesArr = []
    for (var i = 0; i < eventTypes.length; i++) {
      eventTypesArr.push(eventTypes[i].itemName)
    }
    this.apiService.enableNotificationForBucket(bucket, stsARN, eventTypesArr.join(','), filterPrefix, filterSuffix).subscribe((data)=>{
      if(data["Success"]){
        this.toastr.success('Events for bucket: '+bucket+' has been enabled', 'Success');
        if(updateListAfter){
          this.getBuckets();
        }
      }else{
        this.toastr.error(JSON.stringify(data), 'Error while enabling events for bucket'+bucket );
      }
    });
  }

  private removeBucketEvents(){
    var bucket = this.bucketToRemoveNotifications;
    this.apiService.removeBucketEvents(bucket).subscribe((data)=>{
      console.log(data);
      if(data["Success"]){
        this.toastr.success('Events for bucket '+bucket+' has been removed', 'Success');
      }else{
        this.toastr.error(JSON.stringify(data), 'Error while removing bucket events');
      }
      this.getBuckets();
    });
  }

  private createBucketSimple(bucket, eventARN){
  	this.apiService.createBucket(bucket).subscribe((data)=>{
      console.log(data);
      if(data["Success"]){
        this.toastr.success('Bucket: '+bucket+' has been created', 'Success');
        if(eventARN != ""){
          this.enableNotificationForBucket(bucket, eventARN, this.selectedEventTypes, this.newBucketEventFilterPrefix, this.newBucketEventFilterSuffix, false)
        }
      }else{
        this.toastr.error(JSON.stringify(data), 'Error while creating bucket');
      }
      this.getBuckets();
    });
  }

  private fileChanged(e) {
    console.log("eventTriggered");

    this.uploadLifecycleFile = e.target.files[0];
    this.uploadLifecycleFileName = e.target.files[0].name;
  }

  private resetLifecycleForm(){
    this.uploadFileInput.nativeElement.value = "";
    this.uploadLifecycleFile;
    this.uploadLifecycleName = "";
    this.uploadLifecycleFileName = "";
    this.downloadLifecycleAvailable = 0;
  }

  private downloadLifecycle(bucket) {
    this.apiService.getLifecycle(bucket).subscribe((data)=>{
      // console.log(bucket, data);
      if(data["error"]){
        this.toastr.error(JSON.stringify(data), 'Error while getting lifecycle'); //??????????????????
      }else{
        if(data==""){
          // this.toastr.error("Bucket has no lifecycle", 'Error while getting lifecycle');
        }else{
          this.downloadLifecycleAvailable = 1;
          var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/xml;charset=UTF-8," + encodeURIComponent(data.toString()));
          this.downloadJsonHref = uri;
        }
      }
    });
  }

  private uploadLifecycle(){
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      let lifecycleFileString = ((fileReader.result).toString()).replace(/\n/g, ' ').replace(/\r/g, ' ')
      this.apiService.setLifecycle(this.lifecycleBucketName,lifecycleFileString).subscribe((data)=>{
        console.log(data);
        if(data["Success"]){
          this.toastr.success('Lifecycyle has been uploaded for bucket: '+this.lifecycleBucketName+'', 'Success');
        }else{
          this.toastr.error(JSON.stringify(data), 'Error while uploading lifecycyle');
        }
      });
    }
    fileReader.readAsText(this.uploadLifecycleFile);
  }

}
