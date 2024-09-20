import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IInscripcion } from 'src/app/Interfaces/inscripcion';
import { ICurso } from 'src/app/Interfaces/icurso';
import { CursosService } from 'src/app/Services/curso.service';
import { InscripcionService } from 'src/app/Services/inscripcion.service';

@Component({
  selector: 'app-nuevainscripcion',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './nuevainscripcion.component.html',
  //styleUrl: './nuevainscripcion.component.scss'
})
export class NuevainscripcionComponent implements OnInit {
cambio($event: Event) {
throw new Error('Method not implemented.');
}
totalapagar: any;
calculos() {
throw new Error('Method not implemented.');
}
  //variables o constantes
  titulo = 'Nueva Inscripción';
  listaCursos: ICurso[] = [];
  listaCursosFiltrada: ICurso[] = [];
  //formgroup
  frm_inscripcion: FormGroup;

  ///////
  constructor(
    private cursosService: CursosService,
    private inscripcionService: InscripcionService,
    private navegacion: Router
  ) {}

  ngOnInit(): void {
    this.frm_inscripcion = new FormGroup({
      curso_id: new FormControl('', Validators.required),
      estudiante_id: new FormControl('', Validators.required),
      fecha_inscripcion: new FormControl('', Validators.required)
    });

    this.cursosService.todos().subscribe({
      next: (data) => {
        this.listaCursos = data;
        this.listaCursosFiltrada = data;
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  grabar() {
    let inscripcion: IInscripcion = {
      curso_id: this.frm_inscripcion.get('curso_id')?.value,
      estudiante_id: this.frm_inscripcion.get('estudiante_id')?.value,
      fecha_inscripcion: this.frm_inscripcion.get('fecha_inscripcion')?.value
    };

    this.inscripcionService.insertar(inscripcion).subscribe((respuesta) => {
      if (parseInt(respuesta) > 0) {
        alert('Inscripción realizada correctamente');
        this.navegacion.navigate(['/inscripciones']);
      }
    });
  }

  cambioCurso(objetoSelect: any) {
    let idCurso = objetoSelect.target.value;
    this.frm_inscripcion.get('curso_id')?.setValue(idCurso);
  }
}
