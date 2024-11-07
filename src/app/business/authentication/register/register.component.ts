import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorService } from '../../../core/validator/validator.service';
import { EmailValidatorService } from '../../../core/validator/email-validator.service';
import { RegistroService } from '../../../core/services/registro.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export default class RegisterComponent implements OnInit {

  respuesta: string = '';

  // Inicialización de miFormulario en el constructor
  miFormulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private vs: ValidatorService,
    private emailValidator: EmailValidatorService,
    private registroUser: RegistroService
  ) {
    // Aquí se inicializa miFormulario en lugar de en su declaración
    this.miFormulario = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.vs.emailPattern)]],
    });
  }

  ngOnInit(): void {}

  get emailErrorMgh(): string {
    const errors = this.miFormulario.get('email')?.errors;
    if (errors?.['required']) {
      return 'Este campo es obligatorio';
    } else if (errors?.['pattern']) {
      return 'Esto no es un correo válido';
    } else if (errors?.['emailTomado']) {
      return 'El correo ya existe';
    }
    return '';
  }

  campoEsValido(campo: string) {
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
  }

  guardar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    this.registroUser.registroUser(this.miFormulario.value).subscribe({
      next: (resp) => {
        if (resp.message === 'User registered successfully') {
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
