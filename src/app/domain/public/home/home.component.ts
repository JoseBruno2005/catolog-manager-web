import { Component, inject, signal } from '@angular/core';
import { headerComponent } from '../../../shared/components/header/header.component';
import { categories } from './constants';
import { Chip } from 'primeng/chip';

@Component({
  selector: 'app-home',
  imports: [
    headerComponent,
    Chip
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly categories = categories;
  readonly selectedCategory = signal('todas');

  selectCategory(label: string) {
    this.selectedCategory.set(label);
  }
}
