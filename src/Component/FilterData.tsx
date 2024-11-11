import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Props = {}

type Users = {
    id: number;
    name: string;
    age: number;
    email: string;
}

export default function FilterData({}: Props) {
    const [data, getUser] = useState<Users[]>([]);
    const [query, setQuery] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const filteredData = data.filter((item) =>
        item.id.toString().includes(query) || 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.age.toString().includes(query) || 
        item.email.toLowerCase().includes(query.toLowerCase())
    );

    const fetchData = async () => {
        try {
            const response = await axios.get<Users[]>("http://localhost:3000/users");
            getUser(response.data);
            console.log(response.data);
        } catch {
            console.log("error");
        }
    }

    useEffect(() => {
        fetchData();
    }, []);
    
    return (
        <div className="flex justify-center h-auto mt-10">
            <div className="w-[60rem] bg-gray-400 p-4">
                <h1 className='text-center font-medium text-2xl'>FilterData</h1>
                <input 
                    type="text" 
                    placeholder='Enter data...' 
                    className='p-3 w-full mt-3' 
                    value={query}
                    onChange={handleInputChange} 
                />
                <div className="mt-5">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>AGE</th>
                                <th>EMAIL</th>
                            </tr>
                        </thead>
                        <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.age}</td>
                                    <td>{user.email}</td>
                                </tr>
                            ))
                        ) : (
                            <p className='text-center w-full p-3'>No users found</p>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
