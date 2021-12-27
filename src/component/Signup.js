import React from 'react';
import { Link } from 'react-router-dom';

import { GoSignIn } from 'react-icons/go';

import { useChatContext } from './Context/ChatContext';
import { FaSpinner } from 'react-icons/fa';

const Signup = () => {
  const {
    handleSignup,
    handleChangeRegister,
    register,
    confirmFields,
    type,
    msg,
    buttonLoader,
    handlerImage,
  } = useChatContext();

  return (
    <div className='min-h-screen w-full animate-slideIn Apps flex flex-col '>
      <div className='h-screen flex flex-col  justify-center items-center'>
        <div className='w-8/12    md:w-8/12  flex flex-col max-w-xl gap-2  transition ease-in-out duration-500'>
          <form
            className='py-6 px-8 flex rounded-lg cap bg-contain animate-slideOut shadow-2xl flex-col gap-2 lg:gap-2  '
            onSubmit={handleSignup}
          >
            <p className='text-xl text-center text-blue-600  mb-3'> Sign Up</p>
            {type ? (
              <p className='text-red-900  animate-slideIn p-2 rounded'>{msg}</p>
            ) : null}
            <div className='flex flex-col md:flex-row item-center w-full gap-2 md:gap-4'>
              <input
                type='text'
                placeholder='First Name'
                value={register.firstname}
                name='firstname'
                onChange={handleChangeRegister}
                className='my-2 block w-full py-2 px-2 focus:outline-none border-none focus:ring-blue-500  text-black rounded-lg focus:ring-2  text-sm focus:border-transparent'
              />
              <input
                type='text'
                placeholder='Last Name'
                value={register.lastname}
                name='lastname'
                onChange={handleChangeRegister}
                className='my-2 block w-full py-2 px-2 focus:outline-none border-none focus:ring-blue-500  text-black rounded-lg focus:ring-2  text-sm focus:border-transparent'
              />
            </div>
            <div className='flex flex-col md:flex-row  item-center w-full gap-2 md:gap-4'>
              <input
                type='text'
                placeholder='Email'
                value={register.email}
                name='email'
                onChange={handleChangeRegister}
                className='my-2 block w-full py-2 px-2 focus:outline-none border-none focus:ring-blue-500  text-black rounded-lg focus:ring-2  text-sm focus:border-transparent'
              />
              <input
                type='password'
                placeholder='Password'
                value={register.password}
                name='password'
                onChange={handleChangeRegister}
                className='my-2 block w-full py-2 px-2  focus:outline-none border-none focus:ring-blue-500 
                 text-black rounded-lg focus:ring-2  text-sm focus:border-transparent'
              />
            </div>
            <input
              type='file'
              // placeholder='Password'
              // value={register.password}
              // name='password'
              onChange={handlerImage}
              className='my-2 block w-full py-2 px-2  focus:outline-none border-none focus:ring-blue-500 
                 text-black rounded-lg focus:ring-2  text-sm focus:border-transparent'
            />
            <div className='w-full flex  justify-end'>
              <button
                className={` ${
                  !confirmFields ? 'bg-blue-400' : ' bg-blue-700 '
                }  text-white text-sm rounded-lg  text-white py-2 px-3 text-white flex gap-2 items-center`}
                disabled={!confirmFields}
              >
                SignUp
                {buttonLoader ? (
                  <FaSpinner className='animate-spin' />
                ) : (
                  <GoSignIn />
                )}
              </button>
            </div>
            <p className=' text-sm text-center text-gray-300 flex gap-2 justify-center'>
              {' '}
              Already Have An Account
              <Link className='text-blue-600  text-sm' to='/login'>
                Login
              </Link>{' '}
            </p>{' '}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
