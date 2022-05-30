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
  @ViewChild('reactiveFormRef')
  reactiveFormRef?: ElementRef<HTMLFormElement>;

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
    private CustomValidators: CustomValidatorsService,
    // this is an acutal DOM element passed by Angular of this component
    private el: ElementRef
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

  scrollToFirstError() {
    const invalidInputs =
      this.reactiveFormRef?.nativeElement.getElementsByClassName(
        'ng-invalid'
      ) ?? [];
    const firstInvalidInput = invalidInputs[0];
    if (!firstInvalidInput) {
      return;
    }

    const scrollElementToTop = (element: Element) => {
      const { top } = element.getBoundingClientRect();

      window.scrollTo({
        top: document.documentElement.scrollTop + top,
        behavior: 'smooth',
      });
    };

    const focusElement = (element: Element, preventScroll = false) => {
      (element as any).focus({ preventScroll });
    };

    scrollElementToTop(firstInvalidInput);
    focusElement(firstInvalidInput, true);
  }

  onSubmit() {
    if (!this.formGroup.valid || this.formGroup.invalid) {
      this.scrollToFirstError();
    } else {
    }
  }

  onSubmit2() {
    console.log(this.templateForm);
  }
}
