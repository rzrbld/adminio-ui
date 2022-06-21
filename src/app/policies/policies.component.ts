import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { ApiService } from '../api.service';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss']
})
export class PoliciesComponent implements OnInit {
  objectKeys = Object.keys;
  objectValues = Object.values;
  policies = {};
  policiesRaw = {};
  b64decode;
  rawView = '';
  policyToDelete;
  policyToUpdate;
  modalEditMode;
  jsn = JSON;
  uploadPolicyName;
  uploadPolicyFile;
  uploadPolicyFileName;
  downloadJsonHref;
  modalCreateEditTitle;
  modalCreateEditButtonText;

  dropdownActionList = [];
  dropdownAdminList = [];
  dropdownConditionList = [];
  dropdownConditionKeyList = [];

  selectedActions = [];
  selectedAdmins = [];
  selectedCondition = [];
  selectedConditionKey = [];

  dropdownActionSettings = {};
  dropdownAdminSettings = {};
  dropdownConditionSettings = {};
  dropdownConditionKeySettings = {};

  advancedInterface = false;
  advancedInterfaceLabel = "advanced"

  newPolicy = {
  	name:"",
  	effect:"allow",
  	bucket:"",
  };

  newPolicyRaw = {
  	Version:"",
  	Statement: []
  }

  newStatement = {
    Action: [],
    Effect: "",
    Resource: [],
    Condition: {},
    Principal: ""
  }

  newConditionValue = ""

  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  previous: string;

  searchText: string = '';


  constructor(private apiService: ApiService, private cdRef: ChangeDetectorRef, private toastr: ToastrService, private sanitizer: DomSanitizer) { }

  @HostListener('input') oninput() {
    if(event && event['target'] !== undefined && event.target["id"] !== undefined && event.target["id"] == "search"){
       this.searchItems();
    }
    if(event && event['target'] !== undefined && event.target["name"] !== undefined && event.target["name"] == "newPolicyName"){
      if(this.modalEditMode){
        if(this.newPolicy.name == this.policyToUpdate){
          this.isEditMode(true)
        }else{
          this.isNowCopyMode();
        }
      }
    }

  }

  @ViewChild('uploadPolicyFile', { static: true })
  uploadFileInput: any;

