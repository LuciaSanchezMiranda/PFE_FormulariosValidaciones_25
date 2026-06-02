import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from '../../models/empleado.model';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-empleados',
  standalone: false,
  templateUrl: './empleados.html',
  styleUrl: './empleados.css',
})
export class EmpleadosComponent implements OnInit {
  empleados: Empleado[] = [];
  empleadoAEliminar: Empleado | null = null;
  mostrarModal = false;

  constructor(private service: EmpleadoService, private router: Router) {}

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  cargarEmpleados(): void {
    this.empleados = this.service.getAll();
  }

  nuevo(): void {
    this.router.navigate(['/empleados/nuevo']);
  }

  editar(id: number): void {
    this.router.navigate(['/empleados/editar', id]);
  }

  confirmarEliminar(empleado: Empleado): void {
    this.empleadoAEliminar = empleado;
    this.mostrarModal = true;
  }

  eliminar(): void {
    if (this.empleadoAEliminar) {
      this.service.delete(this.empleadoAEliminar.id);
      this.cargarEmpleados();
    }
    this.cerrarModal();
  }

  cerrarModal(): void {
    this.empleadoAEliminar = null;
    this.mostrarModal = false;
  }
}
