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

        // Check for a successful response
        $this->assertEquals(200, $actualResponseCode);
        $this->assertIsArray($data);

        // Additional validations
        foreach ($data as $user) {
            $this->assertArrayHasKey('id', $user);
            $this->assertArrayHasKey('name', $user);
            $this->assertArrayHasKey('email', $user);
            // Add more validations for user attributes as needed

            // Validate that user status is one of the expected values (ACTIVE, INACTIVE, etc.)
            $this->assertContains($user['status'], ['ACTIVE', 'INACTIVE']);
        }
    }

    public function testGetUserById()
    {
        $userId = 4;
        $this->existingId($userId);

        $url = $this->baseURL . '/api/users/' . $userId;
        $response = $this->httpClient->get($url);

        $data = json_decode($response->getBody()->getContents(), true);
        $this->assertIsArray($data, 'Maybe user does not exist?');
        $this->assertArrayHasKey('id', $data);
        $this->assertArrayHasKey('name', $data);
        $this->assertArrayHasKey('email', $data);

        var_dump($data);

    }

    public function testCreateUser()
    {
        $userData = [
            'name' => 'Test Create',
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

        // Check for a successful response
        $this->assertEquals(200, $actualResponseCode);
        $this->assertIsArray($data);
        $this->assertEquals(1, $data['status']);

        // Additional validations
        $this->assertArrayHasKey('id', $data); // Check for 'id' key in the response
        $this->assertGreaterThan(0, $data['id']); // Ensure 'id' is a positive integer

        $this->assertEquals('Test Create', $data['name']);
        $this->assertEquals('test@example.com', $data['email']);
        // Add more validations for other fields as needed

        // Test that the created user actually exists by fetching it by ID and comparing data
        //$this->testGetUserById();
    }


    public function testUpdateUser()
    {
        $userId = 2;
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

        $this->existingId($userId);

        $response = $this->httpClient->put($url, $options);

        $actualResponseCode = $response->getStatusCode();
        $data = json_decode($response->getBody()->getContents(), true);



        $this->assertEquals(200, $actualResponseCode);
        $this->assertIsArray($data);
        $this->assertEquals(1, $data['status']);

        $urlGET = $this->baseURL . '/api/users/' . $userId;
        $responseGET = $this->httpClient->get($urlGET);

        $dataGET = json_decode($responseGET->getBody()->getContents(), true);

        $this->assertEquals('UUUU', $dataGET['name']);
        $this->assertEquals('INACTIVE', $dataGET['status']);
        $this->assertEquals('updated@example.comm', $dataGET['email']);
        $this->assertEquals('9876543210', $dataGET['mobile']);
    }



    public function testDeleteUser()
    {
        // Assuming you have a valid $userId
        $userId = 2; // Replace with the actual user ID you want to delete

        $this->existingId($userId);

        // Send a GET request to check the user's data before deletion
        $urlBeforeDeletion = $this->baseURL . '/api/user/' . $userId;
        $responseBeforeDeletion = $this->httpClient->get($urlBeforeDeletion);
        $dataBeforeDeletion = json_decode($responseBeforeDeletion->getBody()->getContents(), true);

        // Delete the user
        $url = $this->baseURL . '/api/user/' . $userId . '/delete';
        $response = $this->httpClient->delete($url);
        $actualResponseCode = $response->getStatusCode();

        $this->assertEquals(200, $actualResponseCode);

        // Send another GET request to check the user's data after deletion
        $urlAfterDeletion = $this->baseURL . '/api/user/' . $userId;
        $responseAfterDeletion = $this->httpClient->get($urlAfterDeletion);
        $dataAfterDeletion = json_decode($responseAfterDeletion->getBody()->getContents(), true);

        // Check if the data before and after deletion is different
        $this->assertNotEquals($dataBeforeDeletion, $dataAfterDeletion);
    }




    public function existingId($userId)
    {
        $url = $this->baseURL . '/api/users/' . $userId;
        $response = $this->httpClient->get($url);

        $actualResponseCode = $response->getStatusCode();
        $data = json_decode($response->getBody()->getContents(), true);

        if ($actualResponseCode === 200) {
            $this->assertIsArray($data, 'Maybe user does not exist?');
            $this->assertArrayHasKey('id', $data);
            $this->assertArrayHasKey('name', $data);
            $this->assertArrayHasKey('email', $data);

            return true;
        } else {
            return false;
        }
    }
}