import React, { Component } from 'react';
import cns from 'classnames';

import styles from './style.scss';

class Vcard extends Component {
  render() {
    let { className, ...props } = this.props;
    className = cns(className, styles.vcard);
    return (
      <div className={className}>
        <img className={styles.avatar} src='/statics/images/a.jpg' />
        <span className={styles.username}>{'（づ￣3￣）づ╭❤～的妈咪'}</span>
        <div className={styles.sections}>
          <a className={styles.section}>
            <span className='fa fa-clone fa-2x'></span>
            <span className={styles.sectionName}>{'课程'}</span>
          </a>
          <a className={styles.section}>
            <span className='fa fa-map fa-2x'></span>
            <span className={styles.sectionName}>{'社区'}</span>
          </a>
          <a className={styles.section}>
            <span className='fa fa-bell fa-2x'></span>
            <span className={styles.sectionName}>{'动态'}</span>
          </a>
        </div>
      </div>
    );
  }
}

export default Vcard;
