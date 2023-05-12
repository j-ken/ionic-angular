import { Component, OnInit } from '@angular/core';
import { ContactsService } from "../../services/contacts.service";
import { UserPreview } from "../../models/userPreview.model";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  contacts: UserPreview[] = [];

  constructor(private contactsService: ContactsService) { }

  ngOnInit() {
    this.contactsService.getContacts().subscribe((list) => {
      this.contacts = list.data;
    });
  }
}
