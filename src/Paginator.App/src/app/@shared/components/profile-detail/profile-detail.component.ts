import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Profile } from '@api';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent {

  readonly form: FormGroup = new FormGroup({
    profileId: new FormControl(null, []),
    name: new FormControl(null, [Validators.required])
  });

  public get profile(): Profile { return this.form.value as Profile; }

  @Input("profile") public set profile(value: Profile) {
    if(!value?.profileId) {
      this.form.reset({
        name: null
      })
    } else {
      this.form.patchValue(value);
    }
  }

  @Output() save: EventEmitter<Profile> = new EventEmitter();

}

@NgModule({
  declarations: [
    ProfileDetailComponent
  ],
  exports: [
    ProfileDetailComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule
  ]
})
export class ProfileDetailModule { }
