import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../api.service';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { ToastrService } from 'ngx-toastr';


@Component({
	selector: 'app-groups',
	templateUrl: './groups.component.html',
	styleUrls: ['./groups.component.scss']
})

export class GroupsComponent implements OnInit,  AfterViewInit  {
	objectKeys = Object.keys;
	jsn = JSON;
	groups = {};
	groupsWithMembers = [];
	users = {};
	rawPolicies = {};
	groupToUpdate = {};
	newGroupName = "";
	newGroupPolicy = "";
	newGroupStatus = "";
	policies;
	updateStatusValues = ['enabled','disabled'];
	modalCreateEditTitle;
	modalCreateEditButtonText;
	modalEditMode = false;
	rawView = '';




	dropdownList = [];
	selectedItems = [];
	dropdownSettings = {};



	@ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
	@ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;

	previous: string;
	searchText: string = '';

  	constructor(private apiService: ApiService, private cdRef: ChangeDetectorRef, private toastr: ToastrService) { }

  	@HostListener('input') oninput() {
		if(event && event['target'] !== undefined && event.target["id"] !== undefined && event.target["id"] == "search"){
		   this.searchItems();
		}
		if(event && event['target'] !== undefined && event.target["name"] !== undefined && event.target["name"] == "newGroupName"){
	      if(this.modalEditMode){
	        if(this.newGroupName == this.groupToUpdate["name"]){
	          console.log('hit')
	          this.isEditMode(true)
	        }else{
	          this.isNowCopyMode();
	        }
	      }
	    }
	}

