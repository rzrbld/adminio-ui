import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { UsersComponent } from './users/users.component';
import { FormsModule, FormControl, FormGroup, Validators, ReactiveFormsModule} from "@angular/forms";
import { ServerComponent } from './server/server.component';
import { FilterPipe } from './filter.pipe';
import { PoliciesComponent } from './policies/policies.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './loader.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { LoaderInterceptor } from './loader.interceptor';
import { BucketsComponent } from './buckets/buckets.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { GroupsComponent } from './groups/groups.component';



@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    ServerComponent,
    FilterPipe,
    PoliciesComponent,
    LoaderComponent,
    BucketsComponent,
    GroupsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    NgxJsonViewerModule,
    AngularMultiSelectModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
