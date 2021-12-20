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
  // const history = useHistory();

  //Pagination features
  //We are on page One and there are other pages
  //We are  on page One and there are no other pages

  //last page

  //other pages

  return (
    <div className='glass21 w-11/12 flex flex-col relative rounded-lg'>
      <Topbar />
      <section className='flex'>
        <section className='glass21 w-2/5 min-h-screen py-3 rounded-2xl'>
          <Sidebar />
        </section>
        <section className='flex w-full min-h-screen '>
          <ChatContainer />
        </section>
      </section>
    </div>
  );
};

export default Home;
