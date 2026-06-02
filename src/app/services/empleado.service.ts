import { Injectable } from '@angular/core';
import { Empleado } from '../models/empleado.model';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  private nextId = 7;

  // Datos iniciales en memoria
  private empleados: Empleado[] = [
    {
      id: 1,
      nombre: 'Ana García',
      cargo: 'Desarrolladora Frontend',
      salario: 2800,
      telefono: '987654321',
      correo: 'ana.garcia@empresa.com',
      fechaIngreso: '2026-06-01',
    },
    {
      id: 2,
      nombre: 'Carlos Pérez',
      cargo: 'Analista de Datos',
      salario: 3200,
      telefono: '912345678',
      correo: 'carlos.perez@empresa.com',
      fechaIngreso: '2026-06-15',
    },
    {
      id: 3,
      nombre: 'Lucía Torres',
      cargo: 'Gerente de Proyectos',
      salario: 4500,
      telefono: '956789012',
      correo: 'lucia.torres@empresa.com',
      fechaIngreso: '2026-07-10',
    },
    {
      id: 4,
      nombre: 'Miguel Ramos',
      cargo: 'DevOps Engineer',
      salario: 3800,
      telefono: '941234567',
      correo: 'miguel.ramos@empresa.com',
      fechaIngreso: '2026-06-20',
    },
    {
      id: 5,
      nombre: 'Sofía Mendoza',
      cargo: 'Diseñador UX/UI',
      salario: 2600,
      telefono: '963852741',
      correo: 'sofia.mendoza@empresa.com',
      fechaIngreso: '2026-07-01',
    },
    {
      id: 6,
      nombre: 'Diego Castillo',
      cargo: 'QA Tester',
      salario: 2400,
      telefono: '978563412',
      correo: 'diego.castillo@empresa.com',
      fechaIngreso: '2026-06-25',
    },
  ];

  getAll(): Empleado[] {
    return [...this.empleados];
  }

  getById(id: number): Empleado | undefined {
    return this.empleados.find((e) => e.id === id);
  }

  create(empleado: Omit<Empleado, 'id'>): Empleado {
    const nuevo: Empleado = { id: this.nextId++, ...empleado };
    this.empleados.push(nuevo);
    return nuevo;
  }

  update(id: number, datos: Omit<Empleado, 'id'>): Empleado | null {
    const index = this.empleados.findIndex((e) => e.id === id);
    if (index === -1) return null;
    this.empleados[index] = { id, ...datos };
    return this.empleados[index];
  }

  delete(id: number): boolean {
    const index = this.empleados.findIndex((e) => e.id === id);
    if (index === -1) return false;
    this.empleados.splice(index, 1);
    return true;
  }
}
