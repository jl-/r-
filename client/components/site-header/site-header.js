import React from 'react';
import CLSNS from 'classnames';

import './site-header.scss';

class SiteHeader extends React.Component {
  render() {
    var wrapperClsn = CLSNS('site-header', 'site-header--dark');
    var navItemClsn = CLSNS('site-header__nav-item');
    return (
      <div className={wrapperClsn}>
        <a href="" className={navItemClsn}>Home</a>
        {this.props.children}
      </div>
    );
  }
}

export default SiteHeader;
