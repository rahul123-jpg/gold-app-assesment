import { useEffect, useState } from "react";
import axios from "axios";

function Admin() {

    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        const res = await axios.get("https://gold-app-assesment.onrender.com/all-users");
        setUsers(res.data);
        
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="p-10">
            <h1 className="text-2xl mb-5">Admin Panel</h1>

            {users.map((u, i) => (
                <div key={i} className="border p-3 m-2">
                    <h2>{u.name}</h2>
                    <p>{u.email}</p>

                    <h3>Scores:</h3>
                    {u.scores.map((s, j) => (
                        <p key={j}>
                            {s.value} - {s.date}
                        </p>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Admin;