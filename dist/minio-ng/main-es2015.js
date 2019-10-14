(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html":
/*!**************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<style>\n  .content {\n    display: flex;\n    margin: 32px auto;\n    padding: 0 16px;\n    max-width: 960px;\n    flex-direction: column;\n    align-items: center;\n  }\n\n  .hidden {\n    display: none;\n  }\n\n  .visible {\n    display: flex !important;\n  }\n\n</style>\n<!-- Navbar -->\n<mdb-navbar SideClass=\"navbar navbar-expand-lg navbar-dark special-color-dark\">\n\n    <!-- Navbar brand -->\n    <mdb-navbar-brand><a class=\"navbar-brand\" href=\"#\">Adminio UI</a></mdb-navbar-brand>\n\n    <!-- Collapsible content -->\n    <links>\n\n        <!-- Links -->\n        <ul class=\"navbar-nav mr-auto\">\n            <li class=\"nav-item\" routerLinkActive=\"active\" [routerLinkActiveOptions]=\"{exact: true}\">\n                <a [routerLink]=\"['/']\" class=\"nav-link waves-light\" mdbWavesEffect>Buckets</a>\n            </li>\n            <li class=\"nav-item\" routerLinkActive=\"active\" [routerLinkActiveOptions]=\"{exact: true}\">\n                <a [routerLink]=\"['/users']\" class=\"nav-link waves-light\"  mdbWavesEffect>Users</a>\n            </li>\n            <li class=\"nav-item\" routerLinkActive=\"active\" [routerLinkActiveOptions]=\"{exact: true}\">\n                <a [routerLink]=\"['/policies']\" class=\"nav-link waves-light\"  mdbWavesEffect>Policies</a>\n            </li>\n            <li class=\"nav-item\" routerLinkActive=\"active\" [routerLinkActiveOptions]=\"{exact: true}\">\n                <a [routerLink]=\"['/server']\" class=\"nav-link waves-light\"  mdbWavesEffect>Server</a>\n            </li>\n        </ul>\n        <!-- Links -->\n    </links>\n    <!-- Collapsible content -->\n\n</mdb-navbar>\n<!--/.Navbar-->\n<app-loading></app-loading>\n<!-- <div class=\"content hidden\" role=\"main\" [routerLink]=\"['/']\" routerLinkActive=\"visible\" [routerLinkActiveOptions]=\"{exact: true}\">\n</div> -->\n\n<router-outlet></router-outlet>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/buckets/buckets.component.html":
/*!**************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/buckets/buckets.component.html ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container\" style=\"padding-top: 30px;\">\n\t<h1>Buckets</h1>\n\t<table mdbTable calss=\"table\">\n\t  <thead class=\"thead-light\">\n\t    <tr>\n\t      <th>Name</th>\n\t      <th>Creation Date</th>\n\t      <th>Options</th>\n\t    </tr>\n\t  </thead>\n\t  <tbody>\n\t    <tr mdbTableCol *ngFor=\"let b of objectKeys(buckets)\">\n\t      <td>{{buckets[b].name}}</td>\n\t      <td>{{buckets[b].creationDate}}</td>\n\t  \t  <td>\n\t  \t  \t<a title=\"Remove Bucket\" (click)=\"deleteBucketPrepare(buckets[b].name); deleteApproveModal.show()\"><mdb-icon fas icon=\"trash\" size=\"1x\" class=\"red-text pr-3\" aria-hidden=\"true\"></mdb-icon></a>\n\t  \t  </td>\n\t    </tr>\n\t  </tbody>\n\t</table>\n\t<button type=\"button\" mdbBtn color=\"primary\" class=\"relative waves-light\" mdbWavesEffect rounded=\"true\" data-toggle=\"modal\" data-target=\"#addBucket\" mdbWavesEffect (click)=\"resetForm();addBucketModal.show()\">Add bucket</button>\n</div>\n\n<!-- delete approve modal -->\n\n<div mdbModal #deleteApproveModal=\"mdbModal\" class=\"modal fade right\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myBasicModalLabel\"\n   aria-hidden=\"true\">\n    <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"deleteApproveModal.hide()\">\n                    <span aria-hidden=\"true\">×</span>\n                </button>\n                <h4 class=\"modal-title w-100\" id=\"myModalLabel\">Remove Bucket</h4>\n            </div>\n            <div class=\"modal-body\">\n                Are you shure? <br/> After you click on <strong>\"Delete\"</strong> button bucket <strong>{{bucketToDelete}}</strong> will be removed.\n            </div>\n            <div class=\"modal-footer justify-content-center\">\n                <button type=\"button\" mdbBtn color=\"secondary\" class=\"waves-light\" aria-label=\"Close\" (click)=\"deleteApproveModal.hide()\" mdbWavesEffect>Cancel</button>\n                <button type=\"button\" mdbBtn color=\"primary\" class=\"relative waves-light\" mdbWavesEffect (click)=\"deleteBucket(); deleteApproveModal.hide()\">Delete</button>\n            </div>\n        </div>\n    </div >\n</div >\n\n\n<!-- create modal -->\n\n<div mdbModal #addBucketModal=\"mdbModal\" class=\"modal fade right\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myBasicModalLabel\"\n   aria-hidden=\"true\">\n    <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"addBucketModal.hide()\">\n                    <span aria-hidden=\"true\">×</span>\n                </button>\n                <h4 class=\"modal-title w-100\" id=\"myModalLabel\">Create Bucket</h4>\n            </div>\n            <div class=\"modal-body\">\n                <div class=\"d-flex justify-content-around p-2 mb-3 text-center\">\n\t\t\t\t\t<input type=\"text\" class=\"form-control\" placeholder=\"Bucket Name\" [(ngModel)]=\"newBucketName\" name=\"newBucketName\"  aria-label=\"bucketName\" aria-describedby=\"basic-addon1\" autofocus>\n\t\t\t\t</div>\n            </div>\n            <div class=\"modal-footer justify-content-center\">\n                <button type=\"button\" mdbBtn color=\"default\" class=\"relative waves-light\" mdbWavesEffect (click)=\"createBucket(); addBucketModal.hide()\">Create</button>\n            </div>\n        </div>\n    </div >\n</div >\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/loader/loader.component.html":
/*!************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/loader/loader.component.html ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"progress-loader\" [hidden]=\"!loading\">\n\t<div class=\"loverlay\">\n\t    <br />\n\t</div>\n\n\t<div class=\"lpopup\">\n\t\t<div class=\"spinner-grow text-dark\" role=\"status\">\n\t\t  <span class=\"sr-only\">Loading...</span>\n\t\t</div>\n\t</div>\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/policies/policies.component.html":
/*!****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/policies/policies.component.html ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container\" style=\"padding-top: 30px;\">\n\t<h1>Policies</h1>\n\t<table mdbTable calss=\"table\">\n\t  <thead class=\"thead-light\">\n\t    <tr>\n\t      <th>Name</th>\n\t      <th>Action</th>\n\t      <th>Effect</th>\n\t      <th>Resource</th>\n\t      <th>Options</th>\n\t    </tr>\n\t  </thead>\n\t  <tbody>\n\t    <tr mdbTableCol *ngFor=\"let pol of objectKeys(policies)\">\n\t      <td>{{pol}}</td>\n\t      <td>\n\t      \t<ul class=\"type-none\" >\n\t      \t\t<li class=\"type-none\" *ngFor=\"let st of b64unpack(policies[pol]).Statement\"><div class=\"overflow-hidden statement-actions\">{{st.Action}}</div><div *ngIf=\"st.Action.length > 4\" class=\"lineCut\">...</div></li>\n\t      \t</ul>\n\t  \t  </td>\n\t  \t  <td>\n\t      \t<ul class=\"type-none\" >\n\t      \t\t<li class=\"type-none\" *ngFor=\"let st of b64unpack(policies[pol]).Statement\">{{st.Effect}}</li>\n\t      \t</ul>\n\t  \t  </td>\n\t  \t  <td>\n\t      \t<ul class=\"type-none\" >\n\t      \t\t<li class=\"type-none\" *ngFor=\"let st of b64unpack(policies[pol]).Statement\">{{st.Resource}}</li>\n\t      \t</ul>\n\t  \t  </td>\n\t  \t  <td>\n\t  \t  \t<a title=\"View Raw JSON\" (click)=\"rawPrepare(b64unpack(policies[pol])); rawViewModal.show()\"><mdb-icon fas icon=\"eye\"  size=\"1x\" class=\"green-text pr-3\" aria-hidden=\"true\"></mdb-icon></a>\n\t  \t  \t<a title=\"Remove Policy\" (click)=\"deletePolicyPrepare(pol); deleteApproveModal.show()\"><mdb-icon fas icon=\"trash\" size=\"1x\" class=\"red-text pr-3\" aria-hidden=\"true\"></mdb-icon></a>\n\t  \t  </td>\n\t    </tr>\n\t  </tbody>\n\t</table>\n\t<button type=\"button\" mdbBtn color=\"primary\" class=\"relative waves-light\" mdbWavesEffect rounded=\"true\" data-toggle=\"modal\" data-target=\"#addPolicy\"\n  (click)=\"resetPloicyForm(true); prepareNewPolicyRaw(); addPolicyModal.show()\" mdbWavesEffect>Add policy</button>\n</div>\n\n<!-- delete approve modal -->\n\n<div mdbModal #deleteApproveModal=\"mdbModal\" class=\"modal fade right\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myBasicModalLabel\"\n   aria-hidden=\"true\">\n    <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"deleteApproveModal.hide()\">\n                    <span aria-hidden=\"true\">×</span>\n                </button>\n                <h4 class=\"modal-title w-100\" id=\"myModalLabel\">Remove Policy</h4>\n            </div>\n            <div class=\"modal-body\">\n                Are you shure? <br/> After you click on <strong>\"Delete\"</strong> button policy <strong>{{policyToDelete}}</strong> will be removed.\n            </div>\n            <div class=\"modal-footer justify-content-center\">\n                <button type=\"button\" mdbBtn color=\"secondary\" class=\"waves-light\" aria-label=\"Close\" (click)=\"deleteApproveModal.hide()\" mdbWavesEffect>Cancel</button>\n                <button type=\"button\" mdbBtn color=\"primary\" class=\"relative waves-light\" mdbWavesEffect (click)=\"deletePolicy(); deleteApproveModal.hide()\">Delete</button>\n            </div>\n        </div>\n    </div >\n</div >\n\n<!-- Raw view Modal -->\n\n<div mdbModal #rawViewModal=\"mdbModal\" class=\"modal fade right\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"rawViewModalLabel\"\n   aria-hidden=\"true\">\n    <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"rawViewModal.hide()\">\n                    <span aria-hidden=\"true\">×</span>\n                </button>\n                <h4 class=\"modal-title w-100\" id=\"myModalLabel\">Raw Policy</h4>\n            </div>\n            <div class=\"modal-body\">\n            \t<ngx-json-viewer [json]=\"rawView\"></ngx-json-viewer>\n            </div>\n            <div class=\"modal-footer justify-content-center\">\n                <button type=\"button\" mdbBtn color=\"secondary\" class=\"waves-light\" aria-label=\"Close\" (click)=\"rawViewModal.hide()\" mdbWavesEffect>Close</button>\n            </div>\n        </div>\n    </div >\n</div >\n\n<!-- Policy build up Modal-->\n\n<div mdbModal #addPolicyModal=\"mdbModal\" class=\"modal fade right\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"addPolicyModalLabel\"\n   aria-hidden=\"true\">\n    <div class=\"modal-dialog modal-lg\" role=\"document\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"addPolicyModal.hide()\">\n                    <span aria-hidden=\"true\">×</span>\n                </button>\n                <h4 class=\"modal-title w-100\" id=\"myModalLabel\">Build up new policy</h4>\n            </div>\n            <div class=\"modal-body\">\n            \t<!-- <form class=\"text-center\" name=\"newPolicy\"  > -->\n            \t\t<div class=\"row\">\n\t\t\t\t\t    <div class=\"col-md-2 ml-auto\">&nbsp;</div>\n\t\t\t\t\t    <div class=\"col-md-8 ml-auto\">\n\n\t\t\t\t\t    \t<div class=\"d-flex justify-content-around p-2 mb-3 text-center\">\n\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" placeholder=\"Policy Name\" [(ngModel)]=\"newPolicy.name\" name=\"newPolicyName\"  aria-label=\"policyName\" aria-describedby=\"basic-addon1\">\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div class=\"d-flex justify-content-around p-2 text-center\">\n\t\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t\t<!-- Allow -->\n\t\t\t\t\t\t\t\t\t<div class=\"custom-control custom-radio custom-control-inline\">\n\t\t\t\t\t\t\t\t\t  <input type=\"radio\" checked class=\"custom-control-input\" id=\"statementAllow\"  value=\"Allow\" [(ngModel)]=\"newPolicy.effect\"  name=\"policyStatementEffect\" mdbInput>\n\t\t\t\t\t\t\t\t\t  <label class=\"custom-control-label\" for=\"statementAllow\">Allow</label>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t\t\t<!-- Deny -->\n\t\t\t\t\t\t\t\t\t<div class=\"custom-control custom-radio custom-control-inline\">\n\t\t\t\t\t\t\t\t\t  <input type=\"radio\" class=\"custom-control-input\" id=\"statementDeny\" value=\"Deny\" [(ngModel)]=\"newPolicy.effect\" name=\"policyStatementEffect\"  mdbInput>\n\t\t\t\t\t\t\t\t\t  <label class=\"custom-control-label\" for=\"statementDeny\">Deny</label>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div class=\"d-flex justify-content-around p-2 mb-3 text-center\">\n\t\t\t\t\t\t\t\t<angular2-multiselect [data]=\"dropdownList\" [(ngModel)]=\"selectedItems\" \n\t\t\t\t\t\t\t    [settings]=\"dropdownSettings\" \n\t\t\t\t\t\t\t    (onSelect)=\"onItemSelect($event)\" \n\t\t\t\t\t\t\t    (onDeSelect)=\"OnItemDeSelect($event)\"\n\t\t\t\t\t\t\t    (onSelectAll)=\"onSelectAll($event)\"\n\t\t\t\t\t\t\t    (onDeSelectAll)=\"onDeSelectAll($event)\"></angular2-multiselect>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"d-flex justify-content-around p-2 mb-3 text-center\">\n\t\t\t\t\t\t\t\t<div class=\"input-group mb-3\">\n\t\t\t\t\t\t\t\t  <div class=\"input-group-prepend\">\n\t\t\t\t\t\t\t\t    <span class=\"input-group-text\" id=\"basic-addon1\">arn:aws:s3:::</span>\n\t\t\t\t\t\t\t\t  </div>\n\t\t\t\t\t\t\t\t  <input type=\"text\" class=\"form-control\" placeholder=\"<bucket_name>/<key_name>\" [(ngModel)]=\"newPolicy.bucket\" name=\"newBucketName\" aria-label=\"bucketName\" aria-describedby=\"basic-addon1\">\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-md-2 ml-auto\">&nbsp;</div>\n\t\t\t\t\t</div>\n            \t\t\n\t\t\t\t\t\n\t\t\t\t\t<div class=\"d-flex justify-content-around p-2 mb-3 text-center\">\n\t\t\t\t\t\t<button type=\"button\" mdbBtn color=\"primary\" class=\"relative waves-light\" mdbWavesEffect (click)=\"addStatement()\">Add statement</button>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div id=\"statements\">\n\t\t\t\t\t\t<hr/>\n\t\t\t\t\t\t<table class=\"table\"  small=\"true\">\n\t\t\t\t\t\t\t<thead class=\"thead-light\">\n\t\t\t\t\t\t\t\t<th>Effect</th>\n\t\t\t\t\t\t\t\t<th>Action</th>\n\t\t\t\t\t\t\t\t<th>Resource</th>\n\t\t\t\t\t\t\t\t<th>Options</th>\n\t\t\t\t\t\t\t</thead>\n\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t<tr *ngFor=\"let st of newPolicyRaw.Statement; let i = index\" [attr.data-index]=\"i\">\n\t\t\t\t\t\t\t\t\t<td>{{st.Effect}}</td>\n\t\t\t\t\t\t\t\t\t<td><div class=\"overflow-hidden statement-actions\">{{st.Action}}</div></td>\n\t\t\t\t\t\t\t\t\t<td>{{st.Resource}}</td>\n\t\t\t\t\t\t\t\t\t<td><a title=\"Remove statement\" (click)=\"removeStatement(i)\"><mdb-icon fas icon=\"times-circle\"  size=\"1x\" class=\"green-text pr-3\" aria-hidden=\"true\"></mdb-icon></a></td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t</table>\n\t\t\t\t\t</div>\n\n                <!-- </form> -->\n            </div>\n            <div class=\"modal-footer justify-content-center\">\n                <button type=\"button\" mdbBtn color=\"default\" class=\"relative waves-light\" mdbWavesEffect (click)=\"createPolicy()\">Create</button>\n            </div>\n        </div>\n    </div >\n</div >");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/server/server.component.html":
/*!************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/server/server.component.html ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container\" style=\"padding-top: 30px;\" *ngFor=\"let server of servers\">\n\t<h1>Server statistics {{server.addr}} </h1>\n\t<div class=\"mb-4\">\n\t\t<strong>minio version:</strong> {{server.data.server.version}} <br/>\n\t\t<strong>uptime:</strong> {{server.data.server.uptime}} \n\t</div>\n\t\n\t<h3>HTTP operation </h3>\n\t<table mdbTable bordered=\"true\" small=\"true\">\n\t  <thead>\n\t    <tr>\n\t      <th>Operation</th>\n\t      <th>Count</th>\n\t      <th>Avg. Duration</th>\n\t    </tr>\n\t  </thead>\n\t  <tbody>\n\t    <tr mdbTableCol *ngFor=\"let op of objectKeys(server.data.http)\">\n\t      <th scope=\"row\">{{op}}</th>\n\t      <td>{{server.data.http[op].count}}</td>\n\t      <td>{{server.data.http[op].avgDuration}}</td>\n\t    </tr>\n\t  </tbody>\n\t</table>\n\n\t<h3>Network</h3>\n\t<table mdbTable bordered=\"true\" small=\"true\">\n\t  <thead>\n\t    <tr>\n\t      <th>received</th>\n\t      <th>transferred</th>\n\t    </tr>\n\t  </thead>\n\t  <tbody>\n\t    <tr mdbTableCol>\n\t      <td>{{server.data.network.received}}</td>\n\t      <td>{{server.data.network.transferred}}</td>\n\t    </tr>\n\t  </tbody>\n\t</table>\n\t\n\t<h3>Storage</h3>\n\t<table mdbTable bordered=\"true\" small=\"true\">\n\t  <thead>\n\t    <tr>\n\t      <th>Total</th>\n\t      <th>Used</th>\n\t      <th>Available</th>\n\t    </tr>\n\t  </thead>\n\t  <tbody>\n\t    <tr mdbTableCol>\n\t      <td>{{server.data.storage.Total}}</td>\n\t      <td>{{server.data.storage.Used}}</td>\n\t      <td>{{server.data.storage.Available}}</td>\n\t    </tr>\n\t  </tbody>\n\t</table>\n</div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/users/users.component.html":
/*!**********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/users/users.component.html ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container\" style=\"padding-top: 30px;\">\n\t<h1>List of users</h1>\n\t<table class=\"table\">\n\t\t<thead class=\"thead-light\">\n\t\t\t<tr>\n\t\t\t\t<th>User name</th>\n\t\t\t\t<th>Policy</th>\n\t\t\t\t<th>Status</th>\n\t\t\t\t<th>Action</th>\n\t\t\t</tr>\n\t\t</thead>\n\t\t<tbody *ngIf=\"users\">\n\t\t\t<tr *ngFor=\"let key of objectKeys(users)\" [ngClass]=\"users[key].status == 'disabled' ? 'table-secondary' : 'none' && !users[key].policyName ? 'table-warning' : 'none' \">\n\t\t\t\t<td>{{key}}</td>\n\t\t\t\t<td><span *ngIf=\"users[key].policyName\">{{users[key].policyName}}</span></td>\n\t\t\t\t<td>\n\t\t\t\t\t<div class=\"custom-control custom-switch\" title=\"enable or disable user\">\n\t\t\t\t\t  <input type=\"checkbox\" class=\"custom-control-input\" id=\"customSwitch{{key}}\" [attr.checked]=\"users[key].status == 'enabled' ? '' : null\" (click)=\"setStatusUser(key,users[key].status)\">\n\t\t\t\t\t  <label class=\"custom-control-label\" for=\"customSwitch{{key}}\">&nbsp;{{users[key].status}}</label>\n\t\t\t\t\t</div>\n\t\t\t\t</td>\n\t\t\t\t<td>\n\t\t\t\t\t<a title=\"Remove User\" (click)=\"deleteUserPrepare(key); deleteApproveModal.show()\"><mdb-icon fas icon=\"trash\" size=\"1x\" class=\"red-text pr-3\" aria-hidden=\"true\"></mdb-icon></a>\n\t\t\t\t</td>\n\t\t\t</tr>\n\t\t</tbody>\n\t</table>\n\t<button type=\"button\" mdbBtn color=\"primary\" class=\"relative waves-light\" mdbWavesEffect rounded=\"true\" data-toggle=\"modal\" data-target=\"#addUser\"\n  (click)=\"addUserModal.show()\" mdbWavesEffect>Add user</button>\n</div>\n\n<!-- delete approve modal -->\n\n<div mdbModal #deleteApproveModal=\"mdbModal\" class=\"modal fade right\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myBasicModalLabel\"\n   aria-hidden=\"true\">\n    <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"deleteApproveModal.hide()\">\n                    <span aria-hidden=\"true\">×</span>\n                </button>\n                <h4 class=\"modal-title w-100\" id=\"myModalLabel\">Remove User</h4>\n            </div>\n            <div class=\"modal-body\">\n                Are you shure? <br/> After you click on <strong>\"Delete\"</strong> button user <strong>{{userToDelete}}</strong> will be removed.\n            </div>\n            <div class=\"modal-footer justify-content-center\">\n                <button type=\"button\" mdbBtn color=\"secondary\" class=\"waves-light\" aria-label=\"Close\" (click)=\"deleteApproveModal.hide()\" mdbWavesEffect>Cancel</button>\n                <button type=\"button\" mdbBtn color=\"primary\" class=\"relative waves-light\" mdbWavesEffect (click)=\"deleteUser(); deleteApproveModal.hide()\">Delete</button>\n            </div>\n        </div>\n    </div >\n</div >\n\n<!-- user create modal -->\n\n<div mdbModal #addUserModal=\"mdbModal\" class=\"modal fade left\" id=\"frameModalTop\" tabindex=\"-1\" role=\"dialog\"\n     aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header text-center\">\n        <h4 class=\"modal-title w-100 font-weight-bold\">Create new user</h4>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\" (click)=\"addUserModal.hide()\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body mx-3\">\n        <div class=\"md-form mb-5\">\n          <input type=\"text\" id=\"defaultForm-access\" [formControl]=\"newUserAccess\" class=\"form-control\"\n                 mdbInput mdbValidate>\n          <label for=\"defaultForm-access\">Access Key</label>\n          <mdb-error *ngIf=\"newUserAccess.invalid && (newUserAccess.dirty || newUserAccess.touched)\">\n            Input invalid\n          </mdb-error>\n          <mdb-success *ngIf=\"newUserAccess.valid && (newUserAccess.dirty || newUserAccess.touched)\">\n          \tInput valid\n          </mdb-success>\n        </div>\n\n        <div class=\"md-form mb-4\">\n          <input type=\"text\" id=\"defaultForm-secret\" [formControl]=\"newUserSecret\" class=\"form-control\"\n                 mdbInput mdbValidate>\n          <label for=\"defaultForm-secret\">Secret Key</label>\n          <mdb-error *ngIf=\"newUserSecret.invalid && (newUserSecret.dirty || newUserSecret.touched)\">\n            Input invalid\n          </mdb-error>\n          <mdb-success *ngIf=\"newUserSecret.valid && (newUserSecret.dirty || newUserSecret.touched)\">\n            Input valid\n          </mdb-success>\n        </div>\n\n       \t<div class=\"md-form mb-4\">\n       \t\t<select class=\"browser-default custom-select\" [formControl]=\"newUserPolicy\" title=\"select policy\">\n\t\t\t  <option value=\"\" disabled selected>Select policy</option>\n\t\t\t  <option [value]=\"policy\" *ngFor=\"let policy of policies\">{{policy}}</option>\n\t\t\t</select>\n       \t</div>\n\n        <div class=\"md-form mb-4\">\n        \t<p class=\"font-small blue-text d-flex justify-content-end\">\n            \t<a class=\"blue-text ml-1\" (click)=\"resetForm()\">Generate</a>\n          \t</p>\n         </div>\n      </div>\n      <div class=\"modal-footer d-flex justify-content-center\">\n        <button mdbBtn color=\"default\" class=\"waves-light\" mdbWavesEffect (click)=\"createUser()\">Create</button>\n      </div>\n    </div>\n  </div>\n</div>\n\n\n<!-- user create modal EXTENDED -->\n\n<!-- <div mdbModal #addUserExtendedModal=\"mdbModal\" class=\"modal fade left\" id=\"frameModalTop\" tabindex=\"-1\" role=\"dialog\" -->\n\n\n\n");

/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}


/***/ }),

