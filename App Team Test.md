# Ionic Project

This project consists of re-creating a small contact app. The app should be able to show a list of contacts, create, edit and delete a contact.

## API

We'll use an existing API to get the contacts. https://dummyapi.io/docs/user

Use this API Key `62a040dc29e7d125231500c1`

## Models

Get the best out of Typescript, use models

### List

```ts
export interface List {
  data: UserPreview[];
  total: number;
  page: number;
  limit: number;
}

export interface UserPreview {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  picture: string;
}

export interface UserFull {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  picture: string;
  gender: string;
  email: string;
  dateOfBirth: string;
  registerDate: string;
  phone: string;
  location: Location
}

export interface Location {
  street: string;
  city: string;
  state: string;
  country: string;
  timezone: string;
}

```

## 1. Creating the app

https://ionicframework.com/docs/

Create a new Ionic application runing the command `ionic start` using Angular and give it the name **contacts**. You can use whatever starter template you want.

Make sure you install the Ionic cli first `npm install -g @ionic/cli`

## 2. Get the data from the api

- https://angular.io/guide/http
- https://angular.io/guide/http#sending-data-to-a-server

Create a new service called `contacts.service.ts` containing the calls to the api to get and modify the data. 

- GET: get all contacts: https://dummyapi.io/data/v1/user
- GET: get contact details: https://dummyapi.io/data/v1/user/:id
- POST: create contact: https://dummyapi.io/data/v1/user/create (firstName, lastName and email are required in the body)
- PUT: edit contact details: https://dummyapi.io/data/v1/user/:id
- DELETE: delete the contact: https://dummyapi.io/data/v1/user/:id

Don't forget to set the api key in the request header. You can either create an interceptor which adds the api key to the request https://angular.io/guide/http#setting-default-headers or you can set the headers manually before each request https://angular.io/guide/http-send-data-to-server#add-and-updating-headers

**Example**

```ts
public getContacts(): Observable<List> {

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'app-id': 'my-dummyapi-token'
    })
  }

  return this.http.get<List>(this.configUrl, httpOtions);
}
```

## 3. List view

[Find the design here](https://www.figma.com/file/7ixBHueGrRfPgbhUsjWgEZ/contacts?type=design&node-id=0%3A1&t=w3Q0YzAdmwAWsUxB-1)

Once you get the data from the api, you can start crafting the UI. Display the list of contacts with their picture and title, firstName, lastName. 

https://ionicframework.com/docs/api/list

When the user taps on a list item, the app should navigate to a new page to display the contact details.

When the user swipes left on a list item, the delete button should appear https://ionicframework.com/docs/api/item-sliding
> If you feel comfortable so far, feel free to display an alert to the user asking him to confirm or not the deletion.

## 4. Contact Details

When the user taps on a list item, the app should navigate to a new page to display the contact details.

Display all the contact data. If a field is missing in the contact object, make sure it is not displayed in the view.

When the user taps on "Edit", the view should swicth to a form prefilled with the contact data.

When user taps on "Save" the view switches back to the regular view with the updated data. If something goes wrong when sending the request to the api, alert the user and stay in editing mode.

When user taps on "Cancel" the view switches back the regular view.

When user taps on "Back", cancel the editing of the form and navigate back to the list view.

## 5. New contact

When the user clic on the "New" button, the app should navigate to a new page containing a form in order to enter the new contact data. 

https://angular.io/guide/reactive-forms

https://ionicframework.com/docs/api/input

When the user clic on Cancel, the app should navigate back to the list view.

When the user clic on Save, the app should navigate back as well if the contact has been properly created, otherwise inform the user that something went wrong. Refresh the list view to show the new contact.

Fields
- title (radio: mr, ms, mrs, miss, dr)
- first name
- last name
- gender (radio: male, female)
- email
- phone number
- birthday (date picker would be awesome, otherwise text input is ok)
- location 
  - street
  - city
  - country
- picture

> The form to edit or create a contact should be the same. The only difference is that in the case of an edit, you can prefill the form with the contact data. Create a reusable component containing the form and taking contact as [input (doc)](https://angular.io/guide/component-interaction#pass-data-from-parent-to-child-with-input-binding).

## 6. Build and deploy

As soon as you have a functional app, you can deploay it to a simulator or a phone. But first you have to install (Capacitor)[https://capacitorjs.com/docs]. Capacitor is a bridge between the web app and the system which empowers our web app with native capabilities.

- install capacitor `npm i @capacitor/core`
- init capacitor `npx cap init`
  - give any package id, for example `ch.coop.contacts`
- add plateforms that your app should supports
  - `npx cap add android`
  - `npx cap add ios`
- sync your code to the native project `npx cap sync`
- open the ide you want to test your app on
  - `npx cap open ios`
  - `npx cap open android`
- choose a target (phone or simulator) and run your app






