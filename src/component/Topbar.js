import React, { useState } from 'react';
import SearchView from './views/SearchView';
import { FaRegCommentDots } from 'react-icons/fa';
import { IoLogOut } from 'react-icons/io5';
import Bookmarks from './views/Bookmarks';
import { useChatContext } from './Context/ChatContext';

const Topbar = ({ handleChange, handleSubmit, bookmark, loading, show }) => {
  const { users, handleLogout } = useChatContext();

  return (
    <header className='flex items-center text-gray-600 p-4 justify-between'>
      <div className='text-lg flex gap-2 items-center'>
        <FaRegCommentDots /> Chats
      </div>
      <SearchView
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={loading}
      />

      <div className='Pop'>
        {users.photoURL ? (
          <img
            className=' w-8 h-8 object-cover items-center flex justify-center cursor-pointer rounded-full overflow-hidden App'
            src={users.photoURL}
            alt={'title'}
          />
        ) : (
          <p className=' w-8 h-8 object-cover items-center flex justify-center cursor-pointer rounded-full Pop overflow-hidden App'>
            {users?.displayName?.slice(0, 2).toUpperCase()}
          </p>
        )}
      </div>

      {show ? (
        <div className={'absolute w- right-2 top-16  glass221 animate-slideIn'}>
          {
            <p
              className='py-2 px-3 text-sm cursor-pointer flex gap-2 items-center'
              onClick={handleLogout}
            >
              Logout!
              <IoLogOut />
            </p>
          }
        </div>
      ) : null}
    </header>
  );
};

export default Topbar;
