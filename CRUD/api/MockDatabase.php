<?php
class MockDatabase {
    
    public function executeQuery($sql, $parameters = null) { 
        switch ($sql) {
            case "SELECT * FROM users":
                return [
                    ['id' => 1, 'name' => 'User 1', 'email' => 'user1@example.com'],
                    ['id' => 2, 'name' => 'User 2', 'email' => 'user2@example.com'],
                ];
            case "SELECT * FROM users WHERE id = :id":
                if ($parameters && isset($parameters[':id'])) {
                    $userId = $parameters[':id'];
                    if ($userId === 1) {
                        return ['id' => 1, 'name' => 'User 111', 'email' => 'user1@example.com'];
                    }
                }
                break;
            case "INSERT INTO users(id, name, email, status, mobile, created_at) VALUES(null, :name, :email, :status, :mobile, :created_at)":
                return ['status' => 1, 'message' => 'Record created successfully.', 'created_id' => 123];
        }
        return [];
    }
}