/***/ "./src/app/api.service.ts":
/*!********************************!*\
  !*** ./src/app/api.service.ts ***!
  \********************************/
/*! exports provided: ApiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiService", function() { return ApiService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");



let ApiService = class ApiService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.baseUrl = 'http://localhost:8080';
    }
    serverInfo() {
        return this.httpClient.get(this.baseUrl + '/api/v1/server-info');
    }
    getUsers() {
        return this.httpClient.get(this.baseUrl + '/api/v1/list-users');
    }
    addUser(access, secret) {
        let form = new FormData();
        form.append('accessKey', access);
        form.append('secretKey', secret);
        return this.httpClient.post(this.baseUrl + '/api/v1/add-user', form);
    }
    addUserExtended(access, secret, policy) {
        let form = new FormData();
        form.append('accessKey', access);
        form.append('secretKey', secret);
        form.append('policyName', policy);
        return this.httpClient.post(this.baseUrl + '/api/v1/create-user-extended', form);
    }
    setStatusUser(access, status) {
        let form = new FormData();
        form.append('accessKey', access);
        form.append('status', status);
        return this.httpClient.post(this.baseUrl + '/api/v1/set-status-user', form);
    }
    deleteUser(access) {
        let form = new FormData();
        form.append('accessKey', access);
        return this.httpClient.post(this.baseUrl + '/api/v1/delete-user', form);
    }
    getPolicies() {
        return this.httpClient.get(this.baseUrl + '/api/v1/list-policies');
    }
    deletePolicy(policy) {
        let form = new FormData();
        form.append('policyName', policy);
        return this.httpClient.post(this.baseUrl + '/api/v1/delete-policy', form);
    }
    addPolicy(policyName, policyString) {
        let form = new FormData();
        form.append('policyName', policyName);
        form.append('policyString', policyString);
        return this.httpClient.post(this.baseUrl + '/api/v1/add-policy', form);
    }
    getBuckets() {
        return this.httpClient.get(this.baseUrl + '/api/v1/list-buckets');
    }
    deleteBucket(bucket) {
        let form = new FormData();
        form.append('bucketName', bucket);
        return this.httpClient.post(this.baseUrl + '/api/v1/delete-bucket', form);
    }
    createBucket(bucket) {
        let form = new FormData();
        form.append('newBucket', bucket);
        return this.httpClient.post(this.baseUrl + '/api/v1/make-bucket', form);
    }
};
ApiService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
];
ApiService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], ApiService);



/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _users_users_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./users/users.component */ "./src/app/users/users.component.ts");
/* harmony import */ var _server_server_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./server/server.component */ "./src/app/server/server.component.ts");
/* harmony import */ var _policies_policies_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./policies/policies.component */ "./src/app/policies/policies.component.ts");
/* harmony import */ var _buckets_buckets_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./buckets/buckets.component */ "./src/app/buckets/buckets.component.ts");







