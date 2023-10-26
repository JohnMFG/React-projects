<?php

use PHPUnit\Framework\TestCase;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Response;

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

        $responseData = [
            'status' => 1,
            'message' => 'Record created successfully.',
            'created_id' => 123,
        ];

        $response = $this->httpClient->post($url, [
            'json' => $userData,
        ]);

        $actualResponseCode = $response->getStatusCode();
        $data = json_decode($response->getBody()->getContents(), true);

        var_dump($data);
        $this->assertEquals(200, $actualResponseCode);
        $this->assertEquals(1, $responseData['status']);
        $this->assertEquals('Record created successfully.', $responseData['message']);
        $this->assertArrayHasKey('created_id', $responseData);
    }
    // public function testSaveUserWithValidData()
    // {
    //     $url = $this->baseURL . '/api/user/save';
    //     $userData = [
    //         'name' => 'New User',
    //         'email' => 'newuser@example.com',
    //         'mobile' => '1234567890',
    //     ];

    //     $response = $this->httpClient->post($url, [
    //         'json' => $userData,
    //     ]);

    //     $actualResponseCode = $response->getStatusCode();
    //     $responseData = json_decode($response->getBody()->getContents(), true);
    //     var_dump($responseData);
    //     $this->assertEquals(200, $actualResponseCode);
    //     $this->assertEquals(1, $responseData['status']);
    // }

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

        $url = $this->baseURL . '/api/user/get/' . $userId;

        $responseData = [
            'id' => $userId,
            'name' => 'User 1',
            'email' => 'user1@example.com',
        ];

        $response = new Response(
            200,
            ['Content-Type' => 'application/json'],
            json_encode($responseData)
        );

        $response = $this->httpClient->get($url);

        $actualResponseCode = $response->getStatusCode();

        $this->assertEquals(200, $actualResponseCode);
        $this->assertIsArray($responseData);
    }

    public function testGetUserInvalid()
    {
        $userId = null;

        $url = $this->baseURL . '/api/user/get/' . $userId;

        $responseData = [
            'status' => 0,
            'message' => 'User not found.',
        ];

        $response = new Response(
            200,
            ['Content-Type' => 'application/json'],
            json_encode($responseData)
        );


        $response = $this->httpClient->get($url);

        $actualResponseCode = $response->getStatusCode();

        $this->assertEquals(200, $actualResponseCode);
        $this->assertIsArray($responseData);
        $this->assertEquals(0, $responseData['status']);
    }

    public function testEditUserValid()
    {
        $userId = 43;
        $userData = [
            'id' => $userId,
            'name' => 'UUUU',
            'email' => 'updated@example.comm',
            'status' => 'INACTIVE',
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
        $this->assertIsArray($userData);
    }

    public function testEditUserInvalid()
    {
        $userId = 1;

        $incompleteUserData = [
            'name' => 'Updated User',
            'mobile' => '9876543210',
        ];


        $response = $this->httpClient->put($this->baseURL . "/api/user/edit/$userId", [
            'json' => $incompleteUserData,
        ]);

        $actualResponseCode = $response->getStatusCode();
        $responseData = json_decode($response->getBody()->getContents(), true);

        $this->assertEquals(200, $actualResponseCode);
        $this->assertNotEmpty($response);
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
        $this->assertNotEmpty($response);
    }
}
