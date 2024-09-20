import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEstudiante } from '../Interfaces/iestudiante'; // Asegúrate de crear esta interfaz

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  
  apiurl = 'http://localhost/ExamP2-GESTIONCURSOS/API/controllers/estudiantes.controller.php?op=';

  constructor(private http: HttpClient) {}

  crear(estudiante: IEstudiante): Observable<IEstudiante> {
      return this.http.post<IEstudiante>(`${this.apiurl}/estudiantes`, estudiante);
    }
  // Método para obtener todos los estudiantes
  todos(): Observable<IEstudiante[]> {
    return this.http.get<IEstudiante[]>(this.apiurl + 'todos');
  }

  // Método para obtener un estudiante por su ID
  uno(idEstudiante: number): Observable<IEstudiante> {
    const formData = new FormData();
    formData.append('idEstudiante', idEstudiante.toString());
    return this.http.post<IEstudiante>(this.apiurl + 'uno', formData);
  }

  // Método para eliminar un estudiante por su ID
  eliminar(idEstudiante: number): Observable<number> {
    const formData = new FormData();
    formData.append('idEstudiante', idEstudiante.toString());
    return this.http.post<number>(this.apiurl + 'eliminar', formData);
  }

  // Método para insertar un nuevo estudiante
  insertar(estudiante: IEstudiante): Observable<string> {
    const formData = new FormData();
    formData.append('nombre', estudiante.nombre);
    formData.append('apellido', estudiante.apellido);
    formData.append('email', estudiante.email);
    formData.append('telefono', estudiante.telefono);
    formData.append('direccion', estudiante.direccion);
    formData.append('curso_idCurso', estudiante.curso_idCurso.toString());

    return this.http.post<string>(this.apiurl + 'insertar', formData);
  }

  // Método para actualizar un estudiante
  actualizar(estudiante: IEstudiante): Observable<string> {
    const formData = new FormData();
    formData.append('idEstudiante', estudiante.idEstudiante.toString());
    formData.append('nombre', estudiante.nombre);
    formData.append('apellido', estudiante.apellido);
    formData.append('email', estudiante.email);
    formData.append('telefono', estudiante.telefono);
    formData.append('direccion', estudiante.direccion);
    formData.append('curso_idCurso', estudiante.curso_idCurso.toString());

    return this.http.post<string>(this.apiurl + 'actualizar', formData);
  }
}
