<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}

// Controlador de cursos Sistema de Gestión de Cursos
require_once('../models/cursos.model.php');
error_reporting(0);
$cursos = new Cursos;

switch ($_GET["op"]) {
    // Operaciones de cursos

    case 'buscar': // Procedimiento para buscar cursos por nombre
        if (!isset($_POST["texto"])) {
            echo json_encode(["error" => "Nombre del curso no especificado."]);
            exit();
        }
        $texto = $_POST["texto"];
        $datos = array();
        $datos = $cursos->buscar($texto);
        $todos = [];
        while ($row = mysqli_fetch_assoc($datos)) {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;

    case 'todos': // Procedimiento para cargar todos los datos de los cursos
        $datos = array();
        $datos = $cursos->todos();
        $todos = [];
        while ($row = mysqli_fetch_assoc($datos)) {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;

    case 'uno': // Procedimiento para obtener un curso por ID
        if (!isset($_POST["idCurso"])) {
            echo json_encode(["error" => "ID del curso no especificado."]);
            exit();
        }
        $idCurso = intval($_POST["idCurso"]);
        $datos = array();
        $datos = $cursos->uno($idCurso);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;

    case 'insertar': // Procedimiento para insertar un nuevo curso en la base de datos
        if (!isset($_POST["nombre"]) || !isset($_POST["descripcion"]) || !isset($_POST["fecha_inicio"]) || !isset($_POST["fecha_fin"])) {
            echo json_encode(["error" => "Faltan parámetros requeridos."]);
            exit();
        }

        $nombre = $_POST["nombre"];
        $descripcion = $_POST["descripcion"];
        $fecha_inicio = $_POST["fecha_inicio"];
        $fecha_fin = $_POST["fecha_fin"];

        $datos = array();
        $datos = $cursos->insertar($nombre, $descripcion, $fecha_inicio, $fecha_fin);
        echo json_encode($datos);
        break;

    case 'actualizar': // Procedimiento para actualizar un curso en la base de datos
        if (!isset($_POST["idCurso"]) || !isset($_POST["nombre"]) || !isset($_POST["descripcion"]) || !isset($_POST["fecha_inicio"]) || !isset($_POST["fecha_fin"])) {
            echo json_encode(["error" => "Faltan parámetros requeridos."]);
            exit();
        }

        $idCurso = intval($_POST["idCurso"]);
        $nombre = $_POST["nombre"];
        $descripcion = $_POST["descripcion"];
        $fecha_inicio = $_POST["fecha_inicio"];
        $fecha_fin = $_POST["fecha_fin"];

        $datos = array();
        $datos = $cursos->actualizar($idCurso, $nombre, $descripcion, $fecha_inicio, $fecha_fin);
        echo json_encode($datos);
        break;

    case 'eliminar': // Procedimiento para eliminar un curso de la base de datos
        if (!isset($_POST["idCurso"])) {
            echo json_encode(["error" => "ID del curso no especificado."]);
            exit();
        }
        $idCurso = intval($_POST["idCurso"]);
        $datos = array();
        $datos = $cursos->eliminar($idCurso);
        echo json_encode($datos);
        break;

    default:
        echo json_encode(["error" => "Operación no válida."]);
        break;
}
