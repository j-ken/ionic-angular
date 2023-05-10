import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {List} from "../models/list.model";

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private apiKey = '62a040dc29e7d125231500c1';
  private apiUrl = 'https://dummyapi.io/data/v1/user';
  constructor(private http: HttpClient) { }

  public getContacts(): Observable<List> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'app-id': this.apiKey
      })
    }

    return this.http.get<List>(this.apiUrl, httpOptions);
  }

}