const routes = [
    { path: 'users', component: _users_users_component__WEBPACK_IMPORTED_MODULE_3__["UsersComponent"] },
    { path: 'server', component: _server_server_component__WEBPACK_IMPORTED_MODULE_4__["ServerComponent"] },
    { path: 'policies', component: _policies_policies_component__WEBPACK_IMPORTED_MODULE_5__["PoliciesComponent"] },
    { path: '', component: _buckets_buckets_component__WEBPACK_IMPORTED_MODULE_6__["BucketsComponent"] }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], AppRoutingModule);



/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let AppComponent = class AppComponent {
    constructor() {
        this.title = 'minio-ng';
    }
};
AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-root',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")).default]
    })
], AppComponent);



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! angular-bootstrap-md */ "./node_modules/angular-bootstrap-md/fesm2015/angular-bootstrap-md.js");
/* harmony import */ var _users_users_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./users/users.component */ "./src/app/users/users.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _server_server_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./server/server.component */ "./src/app/server/server.component.ts");
/* harmony import */ var _filter_pipe__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./filter.pipe */ "./src/app/filter.pipe.ts");
/* harmony import */ var _policies_policies_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./policies/policies.component */ "./src/app/policies/policies.component.ts");
/* harmony import */ var ngx_json_viewer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngx-json-viewer */ "./node_modules/ngx-json-viewer/ngx-json-viewer.js");
/* harmony import */ var angular2_multiselect_dropdown__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! angular2-multiselect-dropdown */ "./node_modules/angular2-multiselect-dropdown/fesm2015/angular2-multiselect-dropdown.js");
/* harmony import */ var _loader_loader_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./loader/loader.component */ "./src/app/loader/loader.component.ts");
/* harmony import */ var _loader_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./loader.service */ "./src/app/loader.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _loader_interceptor__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./loader.interceptor */ "./src/app/loader.interceptor.ts");
/* harmony import */ var _buckets_buckets_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./buckets/buckets.component */ "./src/app/buckets/buckets.component.ts");


















