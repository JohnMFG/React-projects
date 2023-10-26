<?php

use PHPUnit\Framework\TestCase;
use GuzzleHttp\Client;

class ApiTest extends TestCase
{
    protected $baseURL = 'http://localhost'; // Adjust this URL to match your API server's address.
    protected $httpClient;

    protected function setUp(): void
    {
        parent::setUp();
        $this->httpClient = new Client();
    }

    public function testSaveUserWithValidData()
    {
        $url = $this->baseURL . '/api/user/save';
        $userData = [
            'name' => 'New User',
            'email' => 'newuser@example.com',
            'mobile' => '1234567890',
        ];

        $response = $this->httpClient->post($url, [
            'json' => $userData,
        ]);

        $actualResponseCode = $response->getStatusCode();
        $responseData = json_decode($response->getBody()->getContents(), true);

        $this->assertEquals(200, $actualResponseCode);
        $this->assertEquals(0, $responseData['status']);
    }

    public function testSaveUserWithMissingData()
    {
        $url = $this->baseURL . '/api/user/save';
        $userData = [
            'email' => 'newuser@example.com',
            'mobile' => '1234567890',
        ];

        $response = $this->httpClient->post($url, [
            'json' => $userData,
        ]);

        $actualResponseCode = $response->getStatusCode();
        $responseData = json_decode($response->getBody()->getContents(), true);

        $this->assertEquals(200, $actualResponseCode);
        $this->assertEquals(0, $responseData['status']);
    }

    public function testGetUserValid()
    {
        $userId = 1;
        $url = $this->baseURL . "/api/user/get/$userId";
        $response = $this->httpClient->get($url);
        $actualResponseCode = $response->getStatusCode();
        $responseData = json_decode($response->getBody()->getContents(), true);

        $this->assertEquals(200, $actualResponseCode);
        $this->assertEquals(0, $responseData['status']);
    }

    public function testGetUserInvalid()
    {
        $userId = 999; // Assuming this ID does not exist.
        $url = $this->baseURL . "/api/user/get/$userId";
        $response = $this->httpClient->get($url);
        $actualResponseCode = $response->getStatusCode();
        $responseData = json_decode($response->getBody()->getContents(), true);

        $this->assertEquals(200, $actualResponseCode);
        $this->assertEquals(0, $responseData['status']);
    }

    public function testEditUserValid()
    {
        $userId = 1; // Assuming this is a valid user ID.
        $url = $this->baseURL . "/api/user/$userId/edit";
        $userData = [
            'name' => 'Updated User',
            'email' => 'updated@example.com',
            'status' => 'INACTIVE',
            'mobile' => '9876543210',
        ];

        $response = $this->httpClient->put($url, [
            'json' => $userData,
        ]);

        $actualResponseCode = $response->getStatusCode();
        $responseData = json_decode($response->getBody()->getContents(), true);

        $this->assertEquals(200, $actualResponseCode);
        $this->assertEquals(0, $responseData['status']);
    }

    public function testEditUserInvalid()
    {
        $userId = 1; // Assuming this is a valid user ID.
        $incompleteUserData = [
            'name' => 'Updated User',
            'mobile' => '9876543210',
        ];

        $response = $this->httpClient->put($this->baseURL . "/api/user/$userId/edit", [
            'json' => $incompleteUserData,
        ]);

        $actualResponseCode = $response->getStatusCode();
        $responseData = json_decode($response->getBody()->getContents(), true);

        $this->assertEquals(200, $actualResponseCode);
        $this->assertEquals(0, $responseData['status']);
    }

    public function testDeleteUserValid()
    {
        $userId = 1; // Assuming this is a valid user ID.
        $url = $this->baseURL . "/api/user/$userId/delete";
        $response = $this->httpClient->delete($url);
        $actualResponseCode = $response->getStatusCode();

        $this->assertEquals(200, $actualResponseCode);
    }

    public function testDeleteUserInvalid()
    {
        $nonExistentUserId = 999; // Assuming this ID does not exist.
        $response = $this->httpClient->delete($this->baseURL . "/api/user/$nonExistentUserId/delete");
        $actualResponseCode = $response->getStatusCode();
        $responseData = json_decode($response->getBody()->getContents(), true);

        $this->assertEquals(200, $actualResponseCode);
        $this->assertEquals(0, $responseData['status']);
    }
}
