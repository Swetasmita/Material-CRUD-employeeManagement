import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent {
  profileForm: FormGroup;
  education: string[] = [
    '10th',
    'Diploma',
    'Intermediate',
    'Graduation',
    'Post Graduate'
  ];

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: Router,
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

ngOnInit(): void{}

onSubmit() {
  if (this.profileForm.valid) {
    this.authService.addEmployee(this.profileForm.value).subscribe(
      (res: any) => {
        console.log(res);
        //alert('Employee added successfully!');     
        this.route.navigate(['viewemployee']);      
        this.toastr.success('Employee added successfully!');
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

