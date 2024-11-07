import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../core/services/category.service';
import { EmailValidatorService } from '../../core/validator/email-validator.service';
import { ValidatorService } from '../../core/validator/validator.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostService } from '../../core/services/post.service';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export default class PostsComponent {

  respuesta: string = '';
  categorias: any[] = [];
  error: string = '';

  miFormulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private vs: ValidatorService,
    private emailValidator: EmailValidatorService,
    private createCategory: CategoryService,
    private createPost: PostService,
  ) {

    this.miFormulario = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      category_id: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  campoEsValido(campo: string) {
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
  }

  obtenerCategorias(): void {
    this.createCategory.categoryAll().subscribe({
      next: (response) => {
        this.categorias = response;
      },
      error: (error) => {
        console.error('Error al obtener las categorías:', error);
      }
    });
  }

  guardar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    this.createPost.createPost(this.miFormulario.value).subscribe({
      next: (resp) => {
        if (resp.message === 'Post created successfully') {
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
