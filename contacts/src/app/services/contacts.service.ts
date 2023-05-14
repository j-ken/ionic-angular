import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable, throwError} from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { List } from "../models/list.model";
import { UserFull } from "../models/userFull.model";

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private apiKey = '62a040dc29e7d125231500c1';
  private apiUrl = 'https://dummyapi.io/data/v1/user';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'app-id': this.apiKey
    })
  }

  constructor(
    private http: HttpClient
  ) { }

  public getContacts(): Observable<List> {
    return this.http.get<List>(this.apiUrl, this.httpOptions)
      .pipe(
        catchError((error: any) => {
          console.error('Failed to get contacts:', error);
          return throwError(error);
        })
      );
  }

  public getContactById(id: String | null): Observable<UserFull> {
    return this.http.get<UserFull>(this.apiUrl + "/" + id, this.httpOptions);
  }

  updateContact(contact: UserFull): Observable<UserFull> {
    const updatedData = { ...contact };

    // make sure the original email is not being overwritten
    updatedData.email = contact.email;

    return this.http.put<UserFull>(this.apiUrl + "/" + updatedData.id, updatedData, this.httpOptions)
      .pipe(
        catchError((error: any) => {
          console.error('Failed to update contact:', error);
          return throwError(error);
        })
      );
  }

  addContact(contact: UserFull): Observable<UserFull> {
    if (contact.firstName && contact.lastName && contact.email) {
      return this.http.post<UserFull>(this.apiUrl + "/create", contact, this.httpOptions)
        .pipe(
          catchError((error: any) => {
            console.error('Failed to add contact:', error);
            return throwError(error);
          })
        );
    } else {
      console.error('Failed to update contact: because of missing firstName, lastName or email');
      return throwError('Missing required fields');
    }
  }

  deleteContact(id: string): Observable<string> {
    return this.http.delete<void>(this.apiUrl + "/" + id, this.httpOptions)
      .pipe(
        map(() => id), // Return the ID of the deleted user
        catchError((error: any) => {
          console.error('Failed to delete contact:', error);
          return throwError(error);
        })
      );
  }
}
