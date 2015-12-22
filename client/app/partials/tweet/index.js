import React, { Component } from 'react';

import styles from './style.scss';

class Tweet extends Component {
  render() {
    const { tweet } = this.props;
    return (
      <div className={styles.tweet}>
        <div className={styles.brands}>
        </div>
        <div className={styles.metas}>
          <img className={styles.avatar} src={tweet.user.avatar} />
          <div className=''>
            <a className={styles.username} href={tweet.id} title={tweet.user.name}>{tweet.user.name}</a>
            <p className={styles.updatedAt}>{tweet.updated_at}</p>

          </div>
        </div>
        <div className={styles.content}>{tweet.content}</div>
      </div>
    );
  }
}

export default Tweet;
