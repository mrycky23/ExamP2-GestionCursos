import { Component, OnInit, TrackByFunction } from '@angular/core';
import { IUnidadMedida } from '../Interfaces/iunidadmedida';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../theme/shared/shared.module';
import { UnidadmedidaService } from '../Services/unidadmedida.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-unidadmedida',
  standalone: true,
  imports: [RouterLink, SharedModule, ReactiveFormsModule, CommonModule],
  templateUrl: './unidadmedida.component.html',
  styleUrl: './unidadmedida.component.scss'
})
export class UnidadmedidaComponent implements OnInit {
  listaunidades: IUnidadMedida[] = [];
  constructor(private unidadServicio: UnidadmedidaService) {}

  //Definir formGroup
  frm_UnidadMedida: FormGroup;
  trackByFn: TrackByFunction<IUnidadMedida>;

  

  ngOnInit(): void {
    this.cargatabla();
    // Inicializar el formulario
    this.frm_UnidadMedida = new FormGroup({
      // Aquí podrías añadir más controles si tu formulario los requiere
      unidadMedida: new FormControl(''),
    });
  }

  cargatabla() {
    this.unidadServicio.todos().subscribe((data) => {
      console.log(data);
      this.listaunidades = data;
    });
  }
  //TODO: Eliminar
  eliminar(idUnidad_Medida: number) {
    Swal.fire({
      title: 'Unidad Medida',
      text: 'Esta seguro que desea eliminar la unidad de medida!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar Unidad de Medida'
    }).then((result) => {
      if (result.isConfirmed) {
        this.unidadServicio.eliminar(idUnidad_Medida).subscribe((data) => {
          Swal.fire('Unidad Medida', 'El cliente ha sido eliminado.', 'success');
          this.cargatabla();
        });
      }
    });
  }
}