<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}

// Controlador de estudiantes Sistema de Gestión de Cursos
require_once('../models/estudiantes.model.php');
error_reporting(0);
$estudiantes = new Estudiantes;

switch ($_GET["op"]) {
    // Operaciones de estudiantes

    case 'buscar': // Procedimiento para buscar estudiantes por nombre
        if (!isset($_POST["texto"])) {
            echo json_encode(["error" => "Nombre del estudiante no especificado."]);
            exit();
        }
        $texto = $_POST["texto"];
        $datos = array();
        $datos = $estudiantes->buscar($texto);
        $todos = [];
        while ($row = mysqli_fetch_assoc($datos)) {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;

    case 'todos': // Procedimiento para cargar todos los datos de los estudiantes
        $datos = array();
        $datos = $estudiantes->todos();
        $todos = [];
        while ($row = mysqli_fetch_assoc($datos)) {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;

    case 'uno': // Procedimiento para obtener un estudiante por ID
        if (!isset($_POST["idEstudiante"])) {
            echo json_encode(["error" => "ID del estudiante no especificado."]);
            exit();
        }
        $idEstudiante = intval($_POST["idEstudiante"]);
        $datos = array();
        $datos = $estudiantes->uno($idEstudiante);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;

    case 'insertar': // Procedimiento para insertar un nuevo estudiante en la base de datos
        if (!isset($_POST["nombre"]) || !isset($_POST["apellido"]) || !isset($_POST["email"]) || !isset($_POST["fecha_nacimiento"])) {
            echo json_encode(["error" => "Faltan parámetros requeridos."]);
            exit();
        }

        $nombre = $_POST["nombre"];
        $apellido = $_POST["apellido"];
        $email = $_POST["email"];
        $fecha_nacimiento = $_POST["fecha_nacimiento"];

        $datos = array();
        $datos = $estudiantes->insertar($nombre, $apellido, $email, $fecha_nacimiento);
        echo json_encode($datos);
        break;

    case 'actualizar': // Procedimiento para actualizar un estudiante en la base de datos
        if (!isset($_POST["idEstudiante"]) || !isset($_POST["nombre"]) || !isset($_POST["apellido"]) || !isset($_POST["email"]) || !isset($_POST["fecha_nacimiento"])) {
            echo json_encode(["error" => "Faltan parámetros requeridos."]);
            exit();
        }

        $idEstudiante = intval($_POST["idEstudiante"]);
        $nombre = $_POST["nombre"];
        $apellido = $_POST["apellido"];
        $email = $_POST["email"];
        $fecha_nacimiento = $_POST["fecha_nacimiento"];

        $datos = array();
        $datos = $estudiantes->actualizar($idEstudiante, $nombre, $apellido, $email, $fecha_nacimiento);
        echo json_encode($datos);
        break;

    case 'eliminar': // Procedimiento para eliminar un estudiante de la base de datos
        if (!isset($_POST["idEstudiante"])) {
            echo json_encode(["error" => "ID del estudiante no especificado."]);
            exit();
        }
        $idEstudiante = intval($_POST["idEstudiante"]);
        $datos = array();
        $datos = $estudiantes->eliminar($idEstudiante);
        echo json_encode($datos);
        break;

    default:
        echo json_encode(["error" => "Operación no válida."]);
        break;
}
