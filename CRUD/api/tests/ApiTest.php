<?php

use PHPUnit\Framework\TestCase;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Response;
use PHPUnit\Framework\MockObject\MockObject;


class ApiTest extends TestCase
{
    protected $baseURL = 'http://localhost';
    protected $httpClient;
    /** @var MockObject */
    protected $mockDb;

    protected function setUp(): void
    {
        parent::setUp();
        $this->httpClient = new Client();
        // $this->httpClient = $this->getMockBuilder(Client::class)->getMock();

        // include 'MockDatabase.php';
        $this->mockDb = $this->getMockBuilder(MockDatabase::class)->getMock();
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
        $data = json_decode($response->getBody()->getContents(), true);

        var_dump($data);
        $this->assertEquals(200, $actualResponseCode);
        $this->assertIsArray($data);
        $this->assertEquals(1, $data['status']);
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
        $this->assertEquals(1, $responseData['status']);
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
        $this->assertIsArray($responseData);
        $this->assertEquals(1, $responseData['status']);
        $this->assertEquals('Please provide all required fields.', $responseData['message']);
    }



    public function testDeleteUserValid()
    {
        $userId = 91;

        $url = $this->baseURL . '/api/user/' . $userId . '/delete';
        $response = $this->httpClient->delete($url);
        $responseCode = $response->getStatusCode();

        $this->assertEquals(200, $responseCode);
        $this->assertNotEmpty($response);
    }

    public function testDeleteUserInvalid()
    {
        $nonExistentUserId = 999;

        $response = $this->httpClient->delete($this->baseURL . "/api/user/delete/$nonExistentUserId");

        $responseCode = $response->getStatusCode();
        $responseData = json_decode($response->getBody()->getContents(), true);

        $this->assertEquals(200, $responseCode);
        $this->assertNotEmpty($response);
        $this->assertEquals(1, $responseData['status']);
        $this->assertEquals('Record deleted successfully.', $responseData['message']);
    }
}
    ////////////////////////////////
//     public function testGetUserById()
//     {
//         $userId = 83;
//         $this->existingId($userId);
//     }

//     public function testCreateUser()
//     {
//         $userData = [
//             'name' => 'S',
//             'email' => 'test@example.com',
//             'status' => 'ACTIVE',
//             'mobile' => '111111111',
//         ];

//         $url = $this->baseURL . '/api/user/save';
//         $options = [
//             'json' => $userData,
//         ];

//         $response = $this->httpClient->post($url, $options);

//         $actualResponseCode = $response->getStatusCode();
//         $data = json_decode($response->getBody()->getContents(), true);

//         var_dump($data);
//         $this->assertEquals(200, $actualResponseCode);
//         $this->assertIsArray($data);
//         $this->assertEquals(1, $data['status']);

//         $this->assertArrayHasKey('created_id', $data);
//         $this->assertGreaterThan(0, $data['created_id']);

//         $createdId = (int)$data['created_id'];
//         $this->checkData($createdId, $userData);
//     }


//     public function testUpdateUser()
//     {
//         $userId = 43;
//         $userData = [
//             'id' => $userId,
//             'name' => 'UUUU',
//             'email' => 'updated@example.comm',
//             'status' => 'INACTIVE',
//             'mobile' => '9876543210',
//         ];

//         $url = $this->baseURL . '/api/user/' . $userId . '/edit';
//         $options = [
//             'json' => $userData,
//         ];

//         $this->existingId($userId);

//         $response = $this->httpClient->put($url, $options);

//         $actualResponseCode = $response->getStatusCode();
//         $data = json_decode($response->getBody()->getContents(), true);


//         $this->assertEquals(200, $actualResponseCode);
//         $this->assertIsArray($data);
//         $this->assertEquals(1, $data['status']);

//         $this->checkData($userId, $userData);
//     }



//     public function testDeleteUser()
//     {

//         $userId = 91;

//         $this->existingId($userId);

//         $urlBeforeDeletion = $this->baseURL . '/api/user/' . $userId;
//         $responseBeforeDeletion = $this->httpClient->get($urlBeforeDeletion);
//         $dataBeforeDeletion = json_decode($responseBeforeDeletion->getBody()->getContents(), true);

//         $url = $this->baseURL . '/api/user/' . $userId . '/delete';
//         $response = $this->httpClient->delete($url);
//         $actualResponseCode = $response->getStatusCode();

//         $this->assertEquals(200, $actualResponseCode);

//         $urlAfterDeletion = $this->baseURL . '/api/user/' . $userId;
//         $responseAfterDeletion = $this->httpClient->get($urlAfterDeletion);
//         $dataAfterDeletion = json_decode($responseAfterDeletion->getBody()->getContents(), true);

//         $this->assertNotEquals($dataBeforeDeletion, $dataAfterDeletion);
//     }




//     public function existingId($userId)
//     {
//         $url = $this->baseURL . '/api/users/' . $userId;
//         $response = $this->httpClient->get($url);

//         $actualResponseCode = $response->getStatusCode();
//         $data = json_decode($response->getBody()->getContents(), true);

//         if ($actualResponseCode === 200) {
//             $this->assertIsArray($data, 'Maybe user does not exist?');
//             $this->assertArrayHasKey('id', $data);
//             $this->assertArrayHasKey('name', $data);
//             $this->assertArrayHasKey('email', $data);

//             var_dump($data);
//         } else {
//             $this->fail('Something is wrong');
//         }
//     }

//     public function checkData($userId, $data)
//     {
//         $urlGET = $this->baseURL . '/api/users/' . $userId;
//         $responseGET = $this->httpClient->get($urlGET);

//         $actualResponseCodeGET = $responseGET->getStatusCode();
//         $dataGET = json_decode($responseGET->getBody()->getContents(), true);

//         if ($actualResponseCodeGET === 200) {
//             $this->assertEquals($data['name'], $dataGET['name'], 'fail');
//             $this->assertEquals($data['status'], $dataGET['status']);
//             $this->assertEquals($data['email'], $dataGET['email']);
//             $this->assertEquals($data['mobile'], $dataGET['mobile']);
//         } else {
//             $this->fail('Data does not match!');
//         }
//     }

//     protected $arr = [];
// }
