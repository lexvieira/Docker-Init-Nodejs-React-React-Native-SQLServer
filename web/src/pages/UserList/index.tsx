import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";

interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    dob: Date;
    age: number;
}

const UserList = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        api.get('users').then(response => {
            setUsers(response.data);        
        })
    }, []);

    return (
        <>
            <h1>User List Ecoleta</h1>
            <hr />
            <p>
                List of users registred in our system.
            </p>
            <table>
                <thead>
                    <tr>                    
                        <th>
                            first_name
                        </th>
                        <th>
                            last_name
                        </th>
                        <th>
                            email
                        </th>
                        <th>
                            DOB
                        </th>
                        <th>
                            age
                        </th>
                    </tr>
                 </thead>                    
                    <tbody>
                        {users.map(user => (
                            <tr key={String(user.id)}>                    
                                <td>
                                    {user.first_name}
                                </td>
                                <td>
                                    {user.last_name}
                                </td>
                                <td>
                                    {user.email}
                                </td>
                                <td>
                                    {user.dob}
                                </td>
                                <td>
                                    {user.age}
                                </td>
                            </tr>                        
                        ))}                        
                    </tbody>
            </table>
            <Link to="/">
                <FiArrowLeft />
            </Link>
        </>
    )
}

export default UserList;