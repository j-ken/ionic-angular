import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserFull } from "../../models/userFull.model";
import { ContactsService } from "../../services/contacts.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  contactId: string | null = '';
  // @ts-ignore
  contact: UserFull;
  readonly: Boolean = true;

  constructor(private activatedRoute: ActivatedRoute, private contactsService: ContactsService) { }

  ngOnInit() {
    this.contactId = this.activatedRoute.snapshot.paramMap.get('id') as string;

    this.contactsService.getContact(this.contactId).subscribe((user) => {
      this.contact = user;
    })
  }

  convertDateToString(date: String): String {
    const d = new Date(date as string);
    // https://stackoverflow.com/questions/11591854/format-date-to-mm-dd-yyyy-in-javascript
    const dateString = ((d.getDate() > 9) ? d.getDate() : ('0' + d.getDate()))  + '/' + ((d.getMonth() > 8) ? (d.getMonth() + 1) : ('0' + (d.getMonth() + 1))) + '/' + d.getFullYear();
    return dateString;
  }

}
