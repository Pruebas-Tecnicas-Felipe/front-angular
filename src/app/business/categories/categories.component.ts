import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistroService } from '../../core/services/registro.service';
import { EmailValidatorService } from '../../core/validator/email-validator.service';
import { ValidatorService } from '../../core/validator/validator.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../core/services/category.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export default class CategoriesComponent {

  respuesta: string = '';

  miFormulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private vs: ValidatorService,
    private emailValidator: EmailValidatorService,
    private createCategory: CategoryService
  ) {

    this.miFormulario = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  campoEsValido(campo: string) {
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
  }

  guardar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    this.createCategory.createCategory(this.miFormulario.value).subscribe({
      next: (resp) => {
        if (resp.message === 'Category created successfully') {
          this.respuesta = 'success';
        } else {
          this.respuesta = 'error';
        }
      },
      error: (err) => {
        console.error('Error al enviar los datos', err);
        this.respuesta = 'error';
      }
    });

    this.miFormulario.reset();
  }

}
