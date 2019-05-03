import React from 'react';
// TBD Animation
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { BubbleSteps } from './bubble';

class Visualizer extends React.Component {

  constructor(props) {
    super(props);
    this.timeoutRef = null;
    this.steps = BubbleSteps(props.list);
    this.state = { step: -1, list: props.list };
  }

  restart() {
    this.setState({ step: -1, list: this.props.list })
  }

  next() {
    const { step, list } = this.state;
    const { steps } = this;
    
    let _step = Math.min(steps.length, step + 1);
    if (_step >= 0) {
      const current = steps[_step] || {};
      if (current.action == 'swap') {
        this.timeoutRef = null;
        // then update state.list
        const { i, j } = current;
        let _list = list.slice(0, i).concat(
          [list[j]],
          list.slice(i + 1, j),
          [list[i]],
          list.slice(j + 1));

        this.setState({ step: _step, list: _list });
      } else {
        if (current.action == 'swap-show') {
          this.timeoutRef = setTimeout(this.next.bind(this), 1000);
        }
        this.setState({ step: _step });
      }
    }
  }

  render() {
    const { step, list } = this.state;
    const current = this.steps[step] || {};
    return (
      <div className="visualizer">
        <div className="list">
          {list.map((item, index) =>
            // TBD Animation ReactCSSTransitionGroup
            <div className={(index == current.i || index == current.j) ? current.action : ''} key={index}>{item}</div>
          )}
        </div>
        <button onClick={() => this.next()} disabled={step >= this.steps.length>0 || !!this.timeoutRef }>next</button>
        <div className="status">
          {(step >= 0) && <em>{`${step} / ${this.steps.length}`}</em>}
          <span className="action">{current.action}</span>
          <span>{current.i}</span>
          <span>{current.j}</span>
          {(step >= 0) && <button onClick={() => this.restart()}>restart</button>}
        </div>
      </div>
    );
  };
}

export default Visualizer;





