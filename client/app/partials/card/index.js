import React, { Component } from 'react';

import styles from './style.scss';

class Card extends Component {
  render() {
    return (
      <div className={styles.card}>
        {this.props.children}
      </div>
    );
  }
}

export default Card;
