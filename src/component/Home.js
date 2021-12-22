import React, { useState, useEffect, useRef } from 'react';

import { getRecipes } from '../component/utils/helpers';
import { useParams } from 'react-router-dom';
import ChatContainer from './views/ChatContainer';
import Sidebar from './views/Sidebar';
import Spinner from './views/Spinner';
import { RESULT_PER_PAGE, START_PAGE } from './config';

import Topbar from './Topbar';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
const Home = () => {
  const [show, setShow] = useState(false);
  const handlePopup = (e) => {
    const btn = e.target.closest('.Pop');

    if (e.target.classList.contains('Pop')) {
      setShow(!show);
    } else {
      setShow(false);
    }
  };

  return (
    <div
      className='glass21 w-11/12 flex flex-col relative rounded-lg'
      onClick={handlePopup}
    >
      <Topbar show={show} />
      <section className='flex'>
        <section className='glass21 w-2/5 min-h-screen py-3 rounded-2xl'>
          <Sidebar />
        </section>
        <section className='flex w-full flex-col min-h-screen '>
          <ChatContainer />
        </section>
      </section>
    </div>
  );
};

export default Home;
