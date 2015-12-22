import React, { Component, PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import { history } from 'react-router/lib/History';
import cns from 'classnames';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Flex from 'components/flex';

import styles from './style.scss';
const linkProps = {
  activeClassName: styles.navItemActived,
  className: cns(styles.navItem, 'link link--flat')
};

class Main extends Component {
  render() {
    return (
      <div className={styles.main}>
        {/* nav bar */}
        <Flex className={styles.navBar} row justifyContent='space-between'>
          <Flex tag='ul' row>
            <IndexLink to='/p' {...linkProps}>{__('app.sections.index')}</IndexLink>
            <Link to='/p/about' {...linkProps}>{__('app.sections.about')}</Link>
          </Flex>
        </Flex>
        {/* body */}
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}


export default Main;
