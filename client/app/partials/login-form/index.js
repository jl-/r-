import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import cns from 'classnames';

import Input from 'components/paper-input';

import { validator } from '../../../../utils';

import authActionCreators from '../../../modules/auth/action-creators';
import styles from './style.scss';


class LoginForm extends Component {
  static contextTypes = {
    store: PropTypes.any,
    history: PropTypes.object,
    location: PropTypes.object
  };
  login(e) {
    e.preventDefault();
    const account = this.refs.account.val();
    const password = this.refs.password.val();
    const isAccountValid = validator.isAccount(account);
    const isPasswordValid = validator.isPassword(password);
    if (isAccountValid && isPasswordValid) {
      this.props.login({ account, password });
    }
  }
  render() {
    let { className, ...props } = this.props;
    let loginBtnCn = cns(styles.loginBtn, 'btn btn--sm btn--rounded btn--primary btn--raised');
    return (
      <form className={cns(className, styles.form)} {...props} onSubmit={::this.login}>
        <Input type='text' ref='account' label={__('terms.account')} hint={__('defs.account')}/>
        <Input type='password' ref='password' label={__('terms.password')} hint={' '}/>
        <div className='m-t--sm'>
          <label className={cns(styles.rememberMe, 'cursor--pointer')}><input type='checkbox'/><span className='m-l--sm'>{__('phrases.rememberLogin')}</span></label>
        </div>
        <div className='frow f-ai-c f-jc-sb m-t--md'>
          <input type='submit' className={loginBtnCn} value={__('terms.login')}/>
          <span className={styles.seperator}> </span>
          <a className='btn btn--sm btn--primary-outline btn--rounded' onClick={this.props.switchToSignup}>{__('phrases.switchToSignup')}</a>
        </div>
      </form>
    );
  }
}

export default LoginForm;
