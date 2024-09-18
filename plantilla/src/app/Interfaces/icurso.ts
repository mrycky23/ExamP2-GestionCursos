export interface ICurso {
  curso_id?: number; // Opcional para creación
  nombre: string;
  descripcion?: string;  // Opcional
  fecha_inicio?: Date;
  fecha_fin?: Date;
}