let AppModule = class AppModule {
};
AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        declarations: [
            _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
            _users_users_component__WEBPACK_IMPORTED_MODULE_6__["UsersComponent"],
            _server_server_component__WEBPACK_IMPORTED_MODULE_8__["ServerComponent"],
            _filter_pipe__WEBPACK_IMPORTED_MODULE_9__["FilterPipe"],
            _policies_policies_component__WEBPACK_IMPORTED_MODULE_10__["PoliciesComponent"],
            _loader_loader_component__WEBPACK_IMPORTED_MODULE_13__["LoaderComponent"],
            _buckets_buckets_component__WEBPACK_IMPORTED_MODULE_17__["BucketsComponent"],
        ],
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
            angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_5__["MDBBootstrapModule"].forRoot(),
            _angular_common_http__WEBPACK_IMPORTED_MODULE_15__["HttpClientModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ReactiveFormsModule"],
            ngx_json_viewer__WEBPACK_IMPORTED_MODULE_11__["NgxJsonViewerModule"],
            angular2_multiselect_dropdown__WEBPACK_IMPORTED_MODULE_12__["AngularMultiSelectModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"]
        ],
        providers: [
            _loader_service__WEBPACK_IMPORTED_MODULE_14__["LoaderService"],
            { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_15__["HTTP_INTERCEPTORS"], useClass: _loader_interceptor__WEBPACK_IMPORTED_MODULE_16__["LoaderInterceptor"], multi: true }
        ],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
    })
], AppModule);