  ngOnInit() {
  	this.getPolicies()


  	this.dropdownActionList = [
      {"id":1,"itemName":"s3:AbortMultipartUpload"},
      {"id":2,"itemName":"s3:CreateBucket"},
      {"id":3,"itemName":"s3:DeleteBucket"},
      {"id":4,"itemName":"s3:ForceDeleteBucket"},
      {"id":5,"itemName":"s3:DeleteBucketPolicy"},
      {"id":6,"itemName":"s3:DeleteObject"},
      {"id":7,"itemName":"s3:GetBucketLocation"},
      {"id":8,"itemName":"s3:GetBucketNotification"},
      {"id":9,"itemName":"s3:GetBucketPolicy"},
      {"id":10,"itemName":"s3:GetObject"},
      {"id":11,"itemName":"s3:HeadBucket"},
      {"id":12,"itemName":"s3:ListAllMyBuckets"},
      {"id":13,"itemName":"s3:ListBucket"},
      {"id":14,"itemName":"s3:ListBucketVersions"},
      {"id":15,"itemName":"s3:ListBucketMultipartUploads"},
      {"id":16,"itemName":"s3:ListenNotification"},
      {"id":17,"itemName":"s3:ListenBucketNotification"},
      {"id":18,"itemName":"s3:ListMultipartUploadParts"},
      {"id":19,"itemName":"s3:PutLifecycleConfiguration"},
      {"id":20,"itemName":"s3:GetLifecycleConfiguration"},
      {"id":21,"itemName":"s3:PutBucketNotification"},
      {"id":22,"itemName":"s3:PutBucketPolicy"},
      {"id":23,"itemName":"s3:PutObject"},
      {"id":24,"itemName":"s3:DeleteObjectVersion"},
      {"id":25,"itemName":"s3:DeleteObjectVersionTagging"},
      {"id":26,"itemName":"s3:GetObjectVersion"},
      {"id":27,"itemName":"s3:GetObjectVersionTagging"},
      {"id":28,"itemName":"s3:PutObjectVersionTagging"},
      {"id":29,"itemName":"s3:BypassGovernanceRetention"},
      {"id":30,"itemName":"s3:PutObjectRetention"},
      {"id":31,"itemName":"s3:GetObjectRetention"},
      {"id":32,"itemName":"s3:GetObjectLegalHold"},
      {"id":33,"itemName":"s3:PutObjectLegalHold"},
      {"id":34,"itemName":"s3:GetBucketObjectLockConfiguration"},
      {"id":35,"itemName":"s3:PutBucketObjectLockConfiguration"},
      {"id":36,"itemName":"s3:GetBucketTagging"},
      {"id":37,"itemName":"s3:PutBucketTagging"},
      {"id":38,"itemName":"s3:GetObjectTagging"},
      {"id":39,"itemName":"s3:PutObjectTagging"},
      {"id":40,"itemName":"s3:DeleteObjectTagging"},
      {"id":41,"itemName":"s3:PutEncryptionConfiguration"},
      {"id":42,"itemName":"s3:GetEncryptionConfiguration"},
      {"id":43,"itemName":"s3:PutBucketVersioning"},
      {"id":44,"itemName":"s3:GetBucketVersioning"},
      {"id":45,"itemName":"s3:GetReplicationConfiguration"},
      {"id":46,"itemName":"s3:PutReplicationConfiguration"},
      {"id":47,"itemName":"s3:ReplicateObject"},
      {"id":48,"itemName":"s3:ReplicateDelete"},
      {"id":49,"itemName":"s3:ReplicateTags"},
      {"id":50,"itemName":"s3:GetObjectVersionForReplication"}
    ];

    this.dropdownActionSettings = {
  		singleSelection: false,
  		text:"Select Actions",
  		selectAllText:'Select All',
  		unSelectAllText:'UnSelect All',
  		enableSearchFilter: true,
      autoPosition: false,
      position:'bottom'
	  };

    this.dropdownAdminList = [
      {"id":1,"itemName":"admin:ConfigUpdate"},
      {"id":2,"itemName":"admin:CreateUser"},
      {"id":3,"itemName":"admin:DeleteUser"},
      {"id":4,"itemName":"admin:ListUsers"},
      {"id":5,"itemName":"admin:EnableUser"},
      {"id":6,"itemName":"admin:DisableUser"},
      {"id":7,"itemName":"admin:GetUser"},
      {"id":8,"itemName":"admin:ServerInfo"},
      {"id":9,"itemName":"admin:ServerUpdate"},
      {"id":10,"itemName":"admin:StorageInfo"},
      {"id":11,"itemName":"admin:DataUsageInfo"},
      {"id":12,"itemName":"admin:TopLocks"},
      {"id":13,"itemName":"admin:OBDInfo"},
      {"id":14,"itemName":"admin:Profiling"},
      {"id":15,"itemName":"admin:ServerTrace"},
      {"id":16,"itemName":"admin:ConsoleLog"},
      {"id":17,"itemName":"admin:KMSKeyStatus"},
      {"id":18,"itemName":"admin:AddUserToGroup"},
      {"id":19,"itemName":"admin:RemoveUserFromGroup"},
      {"id":20,"itemName":"admin:GetGroup"},
      {"id":21,"itemName":"admin:ListGroups"},
      {"id":22,"itemName":"admin:EnableGroup"},
      {"id":23,"itemName":"admin:DisableGroup"},
      {"id":24,"itemName":"admin:CreatePolicy"},
      {"id":25,"itemName":"admin:DeletePolicy"},
      {"id":26,"itemName":"admin:GetPolicy"},
      {"id":27,"itemName":"admin:AttachUserOrGroupPolicy"},
      {"id":28,"itemName":"admin:ListUserPolicies"}
    ];

    this.dropdownAdminSettings = {
      singleSelection: false,
      text:"Select Admin actions for statement",
      selectAllText:'Select All',
      unSelectAllText:'UnSelect All',
      enableSearchFilter: true,
      autoPosition: false,
      position:'bottom'
    };

  	this.dropdownConditionList = [
      {"id":1,"itemName":"ArnEquals"},
      {"id":2,"itemName":"ArnEqualsIfExists"},
      {"id":3,"itemName":"ArnLike"},
      {"id":4,"itemName":"ArnLikeIfExists"},
      {"id":5,"itemName":"ArnNotEquals"},
      {"id":6,"itemName":"ArnNotEqualsIfExists"},
      {"id":7,"itemName":"ArnNotLike"},
      {"id":8,"itemName":"ArnNotLikeIfExists"},
      {"id":9,"itemName":"BinaryEquals"},
      {"id":10,"itemName":"BinaryEqualsIfExists"},
      {"id":11,"itemName":"BinaryNotEquals"},
      {"id":12,"itemName":"BinaryNotEqualsIfExists"},
      {"id":13,"itemName":"Bool"},
      {"id":14,"itemName":"BoolIfExists"},
      {"id":15,"itemName":"DateEquals"},
      {"id":16,"itemName":"DateEqualsIfExists"},
      {"id":17,"itemName":"DateGreaterThan"},
      {"id":18,"itemName":"DateGreaterThanEquals"},
      {"id":19,"itemName":"DateGreaterThanEqualsIfExists"},
      {"id":20,"itemName":"DateGreaterThanIfExists"},
      {"id":21,"itemName":"DateLessThan"},
      {"id":22,"itemName":"DateLessThanEquals"},
      {"id":23,"itemName":"DateLessThanEqualsIfExists"},
      {"id":24,"itemName":"DateLessThanIfExists"},
      {"id":25,"itemName":"DateNotEquals"},
      {"id":26,"itemName":"DateNotEqualsIfExists"},
      {"id":27,"itemName":"IpAddress"},
      {"id":28,"itemName":"IpAddressIfExists"},
      {"id":29,"itemName":"NotIpAddress"},
      {"id":30,"itemName":"NotIpAddressIfExists"},
      {"id":31,"itemName":"Null"},
      {"id":32,"itemName":"NumericEquals"},
      {"id":33,"itemName":"NumericEqualsIfExists"},
      {"id":34,"itemName":"NumericGreaterThan"},
      {"id":35,"itemName":"NumericGreaterThanEquals"},
      {"id":36,"itemName":"NumericGreaterThanEqualsIfExists"},
      {"id":37,"itemName":"NumericGreaterThanIfExists"},
      {"id":38,"itemName":"NumericLessThan"},
      {"id":39,"itemName":"NumericLessThanEquals"},
      {"id":40,"itemName":"NumericLessThanEqualsIfExists"},
      {"id":41,"itemName":"NumericLessThanIfExists"},
      {"id":42,"itemName":"NumericNotEquals"},
      {"id":43,"itemName":"NumericNotEqualsIfExists"},
      {"id":44,"itemName":"StringEquals"},
      {"id":45,"itemName":"StringEqualsIfExists"},
      {"id":46,"itemName":"StringEqualsIgnoreCase"},
      {"id":47,"itemName":"StringEqualsIgnoreCaseIfExists"},
      {"id":48,"itemName":"StringLike"},
      {"id":49,"itemName":"StringLikeIfExists"},
      {"id":50,"itemName":"StringNotEquals"},
      {"id":51,"itemName":"StringNotEqualsIfExists"},
      {"id":52,"itemName":"StringNotEqualsIgnoreCase"},
      {"id":53,"itemName":"StringNotEqualsIgnoreCaseIfExists"},
      {"id":54,"itemName":"StringNotLike"},
      {"id":55,"itemName":"StringNotLikeIfExists"}
    ];

    this.dropdownConditionSettings = {
  		singleSelection: true,
  		text:"Select Condition",
  		selectAllText:'Select All',
  		unSelectAllText:'UnSelect All',
  		enableSearchFilter: true,
      autoPosition: false,
      position:'bottom'
	  };

  	this.dropdownConditionKeyList = [
      {"id":1,"itemName":"aws:CurrentTime"},
      {"id":2,"itemName":"aws:EpochTime"},
      {"id":3,"itemName":"aws:MultiFactorAuthAge"},
      {"id":4,"itemName":"aws:MultiFactorAuthPresent"},
      {"id":5,"itemName":"aws:PrincipalArn"},
      {"id":6,"itemName":"aws:PrincipalOrgID"},
      {"id":7,"itemName":"aws:PrincipalTag/${TagKey}"},
      {"id":8,"itemName":"aws:PrincipalType"},
      {"id":9,"itemName":"aws:Referer"},
      {"id":10,"itemName":"aws:RequestTag/${TagKey}"},
      {"id":11,"itemName":"aws:RequestedRegion"},
      {"id":12,"itemName":"aws:SecureTransport"},
      {"id":13,"itemName":"aws:SourceAccount"},
      {"id":14,"itemName":"aws:SourceArn"},
      {"id":15,"itemName":"aws:SourceIp"},
      {"id":16,"itemName":"aws:SourceVpc"},
      {"id":17,"itemName":"aws:SourceVpce"},
      {"id":18,"itemName":"aws:TagKeys"},
      {"id":19,"itemName":"aws:TokenIssueTime"},
      {"id":20,"itemName":"aws:UserAgent"},
      {"id":21,"itemName":"aws:userid"},
      {"id":22,"itemName":"aws:username"},
      {"id":23,"itemName":"s3:AccessPointNetworkOrigin"},
      {"id":24,"itemName":"s3:DataAccessPointAccount"},
      {"id":25,"itemName":"s3:DataAccessPointArn"},
      {"id":26,"itemName":"s3:ExistingJobOperation"},
      {"id":27,"itemName":"s3:ExistingJobPriority"},
      {"id":28,"itemName":"s3:ExistingObjectTag/<key>"},
      {"id":29,"itemName":"s3:JobSuspendedCause"},
      {"id":30,"itemName":"s3:LocationConstraint"},
      {"id":31,"itemName":"s3:RequestJobOperation"},
      {"id":32,"itemName":"s3:RequestJobPriority"},
      {"id":33,"itemName":"s3:RequestObjectTag/<key>"},
      {"id":34,"itemName":"s3:RequestObjectTagKeys"},
      {"id":35,"itemName":"s3:VersionId"},
      {"id":36,"itemName":"s3:authtype"},
      {"id":37,"itemName":"s3:delimiter"},
      {"id":38,"itemName":"s3:locationconstraint"},
      {"id":39,"itemName":"s3:max-keys"},
      {"id":40,"itemName":"s3:object-lock-legal-hold"},
      {"id":41,"itemName":"s3:object-lock-mode"},
      {"id":42,"itemName":"s3:object-lock-remaining-retention-days"},
      {"id":43,"itemName":"s3:object-lock-retain-until-date"},
      {"id":44,"itemName":"s3:prefix"},
      {"id":45,"itemName":"s3:signatureage"},
      {"id":46,"itemName":"s3:signatureversion"},
      {"id":47,"itemName":"s3:versionid"},
      {"id":48,"itemName":"s3:x-amz-acl"},
      {"id":49,"itemName":"s3:x-amz-content-sha256"},
      {"id":50,"itemName":"s3:x-amz-copy-source"},
      {"id":51,"itemName":"s3:x-amz-grant-full-control"},
      {"id":52,"itemName":"s3:x-amz-grant-read"},
      {"id":53,"itemName":"s3:x-amz-grant-read-acp"},
      {"id":54,"itemName":"s3:x-amz-grant-write"},
      {"id":55,"itemName":"s3:x-amz-grant-write-acp"},
      {"id":56,"itemName":"s3:x-amz-metadata-directive"},
      {"id":57,"itemName":"s3:x-amz-server-side-encryption"},
      {"id":58,"itemName":"s3:x-amz-server-side-encryption-aws-kms-key-id"},
      {"id":59,"itemName":"s3:x-amz-storage-class"},
      {"id":60,"itemName":"s3:x-amz-website-redirect-location"}
    ];

    this.dropdownConditionKeySettings = {
  		singleSelection: true,
  		text:"Select Condition Key",
  		selectAllText:'Select All',
  		unSelectAllText:'UnSelect All',
  		enableSearchFilter: true,
      autoPosition: false,
      position:'bottom'
	  };
  }

