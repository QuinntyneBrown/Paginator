import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile, ProfileService } from '@api';
import { Destroyable } from '@core';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';


@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent extends Destroyable {

  private readonly _refreshSubject: BehaviorSubject<null> = new BehaviorSubject(null);

  readonly vm$ = this._refreshSubject
  .pipe(
    switchMap(_ => combineLatest([
      this._profileService.get(),
      this._activatedRoute
      .paramMap
      .pipe(
        map(x => x.get("profileId")),
        switchMap(profileId => profileId ? this._profileService.getById({ profileId }) : of({ }))
        )
    ])),
    map(([profiles, selected]) => ({ profiles, selected }))
  );

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _router: Router,
    private readonly _profileService: ProfileService
  ) {
    super();
  }

  public handleSelect(profile: Profile) {
    if(profile.profileId) {
      this._router.navigate(["/","profiles","edit", profile.profileId]);
    } else {
      this._router.navigate(["/","profiles","create"]);
    }
  }

  public handleSave(profile: Profile) {
    const obs$  = profile.profileId ? this._profileService.update({ profile }) : this._profileService.create({ profile });
    obs$
    .pipe(
      takeUntil(this._destroyed$),
      tap(_ => {
        this._refreshSubject.next(null);
        this._router.navigate(["/","profiles"]);
      }))
    .subscribe();
  }
}
