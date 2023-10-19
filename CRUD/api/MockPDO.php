<?php

class MockPDO extends PDO {
    private $data = [];

    public function __construct() {
        parent::__construct('sqlite::memory:', 'username', 'password');
    }

    public function seedData($sql, $data) {
        $this->data[$sql] = $data;
    }
}
