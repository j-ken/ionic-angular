import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserFull } from "../../models/userFull.model";
import { ContactsService } from "../../services/contacts.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { birthdateValidator } from "../new-contact/new-contact.page";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  id: string | null = '';
  contact: FormGroup;
  readonly: boolean = true;
  editBtnLabel: string = 'Edit';
  postFailed: boolean = false;
  postFailedErrorMsg: Record<string, any>;
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
      { type: 'invalidBirthdate', message: 'Please enter a valid date in the format DD/MM/YYYY.' },
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
    private activatedRoute: ActivatedRoute,
    private contactsService: ContactsService,
  ) { }

  ngOnInit() {
    this.getId();
    this.getUserFromApi();
  }

  getId() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  getUserFromApi() {
    this.contactsService.getContactById(this.id).subscribe((user) => {
      this.contact = new FormGroup({
        picture: new FormControl(user.picture),
        title: new FormControl({ value: user.title, disabled: this.readonly }),
        firstName: new FormControl(user.firstName, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
        lastName: new FormControl(user.lastName, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
        gender: new FormControl({ value: user.gender, disabled: this.readonly }),
        email: new FormControl(user.email, [Validators.required, Validators.email]),
        phone: new FormControl(user.phone),
        dateOfBirth: new FormControl(user.dateOfBirth, [birthdateValidator]),
        location: new FormGroup({
          street: new FormControl(user.location.street, [Validators.minLength(5), Validators.maxLength(100)]),
          city: new FormControl(user.location.city, [Validators.minLength(2), Validators.maxLength(30)]),
          state: new FormControl(user.location.state, [Validators.minLength(2), Validators.maxLength(30)]),
          country: new FormControl(user.location.country, [Validators.minLength(2), Validators.maxLength(30)]),
          timezone: new FormControl(user.location.timezone)
        })
      });
    })
  }

  convertDateToString(date: String): String {
    if (!date) return '';
    const d = new Date(date as string);
    // https://stackoverflow.com/questions/11591854/format-date-to-mm-dd-yyyy-in-javascript
    const dateString = ((d.getDate() > 9) ? d.getDate() : ('0' + d.getDate()))  + '/' + ((d.getMonth() > 8) ? (d.getMonth() + 1) : ('0' + (d.getMonth() + 1))) + '/' + d.getFullYear();
    return dateString;
  }

  toggleEditing() {
    this.toggleReadOnly();
    this.toggleEditBtnLabel();
  }

  toggleReadOnly() {
    this.readonly = !this.readonly;
  }

  toggleEditBtnLabel() {
    this.editBtnLabel = this.readonly ? 'Edit' : 'Cancel';
  }

  update() {
    const updatedUser: UserFull = {
      id: this.contact.value.id,
      title: this.contact.value.title,
      firstName: this.contact.value.firstName,
      lastName: this.contact.value.lastName,
      gender: this.contact.value.gender,
      email: this.contact.value.email,
      dateOfBirth: this.contact.value.dateOfBirth,
      registerDate: this.contact.value.registerDate,
      phone: this.contact.value.phone,
      picture: this.contact.value.picture,
      location: {
        street: this.contact.value.location.street,
        city: this.contact.value.location.city,
        state: this.contact.value.state,
        country: this.contact.value.location.country,
        timezone: this.contact.value.timezone
      }
    };

    this.contactsService.updateContact(updatedUser).subscribe(
      success => {
        console.log('Contact created successfully:', success);
        this.toggleEditing();
      },
      error => {
        console.log(error)
        // TODO: If something goes wrong when sending the request to the api, alert the user and stay in editing mode
      }
    )
  }
}
