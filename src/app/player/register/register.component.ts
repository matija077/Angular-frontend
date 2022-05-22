import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  /*formGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    zipCode: new FormControl(null),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(4),
    ]),
  });*/
  formGroup = this.fb.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required, Validators.email],
    zipCode: [''],
    password: ['', Validators.required, Validators.minLength(4)],
  });

  template = {
    name: '',
    lastName: '',
    email: '',
    zipCode: '',
    password: '',
  };
  @ViewChild('templateForm')
  templateForm?: NgForm

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  getControl(key: string) {
    //console.log(this.formGroup.get(key));
    return this.formGroup.get(key);
  }

  onSubmit() {
    console.log(this.formGroup);
  }

  onSubmit2() {
    console.log(this.templateForm);
  }
}
