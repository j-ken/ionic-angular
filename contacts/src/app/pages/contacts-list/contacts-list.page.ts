import { Component, OnInit } from '@angular/core';
import { ContactsService } from "../../services/contacts.service";
import {UserPreview} from "../../models/userPreview.model";

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.page.html',
  styleUrls: ['./contacts-list.page.scss'],
})
export class ContactsListPage implements OnInit {
  contacts: UserPreview[] = [];

  constructor(private contactsService: ContactsService) { }

  ngOnInit() {
    this.contactsService.getContacts().subscribe((list) => {
      this.contacts = list.data;
    });
  }

}
