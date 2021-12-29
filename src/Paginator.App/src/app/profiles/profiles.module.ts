import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileDetailModule, ProfileListModule, ListDetailModule } from '@shared';
import { ProfilesRoutingModule } from './profiles-routing.module';
import { ProfilesComponent } from './profiles.component';



@NgModule({
  declarations: [
    ProfilesComponent
  ],
  imports: [
    CommonModule,
    ProfilesRoutingModule,
    ProfileListModule,
    ProfileDetailModule,
    ListDetailModule
  ]
})
export class ProfilesModule { }
