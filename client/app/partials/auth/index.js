/**
 * <Auth
 *  type: TYPES.LOGIN | TYPES.SIGNUP,
 *  actions: {}
 *  >
 * </Auth>
 *
 */
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import cns from 'classnames';

import Deck from 'components/deck';
import Input from 'components/paper-input';

import authActionCreators from '../../../modules/auth/action-creators';
import styles from './style.scss';

import {
  isAccount,
  isPassword
} from 'utils/validator';

export const TYPES = {
  LOGIN: 0,
  SIGNUP: 1
};

const STEP_BEGIN = 0;
const STEP_FILL_FORM = 1;

const IS_PARENT = 0;
const IS_EXPERT = 1;

class Auth extends Component {
  static contextTypes = {
    store: PropTypes.any,
    history: PropTypes.object,
    location: PropTypes.object
  };
  constructor(props, context) {
    super(props, context);
    this.state = {type: props.type || TYPES.LOGIN};
  }
  componentWillReceiveProps(nextProps) {
    let { type } = nextProps;
    if (type !== this.props.type) {
      this.setState({type});
    }
  }
  login(e) {
    e.preventDefault();
    const account = this.refs.account.val();
    const password = this.refs.password.val();
    const isAccountValid = isAccount(account);
    const isPasswordValid = isPassword(password);
    console.log(account, password);
    console.log(isAccountValid, isPasswordValid);
    if (isAccountValid && isPasswordValid) {
      this.props.actions.login({account, password});
    }
  }
  signup() {
  }
  getLoginForm() {
    let btnCns = cns({
    }, styles.authBtn, 'btn btn--sm btn--rounded btn--primary btn--raised');
    return (
      <Deck.Slide className='fcol f-jc-c f-ai-c'>
        <form className={styles.loginForm} onSubmit={::this.login}>
          <Input type='text' ref='account' label={__('terms.account')} hint={__('defs.account')}/>
          <Input type='password' ref='password' label={__('terms.password')} hint={' '}/>
          <div className='m-t--sm'>
            <label className={cns(styles.rememberMe, 'cursor--pointer')}><input type='checkbox'/><span className='m-l--sm'>{__('phrases.rememberLogin')}</span></label>
          </div>
          <div className='frow f-ai-c f-jc-sb m-t--md'>
            <input type='submit' className={btnCns} value={__('terms.login')}/>
            <span className={styles.seperator}> </span>
            <a className='btn btn--sm btn--primary-outline btn--rounded' onClick={() => this.setState({type: TYPES.SIGNUP})}>{__('phrases.createAccount')}</a>
          </div>
        </form>
      </Deck.Slide>
    );
  }
  getSignUpForm() {
    const { step = STEP_BEGIN } = this.state;
    let stepContent;
    let btnCns = cns({
    }, styles.authBtn, 'btn btn--sm btn--rounded btn--primary btn--raised');
    if (step === STEP_BEGIN) {
      stepContent = (
        <div className={styles.col}>
          <button className='btn btn--block m-y--md btn--primary btn--rounded btn--raised' onClick={() => this.setState({step: STEP_FILL_FORM})}>{__('phrases.isParent')}</button>
          <button className='btn btn--block m-y--md btn--primary btn--rounded btn--raised' onClick={() => this.setState({step: STEP_FILL_FORM})}>{__('phrases.isExpert')}</button>
        </div>
      );
    } else if (step === STEP_FILL_FORM) {
      stepContent = (
        <form className={styles.signupForm} onSubmit={::this.signup}>
          <Input type='text' ref='account' label={__('terms.account')} hint={__('defs.account')}/>
          <Input type='password' ref='password' label={__('terms.password')} hint={' '}/>
          <div className='m-t--sm'>
            <label className={cns(styles.rememberMe, 'cursor--pointer')}><input type='checkbox'/><span className='m-l--sm'>{__('phrases.rememberLogin')}</span></label>
          </div>
          <div className='frow f-ai-c f-jc-sb m-t--md'>
            <input type='submit' className={btnCns} value={__('terms.login')}/>
            <span className={styles.seperator}> </span>
            <a className='btn btn--sm btn--primary-outline btn--rounded' onClick={() => this.setState({type: TYPES.SIGNUP})}>{__('phrases.createAccount')}</a>
          </div>
        </form>
      );
    }
    return (
      <Deck.Slide className='frow f-jc-sb f-ai-c'>
        <div className={styles.back} onClick={() => this.setState({type: TYPES.LOGIN})}>
          <a className='fa fa-chevron-left'></a>
        </div>
        <div className='f-1 frow f-jc-c f-ai-c'>
          {stepContent}
        </div>
      </Deck.Slide>
    );
  }
  render() {
    let { className } = this.props;
    let { type: current } = this.state;
    className = cns({
      [className]: !!className
    }, styles.auth);
    return (
      <Deck className={className} dura={600} easing='outBack'  current={current} horizontal>
        {this.getLoginForm()}
        {this.getSignUpForm()}
      </Deck>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(authActionCreators, dispatch) };
}
export const ReduxAuth = connect(mapStateToProps, mapDispatchToProps)(Auth);
export default Auth;
