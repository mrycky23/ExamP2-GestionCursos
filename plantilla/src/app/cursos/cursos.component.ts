import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ICurso } from '../Interfaces/icurso';
import { CursosService } from '../Services/curso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [RouterLink, SharedModule],
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {
  listacursos: ICurso[] = [];

  constructor(private cursoServicio: CursosService) {}

  ngOnInit() {
    this.cargatabla();
  }

  cargatabla() {
    this.cursoServicio.todos().subscribe((data) => {
      console.log(data);
      this.listacursos = data;
    });
  }

  eliminar(curso_id) {
    Swal.fire({
      title: 'Cursos',
      text: '¿Está seguro que desea eliminar el curso?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar Curso'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cursoServicio.eliminar(curso_id).subscribe(() => {
          Swal.fire('Cursos', 'El curso ha sido eliminado.', 'success');
          this.cargatabla();
        });
      }
    });
  }
}
