import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ViewUser() {
    const [user, setUser] = useState({});
    const { id } = useParams();

    useEffect(() => {
        getUser();
    }, []);

    function getUser() {
        axios.get(`http://localhost:80/api/user/${id}`).then(function (response) {
            console.log(response.data);
            setUser(response.data);
        });
    }

    return (
        <div className="container mt-4">
            <h1>User Details</h1>
            <table className="table table-bordered">
                <tbody>
                    <tr>
                        <th>Name:</th>
                        <td>{user.name}</td>
                    </tr>
                    <tr>
                        <th>Email:</th>
                        <td>{user.email}</td>
                    </tr>
                    <tr>
                        <th>Status:</th>
                        <td>{user.status}</td>
                    </tr>
                    <tr>
                        <th>Mobile:</th>
                        <td>{user.mobile}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
