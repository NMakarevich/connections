import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProfileComponent } from '../../components/profile/profile.component';
import { ButtonComponent } from '../../components/UI/button/button.component';
import { COLOR_BLUE } from '../../utils/consts';
import { logout } from '../../redux/actions/auth.actions';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [ProfileComponent, ButtonComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  constructor(private readonly store: Store) {}

  logout() {
    this.store.dispatch(logout());
  }

  protected readonly COLOR_BLUE = COLOR_BLUE;
}
