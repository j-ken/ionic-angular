import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors, ValidatorFn,
  Validators
} from "@angular/forms";

import { UserFull } from "../../models/userFull.model";
import { ContactsService } from "../../services/contacts.service";
import * as moment from "moment";
import { Router } from '@angular/router';
import { NewUserPreviewService } from "../../services/new-user-preview.service";

// TODO: customValidator not working
export function customValidator(): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const firstName = form.get('firstName')?.value;
    const lastName = form.get('lastName')?.value;
    const email = form.get('email')?.value;

    if (firstName && lastName && email) {
      if ((firstName || lastName || email) &&
        (!firstName || !lastName || !email)) {
        return { requiredFields: true };
      }
    }
    return null;
  }
}

export function birthdateValidator(control: AbstractControl): ValidationErrors | null {
  const birthdate = control.value;
  if (!birthdate) return null;
  const isValid = moment(birthdate, "YYYY/MM/DD", true).isValid();

  if (!isValid) {
    return { invalidBirthdate: true };
  }

  const minDate = moment("1900/01/01", "YYYY/MM/DD");
  const maxDate = moment();

  if (!moment(birthdate, "YYYY/MM/DD").isBetween(minDate, maxDate, "day", "[]")) {
    return { outOfRange: true };
  }

  return null;
}


@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.page.html',
  styleUrls: ['./new-contact.page.scss'],
})
export class NewContactPage implements OnInit {
  contactForm: FormGroup;
  postFailed: boolean = false;
  postFailedErrorMsg: Record<string, any>;
  validationMessages = {
    // https://ionicthemes.com/tutorials/forms-and-validation-in-ionic
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

  constructor(
    private contactsService: ContactsService,
    private newUserPreviewService: NewUserPreviewService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.initContactForm();
  }

  ionViewWillEnter() {
    // clear form
    this.initContactForm();
  }

  initContactForm() {
    this.contactForm = new FormGroup({
      picture: new FormControl(''),
      title: new FormControl(''),
      firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      gender: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl(''),
      dateOfBirth: new FormControl('', [birthdateValidator]),
      location: new FormGroup({
        street: new FormControl('', [Validators.minLength(5), Validators.maxLength(100)]),
        city: new FormControl('', [Validators.minLength(2), Validators.maxLength(30)]),
        state: new FormControl('', [Validators.minLength(2), Validators.maxLength(30)]),
        country: new FormControl('', [Validators.minLength(2), Validators.maxLength(30)]),
        timezone: new FormControl('')
      })
    }, {
      validators: [ customValidator() ]
    });

  }



  save() {
    // TODO: form validation does not work properly, so i'm turning off the check
    // if (this.contactForm.invalid) {
    //   return;
    // }

    // convert YYYY/MM/DD to ISO date format
    let isoDate: string;
    const date = moment.utc(this.contactForm.value.dateOfBirth, "YYYY/MM/DD");
    if (date.isValid()) isoDate = date.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    else isoDate = this.contactForm.value.dateOfBirth;

    const newUser: UserFull = {
      id: '', // This will be generated by the API
      title: this.contactForm.value.title || undefined,
      firstName: this.contactForm.value.firstName,
      lastName: this.contactForm.value.lastName,
      gender: this.contactForm.value.gender || undefined,
      email: this.contactForm.value.email,
      dateOfBirth: isoDate,
      registerDate: '', // This will be generated by the API
      phone: this.contactForm.value.phone || undefined,
      picture: this.contactForm.value.picture,
      // location: this.contactForm.value.location as Location
      // TODO: state & timezone
      location: {
        street: this.contactForm.value.location.street,
        city: this.contactForm.value.location.city,
        state: '',
        country: this.contactForm.value.location.country,
        timezone: ''
      }
    };

    this.contactsService.addContact(newUser).subscribe(
      success => {
        this.postFailed = false;
        this.postFailedErrorMsg = {};

        // add ID from API response to newUser
        newUser.id = success.id;
        this.newUserPreviewService.setNewUser(newUser);
        this.router.navigate(['contacts']);
      },
      error => {
        // inform the user that something went wrong
        this.postFailed = true;
        this.postFailedErrorMsg = error.error.data;
      }
    );
  }

}
