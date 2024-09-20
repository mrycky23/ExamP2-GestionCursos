export interface IEstudiante {
  idEstudiante?: number;  // ID opcional (cuando no se ha creado aún)
  nombre: string;         // Nombre del estudiante
  apellido: string;       // Apellido del estudiante
  email: string;          // Correo electrónico del estudiante
  telefono: string;       // Número de teléfono
  direccion: string;      // Dirección del estudiante
  curso_idCurso: number;  // ID del curso al que pertenece el estudiante (relacionado con la tabla de cursos)
}
