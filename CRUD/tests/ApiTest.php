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
        $userId = 40;
        if ($this->existingId($userId) === false) {
            $this->fail('User does not exist!.');
        }
    }

    public function testCreateUser()
    {
        $userData = [
            'name' => 'Test U',
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

        $this->assertEquals('Test User', $data['name']);
        $this->assertEquals('test@example.com', $data['email']);
        // Add more validations for other fields as needed

        // Test that the created user actually exists by fetching it by ID and comparing data
        //$this->testGetUserById();
    }


    public function testUpdateUser()
    {
        $userId = 33;
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

        if ($this->existingId($userId) === false) {
            $this->fail('User does not exist for editing!.');
        }

        $response = $this->httpClient->put($url, $options);

        $actualResponseCode = $response->getStatusCode();
        $data = json_decode($response->getBody()->getContents(), true);

        $this->assertEquals(200, $actualResponseCode);
        $this->assertIsArray($data);
        $this->assertEquals(1, $data['status']);

        $this->assertArrayHasKey('id', $data);
        $this->assertEquals('Updated User', $data['name']);
        $this->assertEquals('updated@example.com', $data['email']);
    }

    public function testDeleteUser()
    {
        $userId = 41;
        $url = $this->baseURL . '/api/user/' . $userId . '/delete';

        if ($this->existingId($userId) === false) {
            $this->fail('Passed user does not exist in the first place for deleting!!');
        }

        $response = $this->httpClient->delete($url);

        $actualResponseCode = $response->getStatusCode();
        $data = json_decode($response->getBody()->getContents(), true);


        $this->assertEquals(200, $actualResponseCode);
        $this->assertIsArray($data);
        $this->assertEquals(1, $data['status']);

        if ($this->existingId($userId) === true) {
            $this->fail('Failed test: user stil exists!.');
        }
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
