import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent {
  profileForm: FormGroup;
  data:any;
  education: string[] = [
    '10th',
    'Diploma',
    'Intermediate',
    'Graduation',
    'Post Graduate'
  ];

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr : ToastrService) {
    this.profileForm = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    education: [''],
    address: [''],
    dob: [''],
    gender: [''],
    company: [''],
    experience: [''],
    salary: [''],
    });
    }
//Fetch Data Using Route Parameters
ngOnInit(): void{
  const id = this.route.snapshot.paramMap.get('id');  
    if(id) {
      this.authService.getEmployeeId(id).subscribe(
        (res: any) => {
          this.data = res;
          this.profileForm.patchValue(this.data);
        },
        err => {
          console.error(err);
          this.toastr.error('Failed to fetch employee details');
        }
      );
    }  
}

onSubmit() {
  if (this.profileForm.valid) {
    if(this.data)
    this.authService.updateEmployee(this.data.id, this.profileForm.value).subscribe(
      (res: any) => {
        console.log(res);            
        this.router.navigate(['viewemployee']);      
        this.toastr.success('Employee deatils updated!');
      },
      err => {
        console.error(err);
        //alert('An error occurred while adding the employee.');
        this.toastr.warning("An error occurred while adding the employee!");
      }
    );
  } else {
    alert('Please fill in the form correctly.');
  }
}
  resetForm() {
    this.profileForm.reset();
  }
}

