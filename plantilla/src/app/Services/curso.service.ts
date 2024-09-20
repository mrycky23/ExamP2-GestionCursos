import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICurso } from '../Interfaces/icurso';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  apiurl = 'http://localhost/ExamP2-GESTIONCURSOS/API/controllers/cursos.controller.php?op='; 

  constructor(private lector: HttpClient) {}

  // Buscar curso por nombre
  buscar(texto: string): Observable<ICurso> {
    const formData = new FormData();
    formData.append('texto', texto);
    return this.lector.post<ICurso>(this.apiurl + 'uno', formData);
  }

  // Obtener todos los cursos
  todos(): Observable<ICurso[]> {
    return this.lector.get<ICurso[]>(this.apiurl + 'todos');
  }

  // Obtener un curso por ID
  uno(curso_id: number): Observable<ICurso> {
    const formData = new FormData();
    formData.append('curso_id', curso_id.toString());
    return this.lector.post<ICurso>(this.apiurl + 'uno', formData);
  }

  // Eliminar un curso por ID
  eliminar(curso_id: number): Observable<number> {
    const formData = new FormData();
    formData.append('curso_id', curso_id.toString());
    return this.lector.post<number>(this.apiurl + 'eliminar', formData);
  }

  // Insertar un nuevo curso
  insertar(curso: ICurso): Observable<string> {
    const formData = new FormData();
    formData.append('nombre', curso.nombre);
    formData.append('descripcion', curso.descripcion || ''); // Campo opcional
    formData.append('fecha_inicio', curso.fecha_inicio?.toString() || ''); // Convertir a string
    formData.append('fecha_fin', curso.fecha_fin?.toString() || ''); // Convertir a string
    return this.lector.post<string>(this.apiurl + 'insertar', formData);
  }

  // Actualizar un curso existente
  actualizar(curso: ICurso): Observable<string> {
    const formData = new FormData();
    formData.append('curso_id', curso.curso_id!.toString()); // El ID no debe ser opcional en la actualización
    formData.append('nombre', curso.nombre);
    formData.append('descripcion', curso.descripcion || ''); 
    formData.append('fecha_inicio', curso.fecha_inicio?.toString() || ''); 
    formData.append('fecha_fin', curso.fecha_fin?.toString() || '');
    return this.lector.post<string>(this.apiurl + 'actualizar', formData);
  }

  obtenerCursos(): Observable<ICurso[]> {
    return this.lector.get<ICurso[]>(`${this.apiurl}/cursos`);
  }
}
