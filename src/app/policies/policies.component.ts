import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
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
  modalCreateEditTitle;
  modalCreateEditButtonText;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

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
    Resource: []
  }

  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  previous: string;

  searchText: string = '';


  constructor(private apiService: ApiService, private cdRef: ChangeDetectorRef, private toastr: ToastrService) { }

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

  ngOnInit() {
  	this.getPolicies()


  	this.dropdownList = [
	    {"id":1,"itemName":"s3:AbortMultipartUpload"},
	    {"id":2,"itemName":"s3:CreateBucket"},
	    {"id":3,"itemName":"s3:DeleteBucket"},
	    {"id":4,"itemName":"s3:DeleteBucketPolicy"},
	    {"id":5,"itemName":"s3:DeleteObject"},
	    {"id":6,"itemName":"s3:GetBucketLocation"},
	    {"id":7,"itemName":"s3:GetBucketNotification"},
	    {"id":8,"itemName":"s3:GetBucketPolicy"},
	    {"id":9,"itemName":"s3:GetObject"},
	    {"id":10,"itemName":"s3:HeadBucket"},
	    {"id":11,"itemName":"s3:ListAllMyBuckets"},
	    {"id":12,"itemName":"s3:ListBucket"},
	    {"id":13,"itemName":"s3:ListBucketMultipartUploads"},
	    {"id":14,"itemName":"s3:ListenBucketNotification"},
	    {"id":15,"itemName":"s3:ListMultipartUploadParts"},
	    {"id":16,"itemName":"s3:PutBucketNotification"},
	    {"id":17,"itemName":"s3:PutBucketPolicy"},
	    {"id":18,"itemName":"s3:PutObject"},
	    {"id":19,"itemName":"s3:PutBucketLifecycle"},
	    {"id":20,"itemName":"s3:GetBucketLifecycle"}
    ];

    this.dropdownSettings = { 
		singleSelection: false, 
		text:"Select Actions",
		selectAllText:'Select All',
		unSelectAllText:'UnSelect All',
		enableSearchFilter: true	
	  };            
  }

	onItemSelect(item:any){
	    console.log(item);
	    console.log(this.selectedItems);
	}
	OnItemDeSelect(item:any){
	    console.log(item);
	    console.log(this.selectedItems);
	}
	onSelectAll(items: any){
	    console.log(items);
	}
	onDeSelectAll(items: any){
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
  	console.log(removeName)
  	this.selectedItems = []
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
      Resource: []
    }
  	
  }

  private getPolicies(){
  	this.apiService.getPolicies().subscribe((data)=>{
      console.log(data);
      this.policiesRaw = data;
      const arrayOfPolicies = Object.entries(data).map((e) => ( { [e[0]]: this.b64unpack(e[1]) } ));
      this.policies = arrayOfPolicies;
      this.mdbTable.setDataSource(arrayOfPolicies);
      console.log(arrayOfPolicies)
      this.previous = this.mdbTable.getDataSource();
    });
  }

  private deletePolicy(){
  	this.apiService.deletePolicy(this.policyToDelete).subscribe((data)=>{
      console.log(data);
      this.getPolicies();
      if(data["Success"]){
        this.toastr.success('Policy '+this.policyToDelete+' has been deleted', 'Success');
      }else{
        this.toastr.error(JSON.stringify(data), 'Error while deleting policy');
      }
    });
  }

  public b64unpack(str){
    // console.log(JSON.parse(atob(str)))
  	return JSON.parse(atob(str));
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



  private addStatement(){

  	if(this.selectedItems.length == this.dropdownList.length){
  		this.newStatement.Action.push("s3:*")
  	}else{
	  	for (var i = 0; i < this.selectedItems.length; i++) {
	  		this.newStatement.Action.push(this.selectedItems[i].itemName)
	  	}
	  }
  	this.newStatement.Effect = this.newPolicy.effect
  	// this.newStatement.Resource = "arn:aws:s3:::"+this.newPolicy.bucket
  	console.log(this.newStatement)

  	this.newPolicyRaw.Statement.push(this.newStatement);
  	console.log(this.newPolicyRaw)

  	this.resetPloicyForm(false);
  }

  private editStatement(i){
    this.newStatement = this.newPolicyRaw.Statement[i]
    this.newPolicy.effect = this.newPolicyRaw.Statement[i].Effect
    if(this.newStatement.Action[0] == "s3:*"){
        this.selectedItems = this.dropdownList
    }else{
      for (var g = 0; g < this.newStatement.Action.length; g++) {
        this.selectedItems.push({"id":g,"itemName":this.newStatement.Action[g]})
      }
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

  private createPolicy(){
  	console.log(this.newPolicy, this.newPolicyRaw)

  	let policyString = JSON.stringify(this.newPolicyRaw);

  	this.apiService.addPolicy(this.newPolicy.name,policyString).subscribe((data)=>{
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

    var oldPolicy = this.b64unpack(this.policiesRaw[policy])
    this.newPolicyRaw.Statement = oldPolicy.Statement;
  }

}
