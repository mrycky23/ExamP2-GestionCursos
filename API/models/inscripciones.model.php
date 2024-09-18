<?php
// TODO: Clase de Inscripciones Sistema de Gestión de Cursos
require_once('../config/config.php');

class Inscripciones
{
    // TODO: Implementar los métodos de la clase

    // Buscar inscripciones de un estudiante por nombre
    public function buscar($nombreEstudiante)
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `inscripciones` INNER JOIN `estudiantes` ON inscripciones.estudiante_id = estudiantes.estudiante_id WHERE estudiantes.nombre='$nombreEstudiante'";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    // Obtener todas las inscripciones
    public function todos()
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `inscripciones`";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    // Obtener una inscripción por su ID
    public function uno($idInscripcion)
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `inscripciones` WHERE `inscripcion_id` = $idInscripcion";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    // Insertar una nueva inscripción
    public function insertar($curso_id, $estudiante_id, $fecha_inscripcion)
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "INSERT INTO `inscripciones`(`curso_id`, `estudiante_id`, `fecha_inscripcion`) 
                       VALUES ('$curso_id', '$estudiante_id', '$fecha_inscripcion')";
            if (mysqli_query($con, $cadena)) {
                return $con->insert_id; // Devolver el ID insertado
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    // Actualizar una inscripción existente
    public function actualizar($idInscripcion, $curso_id, $estudiante_id, $fecha_inscripcion)
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "UPDATE `inscripciones` SET 
                       `curso_id`='$curso_id',
                       `estudiante_id`='$estudiante_id',
                       `fecha_inscripcion`='$fecha_inscripcion' 
                       WHERE `inscripcion_id` = $idInscripcion";
            if (mysqli_query($con, $cadena)) {
                return $idInscripcion; // Devolver el ID actualizado
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    // Eliminar una inscripción
    public function eliminar($idInscripcion)
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "DELETE FROM `inscripciones` WHERE `inscripcion_id` = $idInscripcion";
            if (mysqli_query($con, $cadena)) {
                return 1; // Éxito
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
}
