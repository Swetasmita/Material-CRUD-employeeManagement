import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';

const routes: Routes = [
   { path: 'viewemployee', component: ViewEmployeeComponent },
   { path: '', redirectTo: '/viewemployee', pathMatch: 'full' }, 
    { path: 'create', component: CreateEmployeeComponent },       
    { path: 'updateemployee/:id', component: UpdateEmployeeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
