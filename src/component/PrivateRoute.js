import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useChatContext } from './Context/ChatContext';

function PrivateRoute({ component: Component, ...rest }) {
  //   const { authenticated } = useChatContext();

  const { users } = useChatContext();
  return (
    <Route
      {...rest}
      render={(props) =>
        users ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
}

export default PrivateRoute;
