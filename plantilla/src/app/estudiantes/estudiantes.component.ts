import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../theme/shared/shared.module';
import { RouterLink } from '@angular/router';
import { IEstudiante } from '../Interfaces/iestudiante'; // Update to use IEstudiante
import { EstudianteService } from '../Services/estudiante.service'; // Ensure the service is correctly named
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estudiantes', // Update selector
  standalone: true,
  imports: [SharedModule, RouterLink],
  templateUrl: './estudiantes.component.html', // Update template URL
  styleUrls: ['./estudiantes.component.scss'] // Corrected 'styleUrl' to 'styleUrls'
})
export class EstudiantesComponent implements OnInit {
  listaEstudiantes: IEstudiante[] = []; // Update list name

  constructor(private estudianteService: EstudianteService) {} // Ensure service name matches

  ngOnInit(): void {
    this.cargarEstudiantes(); // Update method name
  }

  cargarEstudiantes() { // Update method name
    this.estudianteService.todos().subscribe((data) => {
      this.listaEstudiantes = data;
      console.log(data);
    });
  }

  trackByFn(index: number, item: IEstudiante) { // Implement trackBy function
    return item.idEstudiante; // Return unique identifier
  }

  eliminar(idEstudiante: number) { // Update parameter name
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará al estudiante',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.estudianteService.eliminar(idEstudiante).subscribe(() => { // Update service call
          this.cargarEstudiantes(); // Refresh list
          Swal.fire('Eliminado', 'El estudiante ha sido eliminado', 'success');
        });
      } else {
        Swal.fire('Error', 'Ocurrió un error', 'error');
      }
    });
  }
}
