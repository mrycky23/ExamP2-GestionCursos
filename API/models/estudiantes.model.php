<?php
// TODO: Clase de Estudiantes Sistema de Gestión de Cursos
require_once('../config/config.php');

class Estudiantes
{
    // TODO: Implementar los métodos de la clase

    // Buscar un estudiante por su nombre
    public function buscar($nombreEstudiante)
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `estudiantes` WHERE `nombre` = '$nombreEstudiante'";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    // Obtener todos los estudiantes
    public function todos()
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `estudiantes`";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    // Obtener un estudiante por su ID
    public function uno($idEstudiante)
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `estudiantes` WHERE `estudiante_id` = $idEstudiante";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    // Insertar un nuevo estudiante
    public function insertar($nombre, $apellido, $email, $fecha_nacimiento)
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "INSERT INTO `estudiantes`(`nombre`, `apellido`, `email`, `fecha_nacimiento`) 
                       VALUES ('$nombre', '$apellido', '$email', '$fecha_nacimiento')";
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

    // Actualizar un estudiante existente
    public function actualizar($idEstudiante, $nombre, $apellido, $email, $fecha_nacimiento)
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "UPDATE `estudiantes` SET 
                       `nombre`='$nombre',
                       `apellido`='$apellido',
                       `email`='$email',
                       `fecha_nacimiento`='$fecha_nacimiento' 
                       WHERE `estudiante_id` = $idEstudiante";
            if (mysqli_query($con, $cadena)) {
                return $idEstudiante; // Devolver el ID actualizado
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    // Eliminar un estudiante
    public function eliminar($idEstudiante)
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "DELETE FROM `estudiantes` WHERE `estudiante_id` = $idEstudiante";
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
