import React from 'react';
import { NavLink } from 'react-router-dom';

const SidebarOptions = ({ name, title, id }) => {
  const styles = {
    color: 'midnightBlue',
    background: 'gray',
    width: '100%',
  };
  return (
    <div>
      <NavLink
        activeStyle={styles}
        className='block py-2 px-2 space-x-2'
        to={`/room/${id}`}
      >
        # {name}
      </NavLink>
    </div>
  );
};

export default SidebarOptions;
