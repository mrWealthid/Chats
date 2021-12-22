import React from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { db } from '../../firebase-config';

const SidebarOptions = ({ name, title, id }) => {
  //   const history = useHistory();
  //   const selectChannel = () => {
  //     if (id) {
  //       history.push(`/room/${id}`);
  //     } else {
  //       history.push(title);
  //     }
  //   };

  return (
    <div>
      <div>
        <p className='flex '>
          <NavLink className='block space-x-2' to={`/room/${id}`}>
            # {name}
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SidebarOptions;
