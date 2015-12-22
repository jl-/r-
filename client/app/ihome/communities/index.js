import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import cns from 'classnames';
import tweetActionCreators from '../../../modules/tweets/action-creators';


import styles from './style.scss';

import Tweet from '../../partials/tweet';
import Vcard from '../../partials/vcard';

class Communities extends Component {
  componentWillMount() {
    let { actions } = this.props;
    actions.fetch();
  }
  createTweets() {
    let { tweets } = this.props;
    if (!tweets.data) return 'fetching';
    return tweets.data.map((tweet, index) => <Tweet key={tweet.id} tweet={tweet}></Tweet>);
  }

  render() {
    return (
      <div className={styles.communities}>
        <Vcard className={styles.vcard}></Vcard>
        <div className={styles.tweets}>{this.createTweets()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({tweets: state.tweets});
const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(tweetActionCreators, dispatch)});

const ReduxCommunities = connect(mapStateToProps, mapDispatchToProps)(Communities);

export default ReduxCommunities;
