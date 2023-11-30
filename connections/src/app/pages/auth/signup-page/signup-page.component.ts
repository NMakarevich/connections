import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SignupComponent } from '../../../components/signup/signup.component';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [CommonModule, SignupComponent, RouterLink],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss',
})
export class SignupPageComponent {}
