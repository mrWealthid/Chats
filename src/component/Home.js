import React, { useState } from 'react';

import ChatContainer from './views/ChatContainer';
import Sidebar from './views/Sidebar';

import Topbar from './Topbar';

const Home = () => {
  const [show, setShow] = useState(false);
  const handlePopup = (e) => {
    // const btn = e.target.closest('.Pop');

    if (e.target.classList.contains('Pop')) {
      setShow(!show);
    } else {
      setShow(false);
    }
  };

  return (
    <div
      className='glass21 w-full flex flex-col  relative  rounded-lg '
      onClick={handlePopup}
    >
      <Topbar show={show} />
      <section className='flex '>
        <section className='glass21 w-2/5  py-3 rounded-2xl sticky h-full top-3 '>
          <Sidebar />
        </section>
        <section className='flex w-full flex-col min-h-screen'>
          <ChatContainer />
        </section>
      </section>
    </div>
  );
};

export default Home;