	ngOnInit() {
		this.getGroups()
		this.getListOfUsers()
		this.getListOfPolicies()
		this.isEditMode(false)

		this.dropdownList = [
		    {"id":1,"itemName":"wait! i'm getting policies ASAP"}
	    ];

	    this.dropdownSettings = { 
			singleSelection: false, 
			text:"Select Members",
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
	    this.selectedItems = [];
	}

	private searchItems() {
		const prev = this.mdbTable.getDataSource();

		if (!this.searchText) {
		  this.mdbTable.setDataSource(this.previous);
		  this.groups = this.mdbTable.getDataSource();
		}

		if (this.searchText) {
		  this.groups = this.mdbTable.searchLocalDataBy(this.searchText);
		  this.mdbTable.setDataSource(prev);
		}
	}

	ngAfterViewInit() {
	  this.mdbTablePagination.setMaxVisibleItemsNumberTo(10);

	  this.mdbTablePagination.calculateFirstItemIndex();
	  this.mdbTablePagination.calculateLastItemIndex();
	  this.cdRef.detectChanges();
	}

	private isEditMode(state){
		this.modalEditMode = state;
		if(state){
		  this.modalCreateEditTitle = "Edit group"
		  this.modalCreateEditButtonText = "Update"
		}else{
		  this.modalCreateEditTitle = "Create group"
		  this.modalCreateEditButtonText = "Create"
		}
	}

	private isNowCopyMode(){
		this.modalCreateEditTitle = "Copy group"
		this.modalCreateEditButtonText = "Copy"
	}

	private commaToBr(arr) {
		// console.log(arr)
	    var str = arr.join('\n\r');
	    return str;
	}

	public b64unpack(str){
	// console.log(JSON.parse(atob(str)))
		return JSON.parse(atob(str));
	}

	private rawPrepare(str){
		console.log(this.rawPolicies[str])
		this.rawView = this.b64unpack(this.rawPolicies[str]);
	}


	private getGroups(){
		this.groups = {};
		this.groupsWithMembers = [];
		this.previous = "";
		this.apiService.getGroups().subscribe((data)=>{
		  console.log(data);
		  if(data!==null){
		    this.groups = data;
		    for (var i = 0; i < this.objectKeys(data).length; i++) {
					let tempGroupName = data[i]
					this.apiService.getGroupDescription(tempGroupName).subscribe((data)=>{
						if(data!==null){
							this.groupsWithMembers.push(data)
							this.mdbTable.setDataSource(this.groupsWithMembers);
		  					this.previous = this.mdbTable.getDataSource();
						}
					});
				}
			console.log(this.groupsWithMembers)
			this.groups = this.groupsWithMembers;
		  }
		  

		});
	}
	private getListOfUsers(){
		this.apiService.getUsers().subscribe((data)=>{
			if(data!==null){
				this.dropdownList = Object.entries(data).map((e) => ( { "id":e[0],"itemName":e[0] } ));
			}
		});
	}

	private getGroupDescription(group){
		this.isEditMode(true);
		console.log(group)
		this.apiService.getGroupDescription(group).subscribe((data)=>{
			if(data!==null){
				console.log(data)
				this.groupToUpdate = data;
				this.newGroupName = data["name"]
				this.newGroupPolicy = data["policy"]
				this.newGroupStatus = data["status"]
				for (var i = 0; i < data["members"].length; i++) {
					var tempMember = data["members"][i];
					this.selectedItems.push({"id":tempMember,"itemName":tempMember})
				}
			} 
		});
	}

	private getListOfPolicies(){
		this.apiService.getPolicies().subscribe((data)=>{
		  this.policies = Object.keys(data);
		  this.rawPolicies = data;
		});
	}

	private resetForm(){
		this.newGroupName = "";
		this.selectedItems = [];
		this.newGroupPolicy = "";
		this.newGroupStatus = "";
	}

	private wipeGroupMembers(){
		this.apiService.updateMembersGroup(this.newGroupName,this.groupToUpdate["members"],"true").subscribe((data)=>{
	      if(data["Success"]){
	        this.toastr.success('Group: '+this.newGroupName+' members has been wiped', 'Success');
	      }else{
	        this.toastr.error(JSON.stringify(data), 'Error while wiping group');
	      }
	    });
	}

	private updatePolicy(){
		if(this.newGroupPolicy !== null && this.newGroupPolicy != ""){
	    	this.apiService.setPolicy(this.newGroupPolicy,this.newGroupName,"true").subscribe((data)=>{
		      if(data["Success"]){
		        this.toastr.success('Group: '+this.newGroupName+' policy has been set to '+this.newGroupPolicy, 'Success');
		      }else{
		        this.toastr.error(JSON.stringify(data), 'Error while setting policy to group');
		      }
		    });
	    }
	}

	private updateStatus(){
		if(this.newGroupStatus !== null && this.newGroupStatus != ""){
	    	this.apiService.setStatusGroup(this.newGroupName,this.newGroupStatus).subscribe((data)=>{
		      if(data["Success"]){
		        this.toastr.success('Group: '+this.newGroupName+' status has been set to '+this.newGroupStatus, 'Success');
		      }else{
		        this.toastr.error(JSON.stringify(data), 'Error while setting status to group');
		      }
		    });
	    }
	}

	private createGroup(){
		
		let newMembers = []
		for (var i = 0; i < this.selectedItems.length; i++) {
			newMembers.push(this.selectedItems[i].itemName)
		}

		//remove all old users from group
		if(this.groupToUpdate!==null && this.groupToUpdate!="" && this.groupToUpdate){
			if(this.groupToUpdate["members"] && this.groupToUpdate["members"].length > 0){
				this.wipeGroupMembers()
			}
		}

		//add all new users to group
		console.log('>>>>>>>>>>>>',this.newGroupName,this.selectedItems,newMembers);
		this.apiService.updateMembersGroup(this.newGroupName,newMembers,"false").subscribe((data)=>{
	      if(data["Success"]){
	        this.toastr.success('Group: '+this.newGroupName+' has been created', 'Success');
	      }else{
	        this.toastr.error(JSON.stringify(data), 'Error while creating group');
	      }
	      this.updatePolicy();
	      this.updateStatus();
	    });

	    this.getGroups();
	    this.isEditMode(false);
	    this.groupToUpdate = {};
	}

}
