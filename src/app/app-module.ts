import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DecimalPipe } from '@angular/common';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { EmpleadosComponent } from './components/empleados/empleados';
import { EmpleadoFormComponent } from './components/empleado-form/empleado-form';

@NgModule({
  declarations: [App, EmpleadosComponent, EmpleadoFormComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, CommonModule],
  providers: [provideBrowserGlobalErrorListeners(), DecimalPipe],
  bootstrap: [App],
})
export class AppModule {}
