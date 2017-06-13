import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Redirect
} from 'react-router-dom';

import App from './App';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

import registerServiceWorker from './registerServiceWorker';
import 'antd/dist/antd.css';

import AV from 'leancloud-storage';

const appId = 'Nm3hDM8b75jzvnJV7fEOdDRv-gzGzoHsz';
const appKey = '4KCuUxCOkAj0KjqpBWRjEOfs';
AV.init({ appId, appKey });
localStorage.setItem('debug', 'leancloud*');

ReactDOM.render(
	<Router>
      <div>
        <Route path="/" />
        <Redirect from="/" to="dashboard" />
        <Route path="/home" component={App} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/login" component={Login}/>
      </div>
    </Router>, document.getElementById('root'));

registerServiceWorker();
