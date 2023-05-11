import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'contacts',
    pathMatch: 'full'
  },
  {
    path: 'contacts',
    loadChildren: () => import('./pages/contacts-list/contacts-list.module').then( m => m.ContactsListPageModule)
  },
  {
    path: 'contact-detail/:id',
    loadChildren: () => import('./pages/contact-detail/contact-detail.module').then( m => m.ContactDetailPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
