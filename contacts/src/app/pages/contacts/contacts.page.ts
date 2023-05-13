import { Component, OnInit } from '@angular/core';
import { ContactsService } from "../../services/contacts.service";
import { UserPreview } from "../../models/userPreview.model";
import { NewUserPreviewService } from "../../services/new-user-preview.service";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  contacts: UserPreview[] = [];

  constructor(
    private contactsService: ContactsService,
    private newUserPreviewService: NewUserPreviewService,
  ) { }


  ngOnInit() {
    this.contactsService.getContacts().subscribe((list) => {
      this.contacts = list.data;
    });
  }

  ionViewWillEnter() {
    // https://ionicframework.com/docs/angular/lifecycle
    // Retrieve the newly added user from the shared service
    const newUser = this.newUserPreviewService.getNewUser();
    if (newUser) {
      this.contacts.push(newUser);
      // Clear the stored user in the shared service, otherwise it will be added repeatedly
      this.newUserPreviewService.setNewUser(null);
    }
  }

  deleteUser(id: string) {
    this.contactsService.deleteContact(id).subscribe(
      success => {
        this.contacts = this.contacts.filter(contact => contact.id !== id);
      },
      error => {
        console.log(error)
      }
    )
  }
}
