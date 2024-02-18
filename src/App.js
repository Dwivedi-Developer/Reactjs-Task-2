
import React, { useState, useEffect } from 'react';

import ClipLoader from "react-spinners/ClipLoader";

const API_URL = 'https://602e7c2c4410730017c50b9d.mockapi.io/users';

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className=" main flex w-full">
      
      <div className= " left w-[75vw] flex  flex-col " >
      <h1 className='p-2 text-center text-3xl text-black font-semibold sticky top-0 w-full bg-white'>Users' List</h1>
        {loading && <div className='w-[100vw] items-center flex justify-center h-[100vh] '><ClipLoader color='#FF0000' /></div>}
        {!loading && error && <p className="text-red-500">{error}</p>}
        {!loading && !error && users.length === 0 && <p>No data to show</p>}
        {!loading && !error && users.length > 0 && (
          
          <ul className='flex flex-wrap gap-3 max-[607px]:px-1 justify-center bg-green-700 border-r-2 border-black'>
            {users.map((user) => (
              <li
                key={user.id}
                className=" user-list flex items-center p-2 cursor-pointer w-[250px] my-4 border-2 border-black bg-white hover:bg-gray-700 hover:text-white hover:border-white "
                onClick={() => handleUserClick(user)}
              >
                <img
                  src={user.avatar}
                  alt={user.username}
                  className=" w-3/12 h-auto rounded-full mr-2 border-2 border-black"
                />
                <span className='inline-block w-fit  text-2xl font-bold ml-4'>{user.profile.firstName}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="xl:w-[25vw] sm:w-[70vw] right ">
      <h1 className='max-[640px]:w-[190px] detail text-center sticky top-0 w-full p-2 bg-white text-3xl text-black font-semibold'>Users' Detail</h1>
        {selectedUser && (
          <div className='mob  bg-gray-300 w-full p-4 flex flex-col items-center sticky top-[52.5px]'>
            <img
              src={selectedUser.avatar}
              alt={selectedUser.name}
              className="w-32 h-32 border-4 border-black rounded-full mb-4"
            />
            <h2 className="text-xl font-bold mb-2">{selectedUser.profile.username}</h2>
            <div className='w-full'>
            <p className='max-[550px]:flex max-[550px]:flex-col max-[550px]:items-center max-[550px]:my-3 gap-2' ><span className='text-black font-semibold max-[550px]:font-bold '>First Name:</span> <span className='text-red-700 font-bold'> {selectedUser.profile.firstName}</span></p>
            <p className='max-[550px]:flex max-[550px]:flex-col max-[550px]:items-center max-[550px]:my-3 gap-2'><span className='text-black font-semibold max-[550px]:font-bold'>Last Name:</span> <span className='text-red-700 font-bold'> {selectedUser.profile.lastName}</span></p>
            <p className='max-[550px]:flex max-[550px]:flex-col max-[550px]:items-center max-[550px]:my-3 gap-2'><span className='text-black font-semibold max-[550px]:font-bold'>Email:</span> <span className='text-red-700 font-bold'>{selectedUser.profile.email}</span></p>
            <p className='max-[550px]:flex max-[550px]:flex-col max-[550px]:items-center  max-[550px]:my-3 gap-2'><span className='text-black font-semibold max-[550px]:font-bold'>Job:</span> <span className='text-red-700 font-bold'>{selectedUser.jobTitle}</span></p>
            <p className='max-[550px]:flex max-[550px]:flex-col max-[550px]:items-center  max-[550px]:my-3 gap-2 '><span className='text-black font-semibold max-[550px]:font-bold'>Bio:</span> <span className='text-red-700 font-bold' >{selectedUser.Bio}</span></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
