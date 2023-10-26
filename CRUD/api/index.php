<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'Container.php';
include 'DbConnect.php';
include 'MockDatabase.php';
$container = new Container();

$container->register('db', function () {
    return new DbConnect();
});

$container->register('dbMock', function () {
    return new MockDatabase();
});



$environment='testing';
include 'UserRepository.php';

if ($environment === 'testing') {
    $conn = $container->resolve('dbMock');
} else {
    $objDb = $container->resolve('db');
    $conn = $objDb->connect();
}

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'POST':
        $user = json_decode(file_get_contents('php://input'));
        $userRepository = new UserRepository($conn);
        $response = $userRepository->save((array) $user);
        echo json_encode($response);
        break;

    case 'PUT':
        $requestData = json_decode(file_get_contents('php://input'), true);
        $id = $requestData['id'];
        $user = $requestData['user'];

        $userRepository = new UserRepository($conn);
        $response = $userRepository->update($id, $user);
        echo json_encode($response);
        break;

    case 'GET':
        $userRepository = new UserRepository($conn);
        $response = ['status' => 0, 'message' => 'Invalid request.'];
        $path = explode('/', $_SERVER['REQUEST_URI']);

        if (isset($path[3]) && is_numeric($path[3])) {
            $user = $userRepository->findById($path[3]);

            if ($user) {
                $response = ['status' => 1, 'user' => $user];
            }
        } else {
            $users = $userRepository->findAll();
            if (!empty($users)) {
                $response = ['status' => 1, 'users' => $users];
            }
        }

        echo json_encode($response);
        break;

    case 'DELETE':
        $requestData = json_decode(file_get_contents('php://input'), true);
        $id = $requestData['id'];

        $userRepository = new UserRepository($conn);
        $response = $userRepository->delete($id);
        echo json_encode($response);
        break;

    default:
        break;
}