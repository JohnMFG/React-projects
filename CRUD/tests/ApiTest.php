<?php

namespace Tests;

use PHPUnit\Framework\TestCase;
use GuzzleHttp\Client;

class ApiTest extends TestCase
{
    protected $baseURL = 'http://localhost';
    protected $httpClient;

    protected function setUp(): void
    {
        parent::setUp();
        $this->httpClient = new Client();
    }

    public function testGetAllUsers()
    {
        $url = $this->baseURL . '/api/users/';
        $response = $this->httpClient->get($url);

        $actualResponseCode = $response->getStatusCode();
        $data = json_decode($response->getBody()->getContents(), true);

        $this->assertEquals(200, $actualResponseCode);
        $this->assertIsArray($data);
    }

    public function testGetUserById()
    {
        $userId = 35; 
        $url = $this->baseURL . '/api/users/' . $userId;
        $response = $this->httpClient->get($url);

        $actualResponseCode = $response->getStatusCode();
        $data = json_decode($response->getBody()->getContents(), true);

        $this->assertEquals(200, $actualResponseCode);
        $this->assertIsArray($data);
    }

    public function testCreateUser()
    {
        $userData = [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'status' => 'ACTIVE',
            'mobile' => '111111111',
        ];

        $url = $this->baseURL . '/api/user/save';
        $options = [
            'json' => $userData,
        ];

        $response = $this->httpClient->post($url, $options);

        $actualResponseCode = $response->getStatusCode();
        $data = json_decode($response->getBody()->getContents(), true);

        $this->assertEquals(200, $actualResponseCode);
        $this->assertIsArray($data);
        $this->assertEquals(1, $data['status']);
    }

    public function testUpdateUser()
    {
        $userId = 31;
        $userData = [
            'id' => $userId,
            'name' => 'Updated User',
            'email' => 'updated@example.com',
            'status' => 'ACTIVE',
            'mobile' => '9876543210',
        ];
    
        $url = $this->baseURL . '/api/user/' . $userId . '/edit';
        $options = [
            'json' => $userData,
        ];
    
        $response = $this->httpClient->put($url, $options);
    
        $actualResponseCode = $response->getStatusCode();
        $data = json_decode($response->getBody()->getContents(), true);
    
        $this->assertEquals(200, $actualResponseCode);
        $this->assertIsArray($data);
        $this->assertEquals(1, $data['status']);
    }
    
    
    

    public function testDeleteUser()
    {
        $userId = 10;
        $url = $this->baseURL . '/api/user/' . $userId . '/delete';

        $response = $this->httpClient->delete($url);

        $actualResponseCode = $response->getStatusCode();
        $data = json_decode($response->getBody()->getContents(), true);

        $this->assertEquals(200, $actualResponseCode);
        $this->assertIsArray($data);
        $this->assertEquals(1, $data['status']);
    }
}
