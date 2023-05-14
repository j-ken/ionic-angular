import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent  implements OnInit {
  @Input() contact: FormGroup;
  @Input() readonly: boolean = true;
  @Input() postFailed: boolean = false;
  @Input() postFailedErrorMsg: Record<string, any>;

  validationMessages = {
    'firstName': [
      { type: 'required', message: 'Input is required.' },
      { type: 'minlength', message: 'Input must be at least 2 characters long.' },
      { type: 'maxlength', message: 'Input cannot be more than 50 characters long.' },
    ],
    'lastName': [
      { type: 'required', message: 'Input is required.' },
      { type: 'minlength', message: 'Input must be at least 2 characters long.' },
      { type: 'maxlength', message: 'Input cannot be more than 50 characters long.' },
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'email', message: 'Please enter a valid email address.' },
    ],
    'dateOfBirth': [
      { type: 'invalidBirthdate', message: 'Please enter a valid date in the format YYYY/MM/DD.' },
      { type: 'outOfRange', message: 'Birthday must be between 01/01/1900 and today.' }
    ],
    'street': [
      { type: 'minlength', message: 'Street must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Street cannot be more than 100 characters long.' }
    ],
    'city': [
      { type: 'minlength', message: 'City must be at least 2 characters long.' },
      { type: 'maxlength', message: 'City cannot be more than 30 characters long.' }
    ],
    'country': [
      { type: 'minlength', message: 'Country must be at least 2 characters long.' },
      { type: 'maxlength', message: 'Country cannot be more than 30 characters long.' }
    ],
  };

  constructor() { }

  ngOnInit() {}

}