  switchAdvanced(){
    if(this.advancedInterface){
      this.advancedInterface = false;
      this.advancedInterfaceLabel = "Advanced"
    }else{
      this.advancedInterface = true;
      this.advancedInterfaceLabel = "Basic"
    }
  }

	onActionItemSelect(item:any){
	    console.log(item);
	    console.log(this.selectedActions);
	}
	onActionItemDeSelect(item:any){
	    console.log(item);
	    console.log(this.selectedActions);
	}
	onActionSelectAll(items: any){
	    console.log(items);
	}
	onActionDeSelectAll(items: any){
	    console.log(items);
	}

	onAdminItemSelect(item:any){
	    console.log(item);
	    console.log(this.selectedAdmins);
	}
	onAdminItemDeSelect(item:any){
	    console.log(item);
	    console.log(this.selectedAdmins);
	}
	onAdminSelectAll(items: any){
	    console.log(items);
	}
	onAdminDeSelectAll(items: any){
	    console.log(items);
	}


  //condition select actions
  onConditionItemSelect(item:any){
	    console.log(item);
	    console.log(this.selectedCondition);
	}
	onConditionItemDeSelect(item:any){
	    console.log(item);
	    console.log(this.selectedCondition);
	}
	onConditionSelectAll(items: any){
	    console.log(items);
	}
	onConditionDeSelectAll(items: any){
	    console.log(items);
	}

