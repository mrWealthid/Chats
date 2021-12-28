import Home from './component/Home';

import { Route, Switch } from 'react-router-dom';
import Login from './component/Login';
import Signup from './component/Signup';
import PrivateRoute from './component/PrivateRoute';
import Files from './component/Files';

function App() {
  return (
    <div className='App justify-center items-center flex'>
      <Switch>
        <PrivateRoute exact path='/' component={Home} />
        <Route path='/:id/:roomId' component={Home} />
        <Route path='/Login' component={Login} />
        <Route path='/Signup' component={Signup} />
        <Route path='/Files' component={Files} />
      </Switch>
    </div>
  );
}

export default App;
