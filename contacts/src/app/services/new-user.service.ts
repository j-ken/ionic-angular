import { Injectable } from '@angular/core';
import { UserPreview } from "../models/userPreview.model";

@Injectable({
  providedIn: 'root'
})
export class NewUserService {
  private newUser: UserPreview | null;

  constructor() { }

  setNewUser(user: UserPreview | null) {
    this.newUser = user;
  }

  getNewUser(): UserPreview | null {
    return this.newUser;
  }
}
