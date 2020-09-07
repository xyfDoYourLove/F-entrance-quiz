import React, { Component } from 'react';
import './App.scss';
import TraineeList from './TraineeList';
import GroupList from './GroupList';

class App extends Component {
  render() {
    return (
      <div data-testid="app" className="App">
        <GroupList />
        <TraineeList />
      </div>
    );
  }
}

export default App;
