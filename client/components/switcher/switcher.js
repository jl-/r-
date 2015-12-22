import React, { Component, PropTypes } from 'react';
import CLSNS from 'classnames';

import './switcher.scss';

class Switcher extends Component {
  static defaultProps = {
    isOn: true
  }
  static contextTypes = {
    store: PropTypes.object
  };
  componentDidMount() {
    console.log('switcher store:');
    console.log(this.context);
  }
  render() {
    const { isOn, onToggle } = this.props;
    let clsn = CLSNS({
      switcher: true,
      'switcher--on': isOn,
      'switcher--off': !isOn
    });
    return (
      <div className={clsn} onClick={onToggle}>
        <span className='switcher__on'>ON</span>
        <span className='switcher__btn'></span>
        <span className='switcher__off'>OFF</span>
      </div>
    );
  }
}

export default Switcher;
