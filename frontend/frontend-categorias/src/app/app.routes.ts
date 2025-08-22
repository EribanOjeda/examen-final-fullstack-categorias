import { Routes } from '@angular/router';
import { CategoriasComponent } from './categorias/categorias.component';

export const routes: Routes = [
  { path: '', redirectTo: 'categorias', pathMatch: 'full' },
  { path: 'categorias', component: CategoriasComponent },
  { path: '**', redirectTo: 'categorias' }
];
