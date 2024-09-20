import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EstudianteService } from 'src/app/Services/estudiante.service'; // Update service import
import { IEstudiante } from 'src/app/Interfaces/iestudiante'; // Update interface import
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevoestudiante',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './nuevoestudiante.component.html', // Update template URL
  styleUrls: ['./nuevoestudiante.component.scss'] // Corrected to 'styleUrls'
})
export class NuevoEstudianteComponent implements OnInit {
  frm_Estudiante: FormGroup;

  constructor(
    private fb: FormBuilder,
    private estudianteService: EstudianteService // Ensure the service is correctly named
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario() {
    this.frm_Estudiante = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefono: new FormControl(''), // Optional
      direccion: new FormControl('') // Optional
    });
  }

  grabar() {
    if (this.frm_Estudiante.valid) {
      const nuevoEstudiante: IEstudiante = this.frm_Estudiante.value;
      this.estudianteService.crear(nuevoEstudiante).subscribe(
        () => {
          Swal.fire('Éxito', 'Estudiante creado correctamente', 'success');
          this.frm_Estudiante.reset();
        },
        (error) => {
          Swal.fire('Error', 'Ocurrió un error al crear el estudiante', 'error');
          console.error(error);
        }
      );
    } else {
      Swal.fire('Error', 'Por favor, complete todos los campos requeridos', 'warning');
    }
  }
}
