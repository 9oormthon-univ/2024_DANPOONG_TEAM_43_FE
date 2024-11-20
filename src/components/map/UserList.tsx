import React from 'react';

interface UserListProps {
  userData: any[];
  onViewChange: () => void;
}

const UserList: React.FC<UserListProps> = ({ userData, onViewChange }) => {
  return (
    <div className="w-full h-screen overflow-y-scroll">
      <div className="p-4">
        <button onClick={onViewChange} className="bg-gray-200 px-4 py-2 rounded-lg">지도 보기</button>
      </div>
      <ul className="p-4 space-y-4">
        {userData.map((user) => (
          <li key={user.userId} className="p-4 border rounded-lg shadow">
            <p><strong>{user.userType}</strong> {user.address}</p>
            <p>{user.story}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;