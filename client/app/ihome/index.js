import React, { Component, PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { history } from 'react-router/lib/History';
import cns from 'classnames';

import Flex from 'components/flex';

import styles from './style.scss';

import authActionCreators from '../../modules/auth/action-creators';
import AUTH_STATUS from '../../modules/auth/auth-status';

const linkProps = {
  activeClassName: styles.navItemActived,
  className: cns(styles.navItem, 'link link--flat')
};

class Ihome extends Component {
  static contextTypes = {
    history: React.PropTypes.object
  };
  componentWillReceiveProps(nextProps) {
    const auth = nextProps.auth;
    const history = this.context.history;
    if (auth.status !== AUTH_STATUS.AUTHED) {
      history.replaceState(null, '/p');
    }
  }
  logout() {
    this.props.actions.logout();
  }
  render() {
    return (
      <div className={styles.appInner}>
        {/* nav bar */}
        <div className={styles.navBar}>
          <div className={styles.navLinks}>
            <IndexLink to='/' {...linkProps}>{__('app.sections.index')}</IndexLink>
            <Link to='/courses' {...linkProps}>{__('app.sections.courses')}</Link>
            <Link to='/communities' {...linkProps}>{__('app.sections.communities')}</Link>
            <Link to='/home' {...linkProps}>{__('app.sections.home')}</Link>
            <Link to='/activities' {...linkProps}>{__('app.sections.activities')}</Link>
          </div>
          <button className='btn btn--primary-outline btn--sm f-as-c m-r--lg' onClick={::this.logout}>{__('terms.logout')}</button>
        </div>
        {/* body */}
        <div className={styles.body}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ auth: state.auth });
const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(authActionCreators, dispatch) });

const ReduxIhome = connect(mapStateToProps, mapDispatchToProps)(Ihome);

export default ReduxIhome;
