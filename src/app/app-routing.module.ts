import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { ServerComponent } from './server/server.component';
import { PoliciesComponent } from './policies/policies.component';
import { BucketsComponent } from './buckets/buckets.component';

const routes: Routes = [
	{path:'users', component: UsersComponent},
	{path:'server', component: ServerComponent},
	{path:'policies', component: PoliciesComponent},
	{path:'', component: BucketsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
