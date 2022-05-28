import { AfterViewChecked, Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { CustomValidatorsService } from 'src/app/services/validators/customValidators.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, AfterViewChecked {
  // REACTIVE PART
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
  formGroup: FormGroup;

  // TEMPLATE PART
  template = {
    name: '',
    lastName: '',
    email: '',
    zipCode: '',
    password: '',
  };
  @ViewChild('templateForm')
  templateForm?: NgForm;

  constructor(
    private fb: FormBuilder,
    private CustomValidators: CustomValidatorsService
  ) {
    const controlsConfig = {
      name: [
        '',
        {
          validators: [Validators.required, Validators.minLength(4)],
          updateOn: 'blur',
        },
      ],
      lastName: [
        '',
        {
          validators: [Validators.required, Validators.minLength(4)],
          updateOn: 'blur',
        },
      ],
      email: ['', { validators: [Validators.required, Validators.email] }],
      zipCode: [
        '',
        {
          validators: [
            this.CustomValidators.ZipCodeValidator.bind(
              this.CustomValidators,
              'hr'
            ),
          ],
          updateOn: 'change',
        },
      ],
      password: [
        '',
        { validators: [Validators.required, Validators.minLength(4)] },
      ],
    };
    const options: AbstractControlOptions = {
      //validators: [this.CustomValidators.Form.bind(this.CustomValidators)],
    };
    this.formGroup = this.fb.group(controlsConfig, options);
  }

  ngOnInit(): void {}

  ngAfterViewChecked() {
    //console.log(this.formGroup);
    //console.log(this.templateForm);
  }

  getControl(key: string) {
    //console.log(this.formGroup.get(key));
    return this.formGroup.get(key);
  }

  onSubmit() {
    //console.log(this.formGroup.controls['name']);
    console.log(this.formGroup);
  }

  onSubmit2() {
    console.log(this.templateForm);
  }
}
