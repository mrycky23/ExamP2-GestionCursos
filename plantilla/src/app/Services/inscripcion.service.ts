import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IInscripcion } from '../Interfaces/inscripcion';
import { Observable } from 'rxjs';
import { ICurso } from '../Interfaces/icurso';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {  // Cambiado a InscripcionService
  apiurl = 'http://localhost/ExamP2-GESTIONCURSOS/API/controllers/inscripciones.controller.php?op=';  // Cambiar la URL según tu API

  constructor(private lector: HttpClient) {}

  // Obtener todas las inscripciones
  todos(): Observable<IInscripcion[]> {
    return this.lector.get<IInscripcion[]>(this.apiurl + 'todos');
  }

  // Obtener una inscripción por ID
  uno(idInscripcion: number): Observable<IInscripcion> {
    const formData = new FormData();
    formData.append('idInscripcion', idInscripcion.toString());
    return this.lector.post<IInscripcion>(this.apiurl + 'uno', formData);
  }

  // Eliminar una inscripción
  eliminar(idInscripcion: number): Observable<number> {
    const formData = new FormData();
    formData.append('idInscripcion', idInscripcion.toString());
    return this.lector.post<number>(this.apiurl + 'eliminar', formData);
  }

  // Insertar una nueva inscripción
  insertar(inscripcion: IInscripcion): Observable<string> {
    const formData = new FormData();
    formData.append('curso_id', inscripcion.curso_id.toString());
    formData.append('estudiante_id', inscripcion.estudiante_id.toString());
    formData.append('fecha_inscripcion', inscripcion.fecha_inscripcion);
    return this.lector.post<string>(this.apiurl + 'insertar', formData);
  }

  // Actualizar una inscripción existente
  actualizar(inscripcion: IInscripcion): Observable<string> {
    const formData = new FormData();
    formData.append('idInscripcion', inscripcion.inscripcion_id.toString());
    formData.append('curso_id', inscripcion.curso_id.toString());
    formData.append('estudiante_id', inscripcion.estudiante_id.toString());
    formData.append('fecha_inscripcion', inscripcion.fecha_inscripcion);
    return this.lector.post<string>(this.apiurl + 'actualizar', formData);
  }

  obtenerCursos(): Observable<ICurso[]> {
    return this.lector.get<ICurso[]>(`${this.apiurl}/cursos`);
  }
}
