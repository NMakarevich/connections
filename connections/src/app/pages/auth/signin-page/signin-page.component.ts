import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SigninComponent } from '../../../components/signin/signin.component';

@Component({
  selector: 'app-signin-page',
  standalone: true,
  imports: [CommonModule, SigninComponent, RouterLink],
  templateUrl: './signin-page.component.html',
  styleUrl: './signin-page.component.scss',
})
export class SigninPageComponent {}
