import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CursosService } from 'src/app/Services/curso.service';
import { ICurso } from 'src/app/Interfaces/icurso';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-nuevocurso',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './nuevocurso.component.html',
  styleUrl: './nuevocurso.component.scss'
})
export class NuevoclienteComponent implements OnInit {
listaCursos: ICurso[]=[];
totalapagar: any;
calculos() {
throw new Error('Method not implemented.');
}
cambio($event: Event) {
throw new Error('Method not implemented.');
}
  frm_Curso = new FormGroup({
    //idClientes: new FormControl(),
    Nombres: new FormControl('', Validators.required),
    Direccion: new FormControl('', Validators.required),
    Telefono: new FormControl('', Validators.required),
    Cedula: new FormControl('', [Validators.required, this.validadorCedulaEcuador]),
    Correo: new FormControl('', [Validators.required, Validators.email])
  });
  idClientes = 0;
  titulo = 'Nuevo Curso';
  constructor(
    private cursoServicio: CursosService,
    private navegacion: Router,
    private ruta: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idClientes = parseInt(this.ruta.snapshot.paramMap.get('idCliente'));
    if (this.idClientes > 0) {
      this.cursoServicio.uno(this.idClientes).subscribe((uncurso) => {
        this.frm_Curso.controls['Nombres'].setValue(uncurso.nombre);
        this.frm_Curso.controls['Descripcion'].setValue(uncurso.descripcion);
        this.frm_Curso.controls['Fecha Inicio'].setValue(uncurso.fecha_inicio);
        this.frm_Curso.controls['Fecha Fin'].setValue(uncurso.fecha_fin);

        this.titulo = 'Editar Curso';
      });
    }
  }

  grabar() {
    let curso: ICurso = {
      curso_id: this.idClientes,
      nombre: this.frm_Curso.controls['Nombres'].value,
      descripcion: this.frm_Curso.controls['Descripcion'].value,
      fecha_inicio: this.frm_Curso.controls['Fecha_inicio'].value,
      fecha_fin: this.frm_Curso.controls['Fecha_fin'].value
    };

    Swal.fire({
      title: 'Cursos',
      text: 'Desea guardar al curso ' + this.frm_Curso.controls['Nombres'].value,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f00',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Grabar!'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.idClientes > 0) {
          this.cursoServicio.actualizar(curso).subscribe((res: any) => {
            Swal.fire({
              title: 'Cursos',
              text: res.mensaje,
              icon: 'success'
            });
            this.navegacion.navigate(['/cursos']);
          });
        } else {
          this.cursoServicio.insertar(curso).subscribe((res: any) => {
            Swal.fire({
              title: 'Cursos',
              text: res.mensaje,
              icon: 'success'
            });
            this.navegacion.navigate(['/cursos']);
          });
        }
      }
    });
  }

  validadorCedulaEcuador(control: AbstractControl): ValidationErrors | null {
    const cedula = control.value;
    if (!cedula) return null;
    if (cedula.length !== 10) return { cedulaInvalida: true };
    const provincia = parseInt(cedula.substring(0, 2), 10);
    if (provincia < 1 || provincia > 24) return { provincia: true };
    const tercerDigito = parseInt(cedula.substring(2, 3), 10);
    if (tercerDigito < 0 || tercerDigito > 5) return { cedulaInvalida: true };
    const digitoVerificador = parseInt(cedula.substring(9, 10), 10);
    const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    let suma = 0;
    for (let i = 0; i < coeficientes.length; i++) {
      const valor = parseInt(cedula.substring(i, i + 1), 10) * coeficientes[i];
      suma += valor > 9 ? valor - 9 : valor;
    }
    const resultado = suma % 10 === 0 ? 0 : 10 - (suma % 10);
    if (resultado !== digitoVerificador) return { cedulaInvalida: true };
    return null;
  }
}
