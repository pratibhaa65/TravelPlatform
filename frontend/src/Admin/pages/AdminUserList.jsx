import axios from "axios";
import { useEffect, useState } from "react";

const AdminUsersList = () => {
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/users/admin/users", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setUsers(res.data))
            .catch((err) => console.error(err));
    }, [token]);

    const normalUsers = users.filter((u) => u.role === "user");
    const admins = users.filter((u) => u.role === "admin");

    const Table = ({ title, data }) => (
        <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">{title}</h2>

            <table className="w-full max-w-4xl table-auto bg-white shadow-lg rounded-xl overflow-hidden">
                <thead className="bg-blue-900 text-white">
                    <tr>
                        <th className="py-3 px-4 text-left">Name</th>
                        <th className="py-3 px-4 text-left">Email</th>
                        <th className="py-3 px-4 text-center">Joined</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((user) => (
                        <tr key={user._id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">{user.name}</td>
                            <td className="py-3 px-4">{user.email}</td>
                            <td className="py-3 px-4 text-center">
                                {new Date(user.createdAt).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}

                    {data.length === 0 && (
                        <tr>
                            <td colSpan="4" className="text-center py-6 text-gray-500">
                                No records found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto">
            <Table title="🛡️ Admins" data={admins} />
            <Table title="👤 Users" data={normalUsers} />
        </div>
    );
};

export default AdminUsersList;
