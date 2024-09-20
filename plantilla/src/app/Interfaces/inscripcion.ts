export interface IInscripcion {
  inscripcion_id?: number;  // ID de la inscripción
  curso_id: number;         // ID del curso inscrito
  estudiante_id: number;    // ID del estudiante inscrito
  fecha_inscripcion: string;  // Fecha de la inscripción (como cadena para facilitar formateo)

  // Campos adicionales opcionales para mostrar información
  nombreCurso?: string;     // Nombre del curso
  nombreEstudiante?: string; // Nombre del estudiante
}
