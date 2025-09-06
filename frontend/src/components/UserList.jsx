import React from 'react';

const UserList = ({ users }) => {
  if (!users.length) {
    return <p>No users found.</p>;
  }

  return (
    <div className="user-list">
      {users.map(user => (
        <div key={user._id} className="user-item">
          <h4>{user.name}</h4>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          {user.phone && <p><strong>Phone:</strong> {user.phone}</p>}
          {user.specialization && <p><strong>Specialization:</strong> {user.specialization}</p>}
        </div>
      ))}
    </div>
  );
};

export default UserList;