  //condition key select actions
  onConditionKeyItemSelect(item:any){
      console.log(item);
      console.log(this.selectedConditionKey);
  }
  onConditionKeyItemDeSelect(item:any){
      console.log(item);
      console.log(this.selectedConditionKey);
  }
  onConditionKeySelectAll(items: any){
      console.log(items);
  }
  onConditionKeyDeSelectAll(items: any){
      console.log(items);
  }


  searchItems() {
    console.log(this.searchText)
    const prev = this.mdbTable.getDataSource();

    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.policies = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.policies = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(10);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  private resetPloicyForm(removeName){
  	console.log(removeName);
  	this.selectedActions = [];
  	this.selectedAdmins = []
  	if(!removeName){
  		this.newPolicy.effect = "Allow"
		  this.newPolicy.bucket = ""
  	}else{
  		this.newPolicy.name = "",
  		this.newPolicy.effect = "Allow"
  		this.newPolicy.bucket = ""
  	}

    this.newStatement = {
      Action: [],
      Effect: "",
      Resource: [],
      Condition: {},
      Principal: ""
    }

  }

  private getPolicies(){
  	this.apiService.getPolicies().subscribe((data)=>{
      this.apiService.validateAuthInResponse(data)
      console.log(data);
      this.policiesRaw = data;
      const arrayOfPolicies = Object.entries(data).map((e) => ( { [e[0]]: e[1] } ));
      this.policies = arrayOfPolicies;
      this.mdbTable.setDataSource(arrayOfPolicies);
      console.log(arrayOfPolicies)
      this.previous = this.mdbTable.getDataSource();
    });
  }

  private deletePolicy(){
  	this.apiService.deletePolicy(this.policyToDelete).subscribe((data)=>{
      this.apiService.validateAuthInResponse(data)
      console.log(data);
      this.getPolicies();
      if(data["Success"]){
        this.toastr.success('Policy '+this.policyToDelete+' has been deleted', 'Success');
      }else{
        this.toastr.error(JSON.stringify(data), 'Error while deleting policy');
      }
    });
  }

  private downloadPolicy(jsonObj) {
    var theJSON = JSON.stringify(jsonObj);
    console.log("theJSON>>>>>>>>>>>",theJSON);
    var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    this.downloadJsonHref = uri;
  }

  private rawPrepare(obj){
  	this.rawView = obj;
  }

  private deletePolicyPrepare(policy){
  	this.policyToDelete = policy
  }

  private prepareNewPolicyRaw(){
  	this.newPolicyRaw = {
	  	Version:"2012-10-17",
	  	Statement: []
  	}
  }

  private removeCondition(valueId,keyName,conditionName){
    console.log(this.newStatement)
    console.log(valueId,keyName,conditionName)
    this.newStatement.Condition[conditionName][keyName].splice(valueId,1)
  }

  private addCondition(){
    console.log(this.selectedCondition[0].itemName)
    console.log(this.selectedConditionKey[0].itemName)
    console.log(this.newConditionValue)
    if(!this.newStatement.Condition){
      this.newStatement.Condition = {}
    }
    if(this.newStatement.Condition[this.selectedCondition[0].itemName]){
      if(this.newStatement.Condition[this.selectedCondition[0].itemName][this.selectedConditionKey[0].itemName]){
        this.newStatement.Condition[this.selectedCondition[0].itemName][this.selectedConditionKey[0].itemName].push(this.newConditionValue)
      }else{
        this.newStatement.Condition[this.selectedCondition[0].itemName][this.selectedConditionKey[0].itemName] = []
        this.newStatement.Condition[this.selectedCondition[0].itemName][this.selectedConditionKey[0].itemName].push(this.newConditionValue)
      }
    }else{
      this.newStatement.Condition[this.selectedCondition[0].itemName] = {}
      this.newStatement.Condition[this.selectedCondition[0].itemName][this.selectedConditionKey[0].itemName] = []
      this.newStatement.Condition[this.selectedCondition[0].itemName][this.selectedConditionKey[0].itemName].push(this.newConditionValue)
    }

    this.selectedCondition = []
    this.selectedConditionKey = []
    this.newConditionValue = ""
    console.log(this.newStatement.Condition)
  }


  private addStatement(){
    console.log("called add statement");

    if(this.selectedActions.length>0){
    	if(this.selectedActions.length == this.dropdownActionList.length){
    		this.newStatement.Action.push("s3:*")
    	}else{
  	  	for (var i = 0; i < this.selectedActions.length; i++) {
  	  		this.newStatement.Action.push(this.selectedActions[i].itemName)
  	  	}
  	  }
    }else{
      if(this.selectedAdmins.length == this.dropdownAdminList.length){
    		this.newStatement.Action.push("admin:*")
    	}else{
  	  	for (var i = 0; i < this.selectedAdmins.length; i++) {
  	  		this.newStatement.Action.push(this.selectedAdmins[i].itemName)
  	  	}
  	  }
    }
  	this.newStatement.Effect = this.newPolicy.effect

   	console.log(this.newStatement)
    if(this.newStatement.Condition && Object.entries(this.newStatement.Condition).length === 0 && this.newStatement.Condition.constructor === Object){
      console.log("Condition removed cause empty")
      delete this.newStatement.Condition
    }else{
      if(!this.newStatement.Principal || this.newStatement.Principal == ""){
        console.log("Principal set to * cause condition not empty")
        this.newStatement.Principal = "*"
      }
    }

  	this.newPolicyRaw.Statement.push(this.newStatement);
  	console.log(this.newPolicyRaw)

  	this.resetPloicyForm(false);
  }

  private editStatement(i){
    console.log("called Edit Statement");

    this.newStatement = this.newPolicyRaw.Statement[i]
    this.newPolicy.effect = this.newPolicyRaw.Statement[i].Effect

    switch ((this.newStatement.Action[0]).substring(0, 3)) {
      case "s3:":
        if(this.newStatement.Action[0] == "s3:*"){
            for (var g = 0; g < this.dropdownActionList.length; g++) {
              this.selectedActions.push({"id":this.dropdownActionList[g].id,"itemName":this.dropdownActionList[g].itemName})
            }
        }else{
          for (var g = 0; g < this.newStatement.Action.length; g++) {
            this.selectedActions.push({"id":g,"itemName":this.newStatement.Action[g]})
          }
        }
        break;
      case "adm":
        if(this.newStatement.Action[0] == "admin:*"){
            for (var g = 0; g < this.dropdownAdminList.length; g++) {
              this.selectedAdmins.push({"id":this.dropdownAdminList[g].id,"itemName":this.dropdownAdminList[g].itemName})
            }
        }else{
          for (var g = 0; g < this.newStatement.Action.length; g++) {
            this.selectedAdmins.push({"id":g,"itemName":this.newStatement.Action[g]})
          }
        }
        break;
    }


    this.newStatement.Action = []
    this.newPolicyRaw.Statement.splice(i,1)
  }

  private addBucketStatement(){
    this.newStatement.Resource.push("arn:aws:s3:::"+this.newPolicy.bucket)
    this.newPolicy.bucket = ''
  }

  private removeStatement(i){
  	this.newPolicyRaw.Statement.splice(i,1)
  }

  private removeBucketStatement(i){
    this.newStatement.Resource.splice(i,1)
  }

  private fileChanged(e) {
    console.log("eventTriggered");

    this.uploadPolicyFile = e.target.files[0];
    this.uploadPolicyFileName = e.target.files[0].name;
  }

  private uploadPolicy(){
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      console.log(fileReader.result);
      let policyFileString = ((fileReader.result).toString()).replace(/\n/g, ' ').replace(/\r/g, ' ')
      this.apiService.addPolicy(this.uploadPolicyName,policyFileString).subscribe((data)=>{
        this.apiService.validateAuthInResponse(data)
        console.log(data);
        if(data["Success"]){
          this.toastr.success('Policy '+this.newPolicy.name+' has been created', 'Success');
        }else{
          this.toastr.error(JSON.stringify(data), 'Error while creating policy');
        }
        this.getPolicies();
      });
    }
    fileReader.readAsText(this.uploadPolicyFile);
  }

