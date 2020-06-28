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
  bucketToRemoveQuota;
  editBucketName;
  newBucketName = "";
  uiShowQuota = false;
  newBucketQuotaType = "";
  newBucketQuota = "";
  quotaTypes = ["fifo","hard"]
  serviceInfo;
  diskUsageInfo;
  newBucketEventARN = "";
  updateBucketEventARN = "";
  updateBucketEventFilterPrefix = "";
  updateBucketEventFilterSuffix = "";
  updateBucketQuotaObj = {};
  updateQuotaTypeChanged = false;
  updateQuotaChanged = false;

  dropdownEventTypesList = [];
  selectedEventTypes = [];
  dropdownEventTypesSettings = {};
  newBucketEventFilterPrefix = "";
  newBucketEventFilterSuffix = "";
  newBucketTagName = "";
  newBucketTagValue = "";
  newBucketTagsList = {};

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

  private toggleShowQuota(){
    (this.uiShowQuota) ? this.uiShowQuota = false : this.uiShowQuota = true;
  }

  // private toggleUpdateShowQuota(){
  //   (this.updateUiShowQuota) ? this.updateUiShowQuota = false : this.updateUiShowQuota = true;
  // }

  private getServerInfo(){
    this.apiService.serverInfo().subscribe((data)=>{
      this.apiService.validateAuthInResponse(data)
      this.serviceInfo = data;
    });
  }

  private getDiskInfo(){
  	this.apiService.diskInfo().subscribe((data)=>{
      this.apiService.validateAuthInResponse(data)
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
      this.apiService.validateAuthInResponse(data)
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

  private updateBucketPrepare(bucketName, currentQuota, currentQtype, currentTags){
    this.editBucketName = bucketName;

    this.apiService.getBucketTag(bucketName).subscribe((data)=>{
      this.apiService.validateAuthInResponse(data)
      console.log(Object.keys(data));
      console.log(data);

      var dataKeys = Object.keys(data);
      console.log(dataKeys[0]);
      if(dataKeys[0]!="error"){
        this.newBucketTagsList = data;
      }
    });

    this.apiService.getBucketQuota(bucketName).subscribe((data)=>{
      this.apiService.validateAuthInResponse(data)
      console.log(Object.keys(data));
      console.log(data);

      var dataKeys = Object.keys(data);
      console.log(dataKeys[0]);
      if(dataKeys[0]!="error"){
        this.updateBucketQuotaObj = data;
      }else{
        var emptyData = {
          quotatype: ""
        };
        this.updateBucketQuotaObj = emptyData;
      }
    });
  }

  private deleteBucketQuotaPrepare(bucketName){
    this.bucketToRemoveQuota = bucketName;
  }

  private updateQuotaType(){
    this.updateQuotaTypeChanged = true;
  }

  private updateQuota(){
    this.updateQuotaChanged = true;
  }

  private deleteBucket(){
  	this.apiService.deleteBucket(this.bucketToDelete).subscribe((data)=>{
      this.apiService.validateAuthInResponse(data)
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
    this.newBucketQuotaType = "";
    this.newBucketQuota = "";
    this.newBucketTagName = "";
    this.newBucketTagValue = "";
    this.newBucketTagsList = {};
  }

  private resetUpdateForm() {
    this.updateBucketEventARN = "";
    this.selectedEventTypes = [];
    this.updateBucketEventFilterPrefix = "";
    this.updateBucketEventFilterSuffix = "";
    this.updateBucketQuotaObj = {};
    this.updateQuotaTypeChanged = false;
    this.updateQuotaChanged = false;
  }

  private createBucket(){
  	if(this.newBucketName.indexOf(',')>-1){
  		var bucketsArr = this.newBucketName.split(',')
  		for (var i = 0; i < bucketsArr.length; i++) {
  			if(bucketsArr[i]!=''){
  				this.createBucketSimple(bucketsArr[i],this.newBucketEventARN,this.newBucketQuotaType,this.newBucketQuota,bucketsArr.length,i+1)
  			}
  		}
  	}else{
  		this.createBucketSimple(this.newBucketName,this.newBucketEventARN,this.newBucketQuotaType,this.newBucketQuota,1,1)
  	}
  }

  private bucketLifecycle(bucket){
    this.lifecycleBucketName = bucket;
  }

  private createFormAddTag() {
    if(this.newBucketTagName != "" && this.newBucketTagValue != ""){
      this.newBucketTagsList[this.newBucketTagName] = this.newBucketTagValue;
      this.newBucketTagName = "";
      this.newBucketTagValue = "";
    }
  }

  private createFormRemoveTag(tagName) {
    delete this.newBucketTagsList[tagName];
  }

  private updateBucket(quotaType, quotaVal) {
    if(this.updateBucketEventARN != ""){
      this.enableNotificationForBucket(this.editBucketName, this.updateBucketEventARN, this.selectedEventTypes, this.updateBucketEventFilterPrefix, this.updateBucketEventFilterSuffix, true)
    }

    this.setTagsForBucket(this.editBucketName,true)
    if(this.updateQuotaTypeChanged || this.updateQuotaChanged){
      this.setQuotaForBucket(this.editBucketName, quotaType, quotaVal, true)
    }
  }

  private enableNotificationForBucket(bucket, stsARN, eventTypes, filterPrefix, filterSuffix, updateListAfter){
    var eventTypesArr = []
    for (var i = 0; i < eventTypes.length; i++) {
      eventTypesArr.push(eventTypes[i].itemName)
    }
    this.apiService.enableNotificationForBucket(bucket, stsARN, eventTypesArr.join(','), filterPrefix, filterSuffix).subscribe((data)=>{
      this.apiService.validateAuthInResponse(data)
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

  private setQuotaForBucket(bucket, quotaType, quotaVal, reloadBucketList){
    this.apiService.setBucketQuota(bucket, quotaType, quotaVal).subscribe((data)=>{
      this.apiService.validateAuthInResponse(data)
      if(data["Success"]){
        this.toastr.success('Quota for bucket '+bucket+' has been set', 'Success');
      }else{
        this.toastr.error(JSON.stringify(data), 'Error while set quota for bucket');
      }
      if(reloadBucketList){
        this.getBuckets();
      }
    });
  }

  private removeBucketEvents(){
    var bucket = this.bucketToRemoveNotifications;
    this.apiService.removeBucketEvents(bucket).subscribe((data)=>{
      this.apiService.validateAuthInResponse(data)
      console.log(data);
      if(data["Success"]){
        this.toastr.success('Events for bucket '+bucket+' has been removed', 'Success');
      }else{
        this.toastr.error(JSON.stringify(data), 'Error while removing bucket events');
      }
      this.getBuckets();
    });
  }

  private removeBucketQuota(){
      var bucket = this.bucketToRemoveQuota;
      this.apiService.removeBucketQuota(bucket).subscribe((data)=>{
        this.apiService.validateAuthInResponse(data)
        console.log(data);
        if(data["Success"]){
          this.toastr.success('Quota for bucket '+bucket+' has been removed', 'Success');
        }else{
          this.toastr.error(JSON.stringify(data), 'Error while removing bucket quota');
        }
        this.getBuckets();
      });
  }

  private createBucketSimple(bucket, eventARN, quotaType, quotaVal, numberOfBuckets, currentBucketNumber){
  	this.apiService.createBucket(bucket).subscribe((data)=>{
      this.apiService.validateAuthInResponse(data)
      console.log(data);
      if(data["Success"]){
        this.toastr.success('Bucket: '+bucket+' has been created', 'Success');
        if(eventARN != ""){
          this.enableNotificationForBucket(bucket, eventARN, this.selectedEventTypes, this.newBucketEventFilterPrefix, this.newBucketEventFilterSuffix, false);
        }
        if(quotaType != "" && quotaVal != "" && quotaVal >= 0){
          this.setQuotaForBucket(bucket, quotaType, quotaVal, false);
        }
        if(Object.keys(this.newBucketTagsList).length > 0){
          this.setTagsForBucket(bucket, false)
        }
      }else{
        this.toastr.error(JSON.stringify(data), 'Error while creating bucket');
      }
      if(numberOfBuckets == currentBucketNumber){
        this.getBuckets();
      }
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
      this.apiService.validateAuthInResponse(data)
      // console.log(bucket, data);
      if(data["error"]){
        this.toastr.error(JSON.stringify(data), 'Error while getting lifecycle');
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
        this.apiService.validateAuthInResponse(data)
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

  private setTagsForBucket(bucket,reloadBucketList){
    var tagsObj = this.newBucketTagsList;
    var tagsKeys = this.objectKeys(tagsObj);
    var tagArr = [];
    for (let i = 0; i < tagsKeys.length; i++) {
      var tagString = tagsKeys[i]+"="+tagsObj[tagsKeys[i]]
      tagArr.push(tagString)
    }
    var tagString = tagArr.join("&");
    console.log("TAG STRING >>>>", tagString)
    this.apiService.setBucketTag(bucket, tagString).subscribe((data)=>{
      this.apiService.validateAuthInResponse(data)
      if(data["Success"]){
        this.toastr.success('Tags for bucket '+bucket+' has been set', 'Success');
      }else{
        this.toastr.error(JSON.stringify(data), 'Error while set tags for bucket');
      }
      if(reloadBucketList){
        this.getBuckets();
      }
    });
  }

}
