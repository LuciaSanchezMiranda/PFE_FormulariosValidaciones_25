import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoService } from '../../services/empleado.service';
import {
  telefonoNueveDígitosValidator,
  fechaNoAnteriorHoyValidator,
  salarioPositivoValidator,
} from '../../validators/empleado.validators';

@Component({
  selector: 'app-empleado-form',
  standalone: false,
  templateUrl: './empleado-form.html',
  styleUrl: './empleado-form.css',
})
export class EmpleadoFormComponent implements OnInit {
  form!: FormGroup;
  esEdicion = false;
  empleadoId?: number;
  mensajeExito = '';

  cargos = [
    'Desarrollador Frontend',
    'Desarrolladora Frontend',
    'Desarrollador Backend',
    'Analista de Datos',
    'Gerente de Proyectos',
    'Diseñador UX/UI',
    'QA Tester',
    'DevOps Engineer',
    'Recursos Humanos',
    'Contador',
  ];

  constructor(
    private fb: FormBuilder,
    private service: EmpleadoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      cargo: ['', Validators.required],
      salario: ['', [Validators.required, salarioPositivoValidator()]],
      telefono: ['', [Validators.required, telefonoNueveDígitosValidator()]],
      correo: ['', [Validators.required, Validators.email]],
      fechaIngreso: ['', [Validators.required, fechaNoAnteriorHoyValidator()]],
    });

    // Si viene un id en la ruta → modo edición
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.esEdicion = true;
      this.empleadoId = +id;
      const empleado = this.service.getById(this.empleadoId);
      if (empleado) {
        this.form.patchValue(empleado);
      }
    }
  }

  get f() {
    return this.form.controls;
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.esEdicion && this.empleadoId) {
      this.service.update(this.empleadoId, this.form.value);
      this.mensajeExito = 'Empleado actualizado correctamente.';
    } else {
      this.service.create(this.form.value);
      this.mensajeExito = 'Empleado registrado correctamente.';
    }

    setTimeout(() => this.router.navigate(['/empleados']), 1200);
  }

  cancelar(): void {
    this.router.navigate(['/empleados']);
  }
}
