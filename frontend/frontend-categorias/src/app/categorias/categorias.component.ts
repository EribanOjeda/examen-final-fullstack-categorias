import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categoria } from '../models/categoria';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  categorias: Categoria[] = [];
  loading = false;
  errorMsg = '';
  successMsg = '';

  form: any;   // ✅ solo declaramos, no usamos this.fb aquí

  constructor(
    private fb: NonNullableFormBuilder,
    private categoriaSrv: CategoriaService
  ) {
    // ✅ aquí ya podemos usar fb
    this.form = this.fb.group({
      nombre: this.fb.control('', {
        validators: [Validators.required, Validators.maxLength(100)]
      })
    });
  }

  get nombreCtrl() { return this.form.controls.nombre; }

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.loading = true;
    this.errorMsg = '';
    this.categoriaSrv.listar().subscribe({
      next: (data) => { this.categorias = data ?? []; this.loading = false; },
      error: () => { this.errorMsg = 'Error al cargar categorías'; this.loading = false; }
    });
  }

  guardar(): void {
    this.errorMsg = '';
    this.successMsg = '';

    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    const nombre = this.nombreCtrl.value.trim();
    if (!nombre) { this.errorMsg = 'El nombre es obligatorio.'; return; }

    this.categoriaSrv.crear(nombre).subscribe({
      next: () => {
        this.successMsg = 'Categoría registrada.';
        this.form.reset();
        this.nombreCtrl.setValue('');
        this.cargar();
      },
      error: (err) => {
        if (err?.status === 422) this.errorMsg = 'El nombre es requerido, máx. 100 y no repetido.';
        else this.errorMsg = 'No se pudo guardar la categoría.';
      }
    });
  }
}
