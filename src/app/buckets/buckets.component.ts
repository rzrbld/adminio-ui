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
  bucketToRemoveEncryption;
  updateEncryptionTypeChanged = false;
  editBucketName;
  newBucketName = "";
  uiShowQuota = false;
  newBucketQuotaType = "";
  newBucketQuota = "";
  quotaTypes = ["fifo", "hard"];
  serviceInfo;
  diskUsageInfo;
  newBucketEncryption = "";
  encryptionTypes = ["sse-s3", "sse-kms"];
  newBucketMasterKeyID = "";
  newBucketEventARN = "";
  updateBucketEventARN = "";
  updateBucketEventFilterPrefix = "";
  updateBucketEventFilterSuffix = "";
  updateBucketQuotaObj = {};
  updateBucketEncryptionObj = {};
  updateQuotaTypeChanged = false;
  updateQuotaChanged = false;

  newBucketPolicy = "none";
  // updateBucketPolicy = "none"
  policyTypes = ["none", "upload", "download", "public", "custom"];
  updatePolicyTypeChanged = false;
  uploadPolicyName;
  uploadPolicyFile;
  uploadPolicyFileName;

  dropdownEventTypesList = [];
  selectedEventTypes = [];
  dropdownEventTypesSettings = {};
  newBucketEventFilterPrefix = "";
  newBucketEventFilterSuffix = "";
  newBucketTagName = "";
  newBucketTagValue = "";
  newBucketTagsList = {};

  tagListChanged = false;

  uploadLifecycleName;
  uploadLifecycleFile;
  uploadLifecycleFileName;
  lifecycleBucketName;
  downloadJsonHref;
  downloadLifecycleAvailable = 0;

  lifecycleCurrentData;

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
      autoPosition: false,
      position:'bottom'
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

    this.apiService.getBucketEncryption(bucketName).subscribe((data)=>{
      this.apiService.validateAuthInResponse(data)
      console.log(Object.keys(data));
      console.log(data);

      var dataKeys = Object.keys(data);
      console.log("Bucket Encryption >>",dataKeys[1]);
      if(dataKeys[1]=="Rules"){
        this.updateBucketEncryptionObj = data;
        var dataVals = Object.values(data);
        console.log("Enc datavals", dataVals[1][0]['Apply']['KmsMasterKeyID'])
        if(dataVals[1][0]['Apply']['KmsMasterKeyID'] == ""){
          this.updateBucketEncryptionObj = "sse-s3"
        }else{
          this.updateBucketEncryptionObj = "sse-kms"
        }
      }else{
        this.updateBucketEncryptionObj = "";
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

    this.apiService.getBucketPolicy(bucketName).subscribe((data)=>{
      this.apiService.validateAuthInResponse(data)
      console.log(Object.keys(data));
      console.log(data);
      this.newBucketPolicy = data["name"];
    });
  }

  private deleteBucketQuotaPrepare(bucketName){
    this.bucketToRemoveQuota = bucketName;
  }

  private updateQuotaType(){
    this.updateQuotaTypeChanged = true;
  }

  private updatePolicyType(){
    this.updatePolicyTypeChanged = true;
  }

  private updateEncryptionType(){
    this.updateEncryptionTypeChanged = true;
  }

  private updateQuota(){
    this.updateQuotaChanged = true;
  }

  private deleteBucketEncryptionPrepare(bucketName){
    this.bucketToRemoveEncryption = bucketName;
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
    this.newBucketEncryption = "";
    this.newBucketMasterKeyID = "";
    this.updateEncryptionTypeChanged = false;
    this.newBucketEventFilterPrefix = "";
    this.newBucketEventFilterSuffix = "";
    this.selectedEventTypes = [];
    this.newBucketQuotaType = "";
    this.newBucketPolicy = "none";
    this.newBucketQuota = "";
    this.newBucketTagName = "";
    this.newBucketTagValue = "";
    this.newBucketTagsList = {};
    this.updatePolicyTypeChanged = false;
    this.tagListChanged = false;
    this.resetUploadForm();
  }

  private resetUpdateForm() {
    this.updateBucketEventARN = "";
    this.newBucketEncryption = "";
    this.newBucketMasterKeyID = "";
    this.updateEncryptionTypeChanged = false;
    this.selectedEventTypes = [];
    this.updateBucketEventFilterPrefix = "";
    this.updateBucketEventFilterSuffix = "";
    this.updateBucketQuotaObj = {};
    this.updateBucketEncryptionObj = "";
    this.updateQuotaTypeChanged = false;
    this.updateQuotaChanged = false;
    this.tagListChanged = false;
    this.updatePolicyTypeChanged = false;
    this.resetUploadForm();
  }

  private filePolicyChanged(e) {
    console.log("file event");

    this.uploadPolicyFile = e.target.files[0];
    this.uploadPolicyFileName = e.target.files[0].name;
  }

  private resetUploadForm(){
    this.uploadFileInput.nativeElement.value = "";
    this.uploadPolicyFile;
    this.uploadPolicyName = "";
    this.uploadPolicyFileName = "";
  }

  private setPolicy(bucketName, updateListAfter){
    if(this.newBucketPolicy!="custom"){
      this.apiService.setBucketPolicy(bucketName, this.newBucketPolicy).subscribe((data)=>{
        this.apiService.validateAuthInResponse(data)
        console.log(data);
        if(data["Success"]){
          this.toastr.success('Policy '+this.newBucketPolicy+' has been append to '+bucketName, 'Success');
          if(updateListAfter){
            this.getBuckets();
          }
        }else{
          this.toastr.error(JSON.stringify(data), 'Error while creating policy');
        }
      });
    } else {
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        console.log("Policy>>>>",fileReader.result);

        let policyFileString = ((fileReader.result).toString()).replace(/\n/g, ' ').replace(/\r/g, ' ')
        console.log("Policy2>>>>",policyFileString);
        this.apiService.setBucketPolicy(bucketName, policyFileString).subscribe((data)=>{
          this.apiService.validateAuthInResponse(data)
          console.log(data);
          if(data["Success"]){
            this.toastr.success('Policy custom has been append to '+bucketName, 'Success');
            if(updateListAfter){
              this.getBuckets();
            }
          }else{
            this.toastr.error(JSON.stringify(data), 'Error while creating policy');
          }
        });

      }
      fileReader.readAsText(this.uploadPolicyFile);
    }
  }


  private createBucket(){
  	if(this.newBucketName.indexOf(',')>-1){
  		var bucketsArr = this.newBucketName.split(',')
  		for (var i = 0; i < bucketsArr.length; i++) {
  			if(bucketsArr[i]!=''){
  				this.createBucketSimple(bucketsArr[i],this.newBucketEventARN,this.newBucketQuotaType,this.newBucketQuota,this.newBucketPolicy,this.newBucketEncryption,this.newBucketMasterKeyID, bucketsArr.length,i+1)
  			}
  		}
  	}else{
  		this.createBucketSimple(this.newBucketName,this.newBucketEventARN,this.newBucketQuotaType,this.newBucketQuota,this.newBucketPolicy,this.newBucketEncryption,this.newBucketMasterKeyID,1,1)
  	}
  }

  private bucketLifecycle(bucket){
    this.lifecycleBucketName = bucket;
    // this.lifecycleCurrentData = "";
  }

  private createFormAddTag() {
    if(this.newBucketTagName != "" && this.newBucketTagValue != ""){
      this.newBucketTagsList[this.newBucketTagName] = this.newBucketTagValue;
      this.newBucketTagName = "";
      this.newBucketTagValue = "";
      this.tagListChanged = true;
    }
  }

  private createFormRemoveTag(tagName) {
    delete this.newBucketTagsList[tagName];
    this.tagListChanged = true;
  }

  private updateBucket(quotaType, quotaVal) {
    if(this.updateBucketEventARN != ""){
      this.enableNotificationForBucket(this.editBucketName, this.updateBucketEventARN, this.selectedEventTypes, this.updateBucketEventFilterPrefix, this.updateBucketEventFilterSuffix, true)
    }

    if(this.tagListChanged){
      this.setTagsForBucket(this.editBucketName,true)
    }

    if(this.updateQuotaTypeChanged || this.updateQuotaChanged){
      this.setQuotaForBucket(this.editBucketName, quotaType, quotaVal, true)
    }

    if(this.updatePolicyTypeChanged){
      this.setPolicy(this.editBucketName, true)
    }

    if(this.updateEncryptionTypeChanged){
      this.setBucketEncryption(this.editBucketName, this.updateBucketEncryptionObj, this.newBucketMasterKeyID, true)
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

  private removeBucketEncryption(){
      var bucket = this.bucketToRemoveEncryption;
      this.apiService.removeBucketEncryption(bucket).subscribe((data)=>{
        this.apiService.validateAuthInResponse(data)
        console.log(data);
        if(data["Success"]){
          this.toastr.success('Encryption for bucket '+bucket+' has been removed', 'Success');
        }else{
          this.toastr.error(JSON.stringify(data), 'Error while removing bucket encryption');
        }
        this.getBuckets();
      });
  }


  private setBucketEncryption(bucket, encType, masterKeyID, reloadBucketList){
    this.apiService.setBucketEncryption(bucket, encType, masterKeyID).subscribe((data)=>{
      this.apiService.validateAuthInResponse(data)
      if(data["Success"]){
        this.toastr.success('Encryption for bucket '+bucket+' has been set', 'Success');
      }else{
        this.toastr.error(JSON.stringify(data), 'Error while set encryption for bucket');
      }
      if(reloadBucketList){
        this.getBuckets();
      }
    });
  }



  private createBucketSimple(bucket, eventARN, quotaType, quotaVal, policy, encryption, masterKeyID, numberOfBuckets, currentBucketNumber){
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
        if(this.updatePolicyTypeChanged){
          this.setPolicy(bucket, false)
        }
        if(encryption != ""){
          this.setBucketEncryption(bucket, encryption, masterKeyID, false)
        }
      }else{
        this.toastr.error(JSON.stringify(data), 'Error while creating bucket');
      }
      if(numberOfBuckets == currentBucketNumber){
        setTimeout(()=>{
            this.getBuckets();
        }, 500);
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
    this.lifecycleCurrentData = "";
  }

  private downloadLifecycle(bucket) {
    this.apiService.getLifecycle(bucket).subscribe((data)=>{
      this.apiService.validateAuthInResponse(data)
      console.log(bucket, data);
      if(data["error"]){
        if(data["error"]!="The lifecycle configuration does not exist"){
          this.toastr.error(JSON.stringify(data), 'Error while getting lifecycle');
        }
      }else{
        if(data==""){
          // this.toastr.error("Bucket has no lifecycle", 'Error while getting lifecycle');
        }else{
          this.downloadLifecycleAvailable = 1;
          console.log("Lifecycle>>>>",JSON.stringify(data));
          this.lifecycleCurrentData = data;

          var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(JSON.stringify(data)));
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

  private downloadPolicy(bucket,fileName) {
    this.apiService.getBucketPolicy(bucket).subscribe((data)=>{
      this.apiService.validateAuthInResponse(data)
      console.log("download policy >>> ", bucket, data);
      if(data["error"]){
        this.toastr.error(JSON.stringify(data), 'Error while getting policy');
      }else{
        if(data==""){
          this.toastr.error("Bucket has no policy", 'Error while getting policy');
        }else{
          var link = document.createElement('a');
          link.href = "data:text/json;charset=UTF-8," + encodeURIComponent(data["policy"].toString());
          link.download = fileName
          link.click();
        }
      }
    });
  }



}
