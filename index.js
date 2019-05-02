import React, { Component } from 'react';
import { render } from 'react-dom';
import AnyName from './title';
import Visualizer from './visualizer';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React Bubble Visualizer',
      list: [34,1001,2,5,3,9,8,1,5] //,-79,85,24,1,3,45,36,76,22,0,-12]
    };
  }

  render() {
    return (
      <div>
        <AnyName name={this.state.name} />
        <Visualizer list={this.state.list} />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
