import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { IInscripcion } from '../Interfaces/inscripcion';
import { Router, RouterLink } from '@angular/router';
import { InscripcionService } from '../Services/inscripcion.service';

@Component({
  selector: 'app-inscripciones',
  standalone: true,
  imports: [SharedModule, RouterLink],
  templateUrl: './inscripciones.component.html',
})
export class InscripcionesComponent implements OnInit {
  listainscripciones: IInscripcion[] = [];  // Lista de inscripciones

  constructor(private inscripcionServicio: InscripcionService, private router: Router) {}  // Servicio de Inscripción y Router

  ngOnInit(): void {
    this.cargarInscripciones();  // Cargar las inscripciones al iniciar
  }

  cargarInscripciones() {
    this.inscripcionServicio.todos().subscribe((data: IInscripcion[]) => {
      this.listainscripciones = data;  // Asignar los datos a la lista
    });
  }

  eliminar(idInscripcion: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta inscripción?')) {  // Confirmación antes de eliminar
      this.inscripcionServicio.eliminar(idInscripcion).subscribe(() => {
        this.cargarInscripciones();  // Recargar la lista después de eliminar
      });
    }
  }
}
