import { Component, OnInit } from '@angular/core';
import { ContactsService } from "../../services/contacts.service";
import { UserPreview } from "../../models/userPreview.model";
import { NewUserService } from "../../services/new-user.service";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  contacts: UserPreview[] = [];

  constructor(
    private contactsService: ContactsService,
    private newUserService: NewUserService,
  ) { }


  ngOnInit() {
    this.contactsService.getContacts().subscribe((list) => {
      this.contacts = list.data;
    });
  }

  ionViewWillEnter() {
    // https://ionicframework.com/docs/angular/lifecycle
    // this.contactsService.getContacts().subscribe((list) => {
    //   this.contacts = list.data;
    // });

    // Retrieve the newly added user from the shared service
    const newUser = this.newUserService.getNewUser();
    if (newUser) {
      this.contacts.push(newUser);
      // Clear the stored user in the shared service, otherwise it will be added repeatedly
      this.newUserService.setNewUser(null);
    }
  }

}
