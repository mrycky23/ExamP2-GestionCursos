<?php
// TODO: Clase de Cursos Sistema de Gestión de Cursos
require_once('../config/config.php');

class Cursos
{
    // TODO: Implementar los métodos de la clase

    // Buscar un curso por su nombre
    public function buscar($nombreCurso)
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `cursos` WHERE `nombre` = '$nombreCurso'";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    // Obtener todos los cursos
    public function todos()
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `cursos`";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    // Obtener un curso por su ID
    public function uno($idCurso)
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `cursos` WHERE `curso_id` = $idCurso";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    // Insertar un nuevo curso
    public function insertar($nombre, $descripcion, $fecha_inicio, $fecha_fin)
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "INSERT INTO `cursos`(`nombre`, `descripcion`, `fecha_inicio`, `fecha_fin`) 
                       VALUES ('$nombre', '$descripcion', '$fecha_inicio', '$fecha_fin')";
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

    // Actualizar un curso existente
    public function actualizar($idCurso, $nombre, $descripcion, $fecha_inicio, $fecha_fin)
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "UPDATE `cursos` SET 
                       `nombre`='$nombre',
                       `descripcion`='$descripcion',
                       `fecha_inicio`='$fecha_inicio',
                       `fecha_fin`='$fecha_fin' 
                       WHERE `curso_id` = $idCurso";
            if (mysqli_query($con, $cadena)) {
                return $idCurso; // Devolver el ID actualizado
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    // Eliminar un curso
    public function eliminar($idCurso)
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "DELETE FROM `cursos` WHERE `curso_id` = $idCurso";
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
