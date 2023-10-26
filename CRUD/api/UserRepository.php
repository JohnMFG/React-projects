<?php
class UserRepository {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function save($user) {
        if (empty($user['name']) || empty($user['email']) || empty($user['mobile'])) {
            return ['status' => 0, 'message' => 'Please provide all required fields.'];
        }

        $sql = "INSERT INTO users(name, email, status, mobile, created_at) VALUES(:name, :email, :status, :mobile, :created_at)";
        $stmt = $this->conn->prepare($sql);
        $created_at = date('Y-m-d');
        $stmt->bindParam(':name', $user['name']);
        $stmt->bindParam(':email', $user['email']);
        $stmt->bindParam(':status', $user['status']);
        $stmt->bindParam(':mobile', $user['mobile']);
        $stmt->bindParam(':created_at', $created_at);

        if ($stmt->execute()) {
            return ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            return ['status' => 0, 'message' => 'Failed to create record.'];
        }
    }
    public function findById($id) {
        $sql = "SELECT * FROM users WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    public function findAll() {
        $sql = "SELECT * FROM users";
        $stmt = $this->conn->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function update($id, $user) {
        if (empty($user['name']) || empty($user['email']) || empty($user['mobile'])) {
            return ['status' => 0, 'message' => 'Please provide all required fields.'];
        }
    
        $sql = "UPDATE users SET name = :name, email = :email, status = :status, mobile = :mobile WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':name', $user['name']);
        $stmt->bindParam(':email', $user['email']);
        $stmt->bindParam(':status', $user['status']);
        $stmt->bindParam(':mobile', $user['mobile']);
    
        if ($stmt->execute()) {
            return ['status' => 1, 'message' => 'Record updated successfully.'];
        } else {
            return ['status' => 0, 'message' => 'Failed to update record.'];
        }
    }
    
    public function delete($id) {
        $sql = "DELETE FROM users WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $id);
    
        if ($stmt->execute()) {
            return ['status' => 1, 'message' => 'Record deleted successfully.'];
        } else {
            return ['status' => 0, 'message' => 'Failed to delete record.'];
        }
    }
    
}
?>
