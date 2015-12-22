import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import cns from 'classnames';

import Input from 'components/paper-input';

import authActionCreators from '../../../modules/auth/action-creators';
import styles from './style.scss';

import { validator } from '../../../../utils';

class SignupForm extends Component {
  static contextTypes = {
    store: PropTypes.any,
    history: PropTypes.object,
    location: PropTypes.object
  };
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  validateUsername(username) {
    return validator.isUsername(username) ? true : __('errors.USERNAME_INVALID');
    return validator.isUsername(username) ? true : __('errors.invalidPassword');
  }
  validateEmail(email) {
    return validator.isEmail(email) ? true : __('errors.EMAIL_INVALID');
  }
  validatePassword(password) {
    return validator.isPassword(password) ? true : __('errors.PASSWORD_INVALID');
  }
  validatePasswordConfirmation(passwordConfirmation) {
    const password = this.refs.password.val();
    return password === passwordConfirmation ? true : __('errors.PASSWORD_CONFIRMATION_INVALID');
  }
  signup(e) {
    e.preventDefault();
    const username = this.refs.username.val(true);
    const email = this.refs.email.val(true);
    const password = this.refs.password.val(true);
    const passwordConfirmation = this.refs.passwordConfirmation.val(true);
    console.log(username, email, password, passwordConfirmation);

    if (username && email && password && passwordConfirmation) {
      this.props.signup({ username, email, password, passwordConfirmation });
    }
  }
  render() {
    let { className, ...props } = this.props;
    let signupBtnCn = cns(styles.signupBtn, 'btn btn--sm btn--rounded btn--primary btn--raised');
    return (
      <form className={cns(className, styles.form)} {...props} onSubmit={::this.signup}>
        <Input type='text' ref='username' label={__('terms.username')} hint={__('defs.username')} validator={::this.validateUsername}/>
        <Input type='email' ref='email' label={__('terms.email')} hint={__('defs.email')} validator={::this.validateEmail}/>
        <Input type='password' ref='password' label={__('terms.password')} hint={__('defs.password')} validator={::this.validatePassword}/>
        <Input type='password' ref='passwordConfirmation' label={__('terms.passwordConfirmation')} hint={' '} validator={::this.validatePasswordConfirmation}/>
        <div className='frow f-ai-c f-jc-sb m-t--md'>
          <a className='btn btn--sm btn--primary-outline btn--rounded' onClick={this.props.switchToLogin}>{__('phrases.switchToLogin')}</a>
          <span className={styles.seperator}> </span>
          <input type='submit' className={signupBtnCn} value={__('terms.signup')} />
        </div>
      </form>
    );
  }
}

export default SignupForm;