  private resetUploadForm(){
    this.uploadFileInput.nativeElement.value = "";
    this.uploadPolicyFile;
    this.uploadPolicyName = "";
    this.uploadPolicyFileName = "";
  }

  private createPolicy(){
  	console.log(this.newPolicy, this.newPolicyRaw)

  	let policyString = JSON.stringify(this.newPolicyRaw);

  	this.apiService.addPolicy(this.newPolicy.name,policyString).subscribe((data)=>{
      this.apiService.validateAuthInResponse(data)
      console.log(data);
      if(data["Success"]){
        this.toastr.success('Policy '+this.newPolicy.name+' has been created', 'Success');
      }else{
        this.toastr.error(JSON.stringify(data), 'Error while creating policy');
      }
      this.getPolicies();
    });
  }

  private isEditMode(state){
    this.modalEditMode = state;
    if(state){
      this.modalCreateEditTitle = "Edit policy"
      this.modalCreateEditButtonText = "Update"
    }else{
      this.modalCreateEditTitle = "Build up new policy"
      this.modalCreateEditButtonText = "Create"
    }
  }

  private isNowCopyMode(){
    this.modalCreateEditTitle = "Copy policy"
    this.modalCreateEditButtonText = "Copy"
  }

  private updatePolicyPrepare(policy){
    this.policyToUpdate = policy
    this.prepareNewPolicyRaw()
    this.resetPloicyForm(false)
    this.newPolicy.name = policy;

    var oldPolicy = this.policiesRaw[policy]
    this.newPolicyRaw.Statement = oldPolicy.Statement;
  }

}
