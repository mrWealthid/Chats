import React from 'react';

import { useChatContext } from '../Context/ChatContext';
import SidebarOptions from './SidebarOptions';
import { FaPlusCircle } from 'react-icons/fa';
import { db } from '../../firebase-config';
import { collection, addDoc } from 'firebase/firestore';

const Sidebar = () => {
  const { channels } = useChatContext();

  const addChannel = async () => {
    const channelName = prompt('Please enter the Channel name');

    if (channelName) {
      await addDoc(collection(db, 'rooms'), {
        name: channelName,
        messages: [],
      });

      //   db.collection('rooms').add({
      //     name: channelName,
      //   });
    }
  };
  return (
    <section className='flex  flex-col gap-3'>
      <p
        onClick={addChannel}
        className='flex gap-2 p-2 cursor-pointer items-center'
      >
        {' '}
        # Add Channel <FaPlusCircle />{' '}
      </p>
      {channels.map((channel) => (
        <SidebarOptions {...channel} key={channel.id} />
      ))}
    </section>
  );
};

export default Sidebar;
