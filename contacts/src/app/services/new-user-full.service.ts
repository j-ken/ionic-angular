import { Injectable } from '@angular/core';
import { UserFull } from "../models/userFull.model";

@Injectable({
  providedIn: 'root'
})
export class NewUserFullService {
  private newUserFull: UserFull[] = [];

  addNewUserFull(user: UserFull): void {
    this.newUserFull.push(user);
  }

  getNewUserFullById(id: string | null): UserFull | undefined {
    return this.newUserFull.find(user => user.id === id);
  }

}
