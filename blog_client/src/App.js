import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
}
  from 'react-router-dom';

import './App.css';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ArticlesPage from './components/Articles/ArticlesPage';
import ArticlesListPage from './components/Articles/ArticlesListPage';

import NavBar from './NavBar';
import NotFoundPage from './components/NotFoundPage';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <div id="page-body">
            <Switch>
              <Route path="/" component={HomePage} exact />
              <Route path="/about" component={AboutPage} />
              <Route path="/article/:name" component={ArticlesPage} />
              <Route path="/articles-list" component={ArticlesListPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </div>
      </Router>

    );
  }
}

export default App;
