import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import {  Route } from 'react-router';
import {QuizPrincipalPage} from './QuizPrincipalPage';
import {QuizResult} from './QuizResult';
import './App.css';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact  component={QuizPrincipalPage} />
          <Route path="/result"  component={QuizResult}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
