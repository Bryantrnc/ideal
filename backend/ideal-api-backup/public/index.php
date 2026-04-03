<?php

require_once __DIR__ . '/../vendor/autoload.php';

$routes = require __DIR__ . '/../routes/api.php';
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$uri = strtok($_SERVER['REQUEST_URI'] ?? '/', '?');

foreach ($routes as $route) {
    if ($route['method'] === $method && $route['uri'] === $uri) {
        if (is_callable($route['action'])) {
            $route['action']();
            exit;
        }

        [$class, $action] = $route['action'];
        $controller = new $class();
        $controller->$action();
        exit;
    }
}

header('Content-Type: application/json', true, 404);
echo json_encode(['message' => 'Route not found']);
