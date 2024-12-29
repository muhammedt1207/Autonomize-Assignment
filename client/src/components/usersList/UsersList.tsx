import React, { useEffect, useState } from 'react';
import './UserList.css'
import axios from 'axios';
import { endpoint } from '../../config/EndPoints';
import { toast } from 'sonner';

interface User {
  _id: string;
  avatar_url: string;
  name: string;
  location: string;
  followers: number;
  following: number;
}

export const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 5;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      
      fetchUsers();
    }, [page, search]);


    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${endpoint}/users/get-users`, {
          params: { page, limit, search },
        });
        setUsers(res.data.users);
        setTotal(res.data.total);
        
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

  const handleDelete = async (id: string) => {
    try {
      if (confirm('Are you sure you want to delete this user?')) {
        const res = await axios.delete(`${endpoint}/${id}`);
        setPage(1); 
        fetchUsers()
        toast.success('User deleted successfully!')
      }
    } catch (error: any) {
        toast.error('Error deleting user')
      console.error('Error deleting user:', error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="table-section">
      <input
        type="text"
        placeholder="Search users,location..."
        value={search}
        onChange={handleSearchChange}
      />
      <table>
        <thead>
          <tr className="table-headers">
            <th>Si.No</th>
            <th>Image</th>
            <th>Name</th>
            <th>Location</th>
            <th>Followers</th>
            <th>Following</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1 + (page - 1) * limit}</td>
                <td>
                  <img src={user.avatar_url} alt={user.name} width="50" height="50" />
                </td>
                <td>{user.name || 'N/A'}</td>
                <td>{user.location || 'N/A'}</td>
                <td>{user.followers}</td>
                <td>{user.following}</td>
                <td>
                  <button
                    onClick={() => handleDelete(user._id)}
                    style={{ backgroundColor: 'red' }}

                  >Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              {loading ? (
                <td colSpan={7}>Loading users...</td>
              ) : (
                <td colSpan={7}>No users found</td>
              )}
            </tr>
          )}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: Math.ceil(total / limit) }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={page === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
