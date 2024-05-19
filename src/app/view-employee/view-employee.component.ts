import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'education',
    'address',
    'dob',
    'gender',
    'company',
    'experience',
    'salary',
    'action'
  ];
  //product: Product[] = [];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
 constructor(
  private authService: AuthService,
  private toastr: ToastrService,
  private router: Router
){ }

 ngOnInit(): void{
  this.getEmployeeList();
 }
 getEmployeeList(){
  this.authService.getEmployeeList().subscribe(
    (res: any) =>{
    console.log(res);
    this.dataSource = new MatTableDataSource(res);
    this.dataSource.paginator = this.paginator;
    },
    err => {
    console.error(err);
    }
  )
 }

 deleteEmployee(id: number){
  this.authService.deleteEmployee(id).subscribe(
    (res: any) => {
      console.log(res);
      this.toastr.success('Employee deleted successfully!');
      this.getEmployeeList(); //call api/to refresh the screen
  },
  err => {
    console.error(err); 
    }
  )   
 }
 updateEmployee(id: number){
  this.router.navigate(['updateemployee', id]);
 }
 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
}
