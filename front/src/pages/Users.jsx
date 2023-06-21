import { useState, useEffect } from "react";


function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        
    }, []);

    return (
        <div>
            <p>Users List</p>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        Email: {user.email} - Role: {user.role}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Users;