/***/ }),

/***/ "./src/app/buckets/buckets.component.scss":
/*!************************************************!*\
  !*** ./src/app/buckets/buckets.component.scss ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2J1Y2tldHMvYnVja2V0cy5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/buckets/buckets.component.ts":
/*!**********************************************!*\
  !*** ./src/app/buckets/buckets.component.ts ***!
  \**********************************************/
/*! exports provided: BucketsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BucketsComponent", function() { return BucketsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../api.service */ "./src/app/api.service.ts");



let BucketsComponent = class BucketsComponent {
    constructor(apiService) {
        this.apiService = apiService;
        this.objectKeys = Object.keys;
        this.buckets = {};
        this.newBucketName = "";
    }
    ngOnInit() {
        this.getBuckets();
    }
    getBuckets() {
        this.apiService.getBuckets().subscribe((data) => {
            console.log(data);
            this.buckets = data;
        });
    }
    deleteBucketPrepare(bucketName) {
        this.bucketToDelete = bucketName;
    }
    deleteBucket() {
        this.apiService.deleteBucket(this.bucketToDelete).subscribe((data) => {
            console.log(data);
            this.getBuckets();
        });
    }
    resetForm() {
        this.newBucketName = "";
    }
    createBucket() {
        if (this.newBucketName.indexOf(',') > -1) {
            var bucketsArr = this.newBucketName.split(',');
            for (var i = 0; i < bucketsArr.length; i++) {
                if (bucketsArr[i] != '') {
                    this.createBucketSimple(bucketsArr[i]);
                }
            }
        }
        else {
            this.createBucketSimple(this.newBucketName);
        }
    }
    createBucketSimple(bucket) {
        this.apiService.createBucket(bucket).subscribe((data) => {
            console.log(data);
            this.getBuckets();
        });
    }
};
BucketsComponent.ctorParameters = () => [
    { type: _api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"] }
];
BucketsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-buckets',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./buckets.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/buckets/buckets.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./buckets.component.scss */ "./src/app/buckets/buckets.component.scss")).default]
    })
], BucketsComponent);



