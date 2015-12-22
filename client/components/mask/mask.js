/**
 * Create a full-screen mask
 *
 * @example
 * <Mask anim='', >
 *   <div> Hi </div>
 * </Mask>
 */
import React, { Component, PropTypes } from 'react';
import styles from './mask.icss';

class Mask extends Component {
  static propTypes = {
    anim: PropTypes.string.isRequired
  };
  static defaultProps = {

  };
  render() {
    return (
      <div className={styles.base}>

      </div>
    );
  }
}

export default Mask;
