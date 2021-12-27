import React from 'react';

const Img = ({ users, classes, check }) => {
  return (
    <div className={`${classes}`}>
      {check?.photoURL ? (
        <img
          className='w-8 h-8 object-cover items-center flex justify-center cursor-pointer rounded-full overflow-hidden Pop'
          src={check?.photoURL}
          alt={'title'}
        />
      ) : (
        <p
          className={`w-8 h-8 object-cover items-center flex justify-center cursor-pointer rounded-full ${classes} overflow-hidden text-blue-900 bg-gray-200`}
        >
          {check === 'users'
            ? users.displayName?.slice(0, 2).toUpperCase()
            : check.name?.slice(0, 2).toUpperCase()}
        </p>
      )}
    </div>
  );
};

Img.defaultProps = {
  alt: 'partnerIcons',
  classes: 'Pop',
  check: 'users',
};

export default Img;
