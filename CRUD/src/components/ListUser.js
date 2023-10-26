import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ListUser() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    function getUsers() {
        axios.get('http://localhost:80/api/users/').then(function (response) {
            console.log(response.data);

            if (Array.isArray(response.data.users)) {
                setUsers(response.data.users);
            } else {
                console.error("Invalid response format:", response.data);
            }
        });
    }

    const deleteUser = (id) => {
        axios
            .delete(`http://localhost:80/api/user/delete`, { data: { id } })
            .then(function (response) {
                console.log(response.data);
                getUsers();
            })
            .catch(function (error) {
                console.error("Server Error:", error.response ? error.response.data : error.message);
            });
    };
    

    return (
        <div className="container mt-4">
            <h1>List Users</h1>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Mobile</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, key) =>
                        <tr key={key}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.status}</td>
                            <td>{user.mobile}</td>
                            <td>
                                <Link to={`user/${user.id}/view`} className="btn btn-success mr-2">View</Link>
                                <Link to={`user/${user.id}/edit`} className="btn btn-primary mr-2">Edit</Link>
                                <button onClick={() => deleteUser(user.id)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
