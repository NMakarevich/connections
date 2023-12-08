import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupListComponent } from '../../components/group-list/group-list.component';
import { PeopleListComponent } from '../../components/people-list/people-list.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, GroupListComponent, PeopleListComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {}
