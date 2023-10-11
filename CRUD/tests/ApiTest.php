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

        foreach ($data as $user) {
            $this->assertArrayHasKey('id', $user);
            $this->assertArrayHasKey('name', $user);
            $this->assertArrayHasKey('email', $user);

            $this->assertContains($user['status'], ['ACTIVE', 'INACTIVE']);
        }
    }

    public function testGetUserById()
    {
        $userId =83;
        $this->existingId($userId);

        // $url = $this->baseURL . '/api/users/' . $userId;
        // $response = $this->httpClient->get($url);

        // $data = json_decode($response->getBody()->getContents(), true);
        // $this->assertIsArray($data, 'Maybe user does not exist?');
        // $this->assertArrayHasKey('id', $data);
        // $this->assertArrayHasKey('name', $data);
        // $this->assertArrayHasKey('email', $data);

        // var_dump($data);
    }

    public function testCreateUser()
    {
        $userData = [
            'name' => 'S',
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

        $this->assertArrayHasKey('created_id', $data);
        $this->assertGreaterThan(0, $data['created_id']);

        $createdId = (int)$data['created_id'];
        $this->checkData($createdId, $userData);
    }


    public function testUpdateUser()
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

        $this->existingId($userId);

        $response = $this->httpClient->put($url, $options);

        $actualResponseCode = $response->getStatusCode();
        $data = json_decode($response->getBody()->getContents(), true);


        $this->assertEquals(200, $actualResponseCode);
        $this->assertIsArray($data);
        $this->assertEquals(1, $data['status']);

        $this->checkData($userId, $userData);

    }



    public function testDeleteUser()
    {
        
        $userId = 91;

        $this->existingId($userId);

        $urlBeforeDeletion = $this->baseURL . '/api/user/' . $userId;
        $responseBeforeDeletion = $this->httpClient->get($urlBeforeDeletion);
        $dataBeforeDeletion = json_decode($responseBeforeDeletion->getBody()->getContents(), true);

        $url = $this->baseURL . '/api/user/' . $userId . '/delete';
        $response = $this->httpClient->delete($url);
        $actualResponseCode = $response->getStatusCode();

        $this->assertEquals(200, $actualResponseCode);

        $urlAfterDeletion = $this->baseURL . '/api/user/' . $userId;
        $responseAfterDeletion = $this->httpClient->get($urlAfterDeletion);
        $dataAfterDeletion = json_decode($responseAfterDeletion->getBody()->getContents(), true);

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

            var_dump($data);
        } else {
            $this->fail('Something is wrong');
        }
    }

    public function checkData($userId, $data)
    {
        $urlGET = $this->baseURL . '/api/users/' . $userId;
        $responseGET = $this->httpClient->get($urlGET);

        $actualResponseCodeGET = $responseGET->getStatusCode();
        $dataGET = json_decode($responseGET->getBody()->getContents(), true);

        if ($actualResponseCodeGET === 200) {
            $this->assertEquals($data['name'], $dataGET['name'], 'fail');
            $this->assertEquals($data['status'], $dataGET['status']);
            $this->assertEquals($data['email'], $dataGET['email']);
            $this->assertEquals($data['mobile'], $dataGET['mobile']);
        } else {
            $this->fail('Data does not match!');
        }
    }
}
