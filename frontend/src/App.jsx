import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';
import Register from './components/Register/Register';

const App = () => (
  <Router>
    <div className="app">
      <Switch>
        <Route path="/" exact component={Join} />
        <Route path="/chat" component={Chat} />
        <Route path="/register" component={Register} />
      </Switch>
    </div>
  </Router>
);

export default App;