/***/ }),

/***/ "./src/app/filter.pipe.ts":
/*!********************************!*\
  !*** ./src/app/filter.pipe.ts ***!
  \********************************/
/*! exports provided: FilterPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterPipe", function() { return FilterPipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let FilterPipe = class FilterPipe {
    transform(items, searchPolicy) {
        if (!items) {
            return [];
        }
        if (!searchPolicy) {
            return items;
        }
        searchPolicy = searchPolicy.toLocaleLowerCase();
        return items.filter(it => {
            return it.toLocaleLowerCase().includes(searchPolicy);
        });
    }
};
FilterPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
        name: 'filter'
    })
], FilterPipe);



/***/ }),

/***/ "./src/app/loader.interceptor.ts":
/*!***************************************!*\
  !*** ./src/app/loader.interceptor.ts ***!
  \***************************************/
/*! exports provided: LoaderInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoaderInterceptor", function() { return LoaderInterceptor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _loader_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./loader.service */ "./src/app/loader.service.ts");

// loader.interceptors.ts




let LoaderInterceptor = class LoaderInterceptor {
    constructor(loaderService) {
        this.loaderService = loaderService;
        this.requests = [];
    }
    removeRequest(req) {
        const i = this.requests.indexOf(req);
        if (i >= 0) {
            this.requests.splice(i, 1);
        }
        this.loaderService.isLoading.next(this.requests.length > 0);
    }
    intercept(req, next) {
        this.requests.push(req);
        this.loaderService.isLoading.next(true);
        return rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"].create(observer => {
            const subscription = next.handle(req)
                .subscribe(event => {
                if (event instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpResponse"]) {
                    this.removeRequest(req);
                    observer.next(event);
                }
            }, err => {
                alert('error returned');
                this.removeRequest(req);
                observer.error(err);
            }, () => {
                this.removeRequest(req);
                observer.complete();
            });
            // remove request from queue when cancelled
            return () => {
                this.removeRequest(req);
                subscription.unsubscribe();
            };
        });
    }
};
LoaderInterceptor.ctorParameters = () => [
    { type: _loader_service__WEBPACK_IMPORTED_MODULE_4__["LoaderService"] }
];
LoaderInterceptor = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
], LoaderInterceptor);



