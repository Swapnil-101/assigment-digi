// UserList.js (Styled with Tailwind CSS)
import React, { useState, useEffect } from 'react';
import { getUsers } from '../api/api';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newUser, setNewUser] = useState({ name: '', email: '', address: '', company: '' });

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
    });
  }, []);

  useEffect(() => {

    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);


  const addUser = () => {
    if (newUser.name && newUser.email && newUser.address && newUser.company) {
      setUsers([...users, newUser]);
      // Clear the input fields after adding the user
      setNewUser({ name: '', email: '', address: '', company: '' });
    }
  };


  const deleteUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('users'));
    if (savedUsers) {
      setUsers(savedUsers);
    }
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">

      <input
        type="text"
        placeholder="Search by username"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-3/4 sm:w-1/2 px-4 py-2 border rounded-lg shadow-md mb-4"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredUsers.map((user) => (
          <div key={user.id} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-2 text-indigo-700">{user.name}</h2>
            <p className="text-gray-600">Email: {user.email}</p>
            <p className="text-gray-600">Address: {user.address.street}, {user.address.city}</p>
            <p className="text-gray-600">Company: {user.company.name}</p>
            <button onClick={() => deleteUser(user.id)} className="bg-red-500 text-white px-2 py-1 mt-2 rounded-md hover:bg-red-600">Delete</button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 mt-4">
        <h2 className="text-lg font-semibold mb-2 text-indigo-700">Add User</h2>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg mb-2"
        />
        <input
          type="text"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg mb-2"
        />
        <input
          type="text"
          placeholder="Address"
          value={newUser.address}
          onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg mb-2"
        />
        <input
          type="text"
          placeholder="Company"
          value={newUser.company}
          onChange={(e) => setNewUser({ ...newUser, company: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg mb-2"
        />
        <button onClick={addUser} className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">Add</button>
      </div>
    </div>
  );
};

export default UserList;
