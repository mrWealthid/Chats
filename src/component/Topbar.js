import React from 'react';
import SearchView from './views/SearchView';
import { FaRegCommentDots } from 'react-icons/fa';
import { IoLogOut } from 'react-icons/io5';

import { useChatContext } from './Context/ChatContext';
import Img from './views/Img';

const Topbar = ({ handleChange, handleSubmit, bookmark, loading, show }) => {
  const { users, handleLogout } = useChatContext();

  return (
    <header className='flex items-center text-gray-600 p-4 justify-between'>
      <div className='text-lg flex gap-2 text-blue-800 items-center'>
        <FaRegCommentDots /> Chats
      </div>
      <SearchView
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={loading}
      />

      <Img users={users} check={users} />

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
