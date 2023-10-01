<?php

namespace tests;
require_once '../vendor/autoload.php';

class ApiTest extends \PHPUnit\Framework\TestCase
{
    protected $baseURL = 'http://localhost'; // Update with your API URL

    public function testGetAllUsers()
    {
        $url = $this->baseURL . '/api/users/';
        $response = file_get_contents($url);
        $data = json_decode($response, true);
        $this->assertEquals(200, http_response_code());
        $this->assertIsArray($data);
    }

    public function testGetUserById()
    {
        $userId = 1; // Update with a valid user ID
        $url = $this->baseURL . '/api/users/' . $userId;
        $response = file_get_contents($url);
        $data = json_decode($response, true);
        $this->assertEquals(200, http_response_code());
        $this->assertIsArray($data);
    }

    public function testCreateUser()
    {
        $userData = [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'mobile' => '1234567890',
        ];

        $url = $this->baseURL . '/api/user/save';
        $options = [
            'http' => [
                'method' => 'POST',
                'header' => 'Content-type: application/json',
                'content' => json_encode($userData),
            ],
        ];
        $context = stream_context_create($options);
        $response = file_get_contents($url, false, $context);
        $data = json_decode($response, true);
        $this->assertEquals(200, http_response_code());
        $this->assertIsArray($data);
        $this->assertEquals(1, $data['status']);
    }

    public function testUpdateUser()
    {
        $userId = 1; // Update with a valid user ID
        $userData = [
            'id' => $userId,
            'name' => 'Updated User',
            'email' => 'updated@example.com',
            'mobile' => '9876543210',
        ];

        $url = $this->baseURL . '/api/user/' . $userId . '/edit';
        $options = [
            'http' => [
                'method' => 'PUT',
                'header' => 'Content-type: application/json',
                'content' => json_encode($userData),
            ],
        ];
        $context = stream_context_create($options);
        $response = file_get_contents($url, false, $context);
        $data = json_decode($response, true);
        $this->assertEquals(200, http_response_code());
        $this->assertIsArray($data);
        $this->assertEquals(1, $data['status']);
    }

    public function testDeleteUser()
    {
        $userId = 1; // Update with a valid user ID
        $url = $this->baseURL . '/api/user/' . $userId . '/delete';
        $options = ['http' => ['method' => 'DELETE']];
        $context = stream_context_create($options);
        $response = file_get_contents($url, false, $context);
        $data = json_decode($response, true);
        $this->assertEquals(200, http_response_code());
        $this->assertIsArray($data);
        $this->assertEquals(1, $data['status']);
    }
}
