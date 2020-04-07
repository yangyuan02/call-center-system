import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'user', loadChildren: () => import('src/app/pages/user/user.module').then(m => m.UserModule) },
  { path: 'home', loadChildren: () => import('src/app/pages/home/home.module').then(m => m.HomeModule) },
  {
    path: 'organization', 
    loadChildren: () => import('src/app/pages/organization-manage/organization-manage.module').then(m => m.OrganizationModule)
  },
  {
    path: 'gift',
    loadChildren: () => import('src/app/pages/gift-manage/gift-manage.module').then(m => m.GiftModule)
  },
  {
    path: 'listAssignment',
    loadChildren: () => import('src/app/pages/list-assignment/list-assignment.module').then(m => m.ListAssignMentModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