/***/ }),

/***/ "./src/app/loader.service.ts":
/*!***********************************!*\
  !*** ./src/app/loader.service.ts ***!
  \***********************************/
/*! exports provided: LoaderService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoaderService", function() { return LoaderService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");

//loader.service.ts


let LoaderService = class LoaderService {
    constructor() {
        this.isLoading = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](false);
    }
};
LoaderService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], LoaderService);



/***/ }),

/***/ "./src/app/loader/loader.component.scss":
/*!**********************************************!*\
  !*** ./src/app/loader/loader.component.scss ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("dialog {\n  width: 300px;\n}\n\ndialog::-webkit-backdrop {\n  background: rgba(0, 0, 0, 0.7);\n}\n\ndialog::backdrop {\n  background: rgba(0, 0, 0, 0.7);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J6cmJsZC9yZXBvcy9taW5pby1uZy9taW5pby1uZy9zcmMvYXBwL2xvYWRlci9sb2FkZXIuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2xvYWRlci9sb2FkZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxZQUFBO0FDQ0o7O0FEQ0c7RUFDQyw4QkFBQTtBQ0VKOztBREhHO0VBQ0MsOEJBQUE7QUNFSiIsImZpbGUiOiJzcmMvYXBwL2xvYWRlci9sb2FkZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJkaWFsb2cge1xuICAgIHdpZHRoOiAzMDBweDtcbiAgIH1cbiAgIGRpYWxvZzo6YmFja2Ryb3Age1xuICAgIGJhY2tncm91bmQ6IHJnYmEoMCwwLDAsMC43KTtcbiAgIH0iLCJkaWFsb2cge1xuICB3aWR0aDogMzAwcHg7XG59XG5cbmRpYWxvZzo6YmFja2Ryb3Age1xuICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuNyk7XG59Il19 */");

/***/ }),

/***/ "./src/app/loader/loader.component.ts":
/*!********************************************!*\
  !*** ./src/app/loader/loader.component.ts ***!
  \********************************************/
/*! exports provided: LoaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoaderComponent", function() { return LoaderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _loader_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../loader.service */ "./src/app/loader.service.ts");

//loader.interceptor.ts


let LoaderComponent = class LoaderComponent {
    constructor(loaderService) {
        this.loaderService = loaderService;
        this.loaderService.isLoading.subscribe((v) => {
            this.loading = v;
        });
    }
    ngOnInit() {
    }
};
LoaderComponent.ctorParameters = () => [
    { type: _loader_service__WEBPACK_IMPORTED_MODULE_2__["LoaderService"] }
];
LoaderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-loading',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./loader.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/loader/loader.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./loader.component.scss */ "./src/app/loader/loader.component.scss")).default]
    })
], LoaderComponent);



/***/ }),

/***/ "./src/app/policies/policies.component.scss":
/*!**************************************************!*\
  !*** ./src/app/policies/policies.component.scss ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BvbGljaWVzL3BvbGljaWVzLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/policies/policies.component.ts":
/*!************************************************!*\
  !*** ./src/app/policies/policies.component.ts ***!
  \************************************************/
/*! exports provided: PoliciesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PoliciesComponent", function() { return PoliciesComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../api.service */ "./src/app/api.service.ts");



let PoliciesComponent = class PoliciesComponent {
    constructor(apiService) {
        this.apiService = apiService;
        this.objectKeys = Object.keys;
        this.policies = {};
        this.rawView = '';
        this.dropdownList = [];
        this.selectedItems = [];
        this.dropdownSettings = {};
        this.newPolicy = {
            name: "",
            effect: "allow",
            bucket: "",
        };
        this.newPolicyRaw = {
            Version: "",
            Statement: []
        };
    }
    ngOnInit() {
        this.getPolicies();
        this.dropdownList = [
            { "id": 1, "itemName": "s3:AbortMultipartUpload" },
            { "id": 2, "itemName": "s3:CreateBucket" },
            { "id": 3, "itemName": "s3:DeleteBucket" },
            { "id": 4, "itemName": "s3:DeleteBucketPolicy" },
            { "id": 5, "itemName": "s3:DeleteObject" },
            { "id": 6, "itemName": "s3:GetBucketLocation" },
            { "id": 7, "itemName": "s3:GetBucketNotification" },
            { "id": 8, "itemName": "s3:GetBucketPolicy" },
            { "id": 9, "itemName": "s3:GetObject" },
            { "id": 10, "itemName": "s3:HeadBucket" },
            { "id": 11, "itemName": "s3:ListAllMyBuckets" },
            { "id": 12, "itemName": "s3:ListBucket" },
            { "id": 13, "itemName": "s3:ListBucketMultipartUploads" },
            { "id": 14, "itemName": "s3:ListenBucketNotification" },
            { "id": 15, "itemName": "s3:ListMultipartUploadParts" },
            { "id": 16, "itemName": "s3:PutBucketNotification" },
            { "id": 17, "itemName": "s3:PutBucketPolicy" },
            { "id": 18, "itemName": "s3:PutObject" },
            { "id": 19, "itemName": "s3:PutBucketLifecycle" },
            { "id": 20, "itemName": "s3:GetBucketLifecycle" }
        ];
        this.dropdownSettings = {
            singleSelection: false,
            text: "Select Actions",
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: true
        };
    }
    onItemSelect(item) {
        console.log(item);
        console.log(this.selectedItems);
    }
    OnItemDeSelect(item) {
        console.log(item);
        console.log(this.selectedItems);
    }
    onSelectAll(items) {
        console.log(items);
    }
    onDeSelectAll(items) {
        console.log(items);
    }
    resetPloicyForm(removeName) {
        console.log(removeName);
        this.selectedItems = [];
        if (!removeName) {
            this.newPolicy.effect = "Allow";
            this.newPolicy.bucket = "";
        }
        else {
            this.newPolicy.name = "",
                this.newPolicy.effect = "Allow";
            this.newPolicy.bucket = "";
        }
    }
    getPolicies() {
        this.apiService.getPolicies().subscribe((data) => {
            console.log(data);
            this.policies = data;
        });
    }
    deletePolicy() {
        this.apiService.deletePolicy(this.policyToDelete).subscribe((data) => {
            console.log(data);
            this.getPolicies();
        });
    }
    b64unpack(str) {
        // console.log(JSON.parse(atob(str)))
        return JSON.parse(atob(str));
    }
    rawPrepare(obj) {
        this.rawView = obj;
    }
    deletePolicyPrepare(policy) {
        this.policyToDelete = policy;
    }
    prepareNewPolicyRaw() {
        this.newPolicyRaw = {
            Version: "2012-10-17",
            Statement: []
        };
    }
    addStatement() {
        var newStatement = {
            Action: [],
            Effect: "",
            Resource: ""
        };
        if (this.selectedItems.length == 20) {
            newStatement.Action.push("s3:*");
        }
        else {
            for (var i = 0; i < this.selectedItems.length; i++) {
                newStatement.Action.push(this.selectedItems[i].itemName);
            }
        }
        newStatement.Effect = this.newPolicy.effect;
        newStatement.Resource = "arn:aws:s3:::" + this.newPolicy.bucket;
        console.log(newStatement);
        this.newPolicyRaw.Statement.push(newStatement);
        console.log(this.newPolicyRaw);
        this.resetPloicyForm(false);
    }
    removeStatement(i) {
        this.newPolicyRaw.Statement.splice(i, 1);
    }
    createPolicy() {
        console.log(this.newPolicy, this.newPolicyRaw);
        let policyString = JSON.stringify(this.newPolicyRaw);
        console.log(">>>>>>>", policyString);
        this.apiService.addPolicy(this.newPolicy.name, policyString).subscribe((data) => {
            console.log(data);
            this.getPolicies();
        });
    }
};
PoliciesComponent.ctorParameters = () => [
    { type: _api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"] }
];
PoliciesComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-policies',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./policies.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/policies/policies.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./policies.component.scss */ "./src/app/policies/policies.component.scss")).default]
    })
], PoliciesComponent);



