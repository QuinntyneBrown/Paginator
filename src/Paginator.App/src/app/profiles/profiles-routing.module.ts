import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilesComponent } from './profiles.component';

const routes: Routes = [
  { path: '', component: ProfilesComponent },
  { path: 'create', component: ProfilesComponent },
  { path: 'edit/:profileId', component: ProfilesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilesRoutingModule { }
