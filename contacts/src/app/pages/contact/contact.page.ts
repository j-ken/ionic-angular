import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserFull } from "../../models/userFull.model";
import { ContactsService } from "../../services/contacts.service";
// import { NewUserFullService } from "../../services/new-user-full.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  id: string | null = '';
  // @ts-ignore
  contact: UserFull;
  readonly: Boolean = true;
  editBtnLabel: String = 'Edit';

  constructor(
    private activatedRoute: ActivatedRoute,
    private contactsService: ContactsService,
    // private newUserFullService: NewUserFullService,
  ) { }

  ngOnInit() {
    this.getId();
    // this.getUserFromFullService();
    this.getUserFromApi();
  }

  getId() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  getUserFromApi() {
    this.contactsService.getContactById(this.id).subscribe((user) => {
      this.contact = user;
    })
  }

  // getUserFromFullService() {
  //   // retrieve the updated user from the shared service
  //   const newUserFull = this.newUserFullService.getNewUserFullById(this.id);
  //   if (newUserFull) {
  //     this.contact = newUserFull;
  //   }
  //   console.log("getUserFromFullService this.contact ", this.contact)
  // }

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

  save() {
    this.contactsService.updateContact(this.contact).subscribe(
      updatedContact => {
        console.log('Contact created successfully:', updatedContact);
        this.toggleEditing();
      },
    )
  }
}
