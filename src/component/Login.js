import React from 'react';
import { Link } from 'react-router-dom';

import { useChatContext } from './Context/ChatContext';
import { FaSpinner, FaLock } from 'react-icons/fa';

const Login = () => {
  const {
    handleChangeLogin,
    handleLogin,
    email,
    password,
    confirmFields,
    buttonLoader,
    type,
    msg,
  } = useChatContext();
  return (
    <div className='min-h-screen w-full  App flex flex-col'>
      <div className='h-screen  flex flex-col  justify-center items-center'>
        <div className='w-10/12 sm:w-8/12 md:w-5/12 lg:w-4/12 flex flex-col max-w-2xl  gap-1  transition ease-in-out duration-500'>
          <form
            className='py-6 px-8 cap  bg-contain rounded-xl shadow-2xl animate-slideIn flex flex-col gap-2 lg:gap-4 items-center glass2 '
            onSubmit={handleLogin}
          >
            <p className='text-xl text-blue-600 '> Login</p>

            {type ? (
              <p className='text-red-800 animate-slideIn p-2 '>{msg}</p>
            ) : null}

            <input
              type='email'
              placeholder='john@example.com'
              name='email'
              className='my-2 block w-full py-2 px-2 focus:outline-none text-black rounded-lg focus:ring-2 border-none focus:ring-blue-500 focus:border-transparent text-sm'
              value={email}
              onChange={handleChangeLogin}
            />

            <input
              type='password'
              placeholder='Enter Password'
              name='password'
              className='my-2 block w-full py-2 px-2  focus:outline-none border-none focus:ring-blue-500 text-black rounded-lg focus:ring-2  text-sm focus:border-transparent'
              value={password}
              onChange={handleChangeLogin}
            />

            <button
              className={` ${
                !confirmFields ? 'bg-blue-400' : ' bg-blue-800 '
              } text-white text-xs md:text-sm rounded-lg text-center py-2 px-3 text-white flex gap-2 items-center`}
              disabled={!confirmFields}
            >
              Login
              {buttonLoader ? (
                <FaSpinner className='animate-spin' />
              ) : (
                <FaLock />
              )}
            </button>
            {/* <Link className='text-sm' to='/resetPassword'>
            Forgot Password{' '}
          </Link> */}

            <p className=' flex gap-3 text-sm text-gray-300'>
              Need An Account {''}{' '}
              <Link className='text-blue-600 text-sm' to='/Signup'>
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
