import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AbstractControlOptions,
  Form,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { finalize } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth-service/auth-service.service';
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
  @ViewChild('reactiveFormRef')
  reactiveFormRef?: ElementRef<HTMLFormElement>;
  isSubmittingReactive = false;

  // TEMPLATE PART
  template = {
    name: '',
    lastName: '',
    email: '',
    zipCode: '',
    password: '',
    confirmPassword: '',
  };
  @ViewChild('templateForm')
  templateForm?: NgForm;

  constructor(
    private fb: FormBuilder,
    private CustomValidators: CustomValidatorsService,
    // this is an acutal DOM element passed by Angular of this component
    private el: ElementRef,
    private authService: AuthServiceService
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
      email: [
        '',
        {
          validators: [Validators.required, Validators.email],
          asyncValidator: this.CustomValidators.EmailValidator,
          updateOn: 'blur',
        },
      ],
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
      hobbies: this.fb.array([], { updateOn: 'blur' }),
    };
    const options: AbstractControlOptions = {
      //validators: [this.CustomValidators.Form.bind(this.CustomValidators)],
    };
    this.formGroup = this.fb.group(controlsConfig, options);
  }

  ngOnInit(): void {}

  ngAfterViewChecked() {}

  onAddHobby() {
    const g = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      duration: [null],
    });

    const hobbies = this.formGroup.controls['hobbies'] as FormArray;
    hobbies.push(g);
  }

  deleteHobby(index: number) {
    let hobbies = this.getHobbies();
    hobbies.controls = [
      ...hobbies.controls.slice(0, index),
      ...hobbies.controls.slice(index + 1),
    ];
  }

  getControl(key: string) {
    return this.formGroup.get(key);
  }

  getHobbies(): FormArray {
    return this.getControl('hobbies') as FormArray;
  }

  private togglePasswordVisibility(passwordInput: HTMLInputElement) {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  }

  showPassword(passwordInput: HTMLInputElement) {
    //this.togglePasswordVisibility(passwordInput);
  }

  onSubmit(event: Event) {
    event.preventDefault();

    if (!this.formGroup.valid || this.formGroup.invalid) {
      return;
    }

    this.isSubmittingReactive = true;
    this.formGroup.reset();

    const registerSubscription = this.authService
      .register(this.formGroup.value)
      .pipe(finalize(() => (this.isSubmittingReactive = false)));

    registerSubscription.subscribe({
      next: (data) => {},
      error: (err) => console.error('error registeringP'),
    });
  }

  onSubmit2() {
    console.log(this.templateForm);
  }
}