/***/ }),

/***/ "./src/app/server/server.component.scss":
/*!**********************************************!*\
  !*** ./src/app/server/server.component.scss ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NlcnZlci9zZXJ2ZXIuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/server/server.component.ts":
/*!********************************************!*\
  !*** ./src/app/server/server.component.ts ***!
  \********************************************/
/*! exports provided: ServerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServerComponent", function() { return ServerComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../api.service */ "./src/app/api.service.ts");



let ServerComponent = class ServerComponent {
    constructor(apiService) {
        this.apiService = apiService;
        this.objectKeys = Object.keys;
    }
    ngOnInit() {
        this.serverInfo();
    }
    serverInfo() {
        this.apiService.serverInfo().subscribe((data) => {
            console.log(data);
            this.servers = data;
        });
    }
};
ServerComponent.ctorParameters = () => [
    { type: _api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"] }
];
ServerComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-server',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./server.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/server/server.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./server.component.scss */ "./src/app/server/server.component.scss")).default]
    })
], ServerComponent);



/***/ }),

/***/ "./src/app/users/users.component.scss":
/*!********************************************!*\
  !*** ./src/app/users/users.component.scss ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3VzZXJzL3VzZXJzLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/users/users.component.ts":
/*!******************************************!*\
  !*** ./src/app/users/users.component.ts ***!
  \******************************************/
/*! exports provided: UsersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersComponent", function() { return UsersComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../api.service */ "./src/app/api.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");




let UsersComponent = class UsersComponent {
    constructor(apiService) {
        this.apiService = apiService;
        this.objectKeys = Object.keys;
    }
    ngOnInit() {
        this.getListOfUsers();
        this.getListOfPolicies();
        this.resetForm();
    }
    get newUserAccess() {
        return this.validatingForm.get('newUserAccess');
    }
    get newUserSecret() {
        return this.validatingForm.get('newUserSecret');
    }
    get newUserPolicy() {
        return this.validatingForm.get('newUserPolicy');
    }
    generatePassword(length) {
        var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }
    resetForm() {
        this.validatingForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroup"]({
            newUserAccess: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](this.generatePassword(16), _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].minLength(5)),
            newUserSecret: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](this.generatePassword(24), _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].minLength(10)),
            newUserPolicy: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].minLength(0))
        });
    }
    getListOfUsers() {
        this.apiService.getUsers().subscribe((data) => {
            this.users = data;
        });
    }
    getListOfPolicies() {
        this.apiService.getPolicies().subscribe((data) => {
            this.policies = Object.keys(data);
        });
    }
    createUser() {
        var userAccess = this.newUserAccess.value;
        var userSecret = this.newUserSecret.value;
        var userPolicy = this.newUserPolicy.value;
        console.log(userPolicy);
        if (userPolicy != '') {
            this.apiService.addUserExtended(userAccess, userSecret, userPolicy).subscribe((data) => {
                console.log(data);
                this.getListOfUsers();
            });
        }
        else {
            this.apiService.addUser(userAccess, userSecret).subscribe((data) => {
                console.log(data);
                this.getListOfUsers();
            });
        }
    }
    setStatusUser(accessKey, status) {
        if (status == 'enabled') {
            status = 'disabled';
        }
        else {
            status = 'enabled';
        }
        this.apiService.setStatusUser(accessKey, status).subscribe((data) => {
            console.log(data);
            this.getListOfUsers();
        });
    }
    deleteUserPrepare(accessKey) {
        this.userToDelete = accessKey;
    }
    deleteUser() {
        this.apiService.deleteUser(this.userToDelete).subscribe((data) => {
            console.log(data);
            this.getListOfUsers();
        });
    }
};
UsersComponent.ctorParameters = () => [
    { type: _api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"] }
];
UsersComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-users',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./users.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/users/users.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./users.component.scss */ "./src/app/users/users.component.scss")).default]
    })
], UsersComponent);



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");





if (_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/rzrbld/repos/minio-ng/minio-ng/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map