import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import cns from 'classnames';
import authActionCreators from '../../../modules/auth/action-creators';

//import Deck from 'react-slide-deck';
import Deck from 'components/deck';

import LoginForm from '../../partials/login-form';
import SignupForm from '../../partials/signup-form';
import AUTH_STATUS from '../../../modules/auth/auth-status';

import styles from './style.scss';

// slide indexes
const PREFACE_INDEX = 0;
const COURSES_INDEX = 1;
const COMMUNITIES_INDEX = 2;
const EXPERTS_INDEX = 3;
const JOIN_INDEX = 4;

// join steps
const JOIN_STEP_ONE = 0;
const JOIN_STEP_TWO = 1;
const JOIN_STEP_THREE = 2;

// status tracking for animation arrangement
const LEAVING_PREFACE     = 1;
const ENTERING_PREFACE    = 2;
const LEFT_PREFACE        = 4;
const ENTERED_PREFACE     = 8;
const ENTERING_JOIN       = 16;
const ENTERED_JOIN        = 32;
const LEAVING_JOIN        = 64;

class About extends Component {
  static contextTypes = {
    history: React.PropTypes.object
  };
  constructor(props, context) {
    super(props, context);
    this.state = { current: PREFACE_INDEX, currentJoinStep: JOIN_STEP_ONE, status: ENTERED_PREFACE };
  }
  componentWillReceiveProps(nextProps) {
    const auth = nextProps.auth;
    const history = this.context.history;
    if (auth.status === AUTH_STATUS.AUTHED) {
      history.replaceState(null, '/');
    }
  }
  onSwitchStarted({ prev, current }) {
    let status = this.state.status;
    if (prev === PREFACE_INDEX) {
      status = LEAVING_PREFACE;
    } else if (current === PREFACE_INDEX) {
      status = ENTERING_PREFACE;
    } else if (current === JOIN_INDEX) {
      status = LEFT_PREFACE | ENTERING_JOIN;
    } else if (prev === JOIN_INDEX) {
      status = LEFT_PREFACE | LEAVING_JOIN;
    }
    this.setState({ status });
  }
  onSwitchDone({ prev, current }) {
    let status = current === PREFACE_INDEX ? ENTERED_PREFACE : LEFT_PREFACE;
    if (current === JOIN_INDEX) {
      status |= ENTERED_JOIN;
    }
    this.setState({ current, status });
  }
  getNavBar() {
    const status = this.state.status;
    let cn = cns({
      [styles.navBarBare]: status & (ENTERED_PREFACE | LEAVING_PREFACE),
      [styles.navBarTopDown]: status & LEFT_PREFACE,
      [styles.navBarBottomUp]: status === ENTERED_PREFACE,
      [styles.navBarBottomDown]: status === LEAVING_PREFACE,
      [styles.navBarTopUp]: status === ENTERING_PREFACE,
      [styles.navBarWithoutAuth]: status & (ENTERING_JOIN | ENTERED_JOIN | LEAVING_JOIN)
    }, styles.navBar);
    let what, authNavs;
    if (status === ENTERED_PREFACE || status === LEAVING_PREFACE) {
      what = <a className={styles.navBarWhat} onClick={() => this.setState({ current: COURSES_INDEX })}>{__('app.about.what')}</a>;
      what = <a className={styles.prefaceToNext} onClick={() => this.setState({ current: COURSES_INDEX })}></a>
    } else {
      what = <a><span className={cns(styles.logo, 'm-r--md')}></span>{__('app.metas.name')}</a>;
      authNavs = <div className={styles.navBarAuth}>
                   <button className={styles.navBarAuthBtn} onClick={() => this.setState({ current: PREFACE_INDEX })}>{__('terms.signup')}</button>
                   <button className={styles.navBarAuthBtn} onClick={() => this.setState({ current: JOIN_INDEX })}>{__('terms.login')}</button>
                 </div>;
    }
    return (
      <div className={cn}>
        {what}
        {authNavs}
      </div>
    );
  }
  getSlideIndicator() {
    const indicators = [];
    for (let index = 0; index <= JOIN_INDEX; index++) {
      indicators.push(<a key={index}
                         className={cns(styles.indicator, { [styles.currentIndicator]: this.state.current === index })}
                         onClick={() => this.setState({ current: index })}></a>);
    }
    return <div className={styles.indicators}>{indicators}</div>;
  }
  getPrefaceSlide() {
    let slogan = __('app.metas.slogan').split('\n').map((word, index) => (
      <p className={styles.prefaceAppSlogan} key={index}>{word}</p>
    ));
    let appFeatures = __('app.metas.features').split('\n').map((feature, index) => (
      <li className='m-y--sm' key={index}>{feature}</li>
    ));
    return (
      <Deck.Slide className={styles.preface}>
        <div className={styles.prefaceBg}></div>
        {/* left pane */}
        <div className={styles.prefaceLeft}>
          <h1 className={cns(styles.logo, styles.logoLarge)}></h1>
          {slogan}
          <h1 className={cns(styles.prefaceAppName, 'h--full')}>{__('app.metas.name')}</h1>
          <ul>{appFeatures}</ul>
        </div>
        <div className={styles.prefaceRight}>
          <LoginForm className={styles.loginForm} login={this.props.actions.login} auth={this.props.auth} switchToSignup={() => {this.setState({ current: JOIN_INDEX })}}></LoginForm>
        </div>
      </Deck.Slide>
    );
  }
  getCoursesSlide() {
    return (
      <Deck.Slide className={styles.courses}>
        <header>
          <h1 className={styles.coursesSlogan}>{__('app.about.coursesSlogan')}</h1>
          <h3 className={styles.coursesIntro}>{__('app.about.coursesIntro')}</h3>
        </header>
        <div className={styles.coursesSnapshotWrapper}>
          <img className={styles.coursesSnapshot} src='/statics/images/cul.png'/>
          <img className={styles.coursesSnapshot} src='/statics/images/hel.png'/>
          <img className={styles.coursesSnapshot} src='/statics/images/art.png'/>
        </div>
      </Deck.Slide>
    );
  }
  getCommunitiesSlide() {
    return (
      <Deck.Slide className={styles.communities}>
        <div className={styles.communitiesSnapshotWrapper}>
          <img className={styles.communitiesSnapshot} src='/statics/images/d3.png' />
          <img className={styles.communitiesSnapshot} src='/statics/images/d1.png' />
          <img className={styles.communitiesSnapshot} src='/statics/images/d2.png' />
        </div>
        <div className={styles.communitiesIntro}>{__('app.about.communitiesIntro')}</div>
      </Deck.Slide>
    );
  }
  getExpertsSlide() {
    return (
      <Deck.Slide className={styles.experts}>
      </Deck.Slide>
    );
  }
  getJoinSlide() {
    const currentJoinStep = this.state.currentJoinStep;
    const joinSlogan = <h3 className={styles.joinSlogan}><span className={cns(styles.logo, styles.logoMd, 'm-r--md')}></span>{__('app.about.joinSlogan')}</h3>;
    const stepFlags = (
      <div className={styles.joinStepFlags}>
        <div className={cns(styles.joinStepFlag, { [styles.joinStepFlagActivited]: currentJoinStep >= JOIN_STEP_ONE })} onClick={() => {this.setState({ currentJoinStep: JOIN_STEP_ONE })}}>
          <span className={styles.joinStepFlagIcon}>1</span>
          <p className={styles.joinStepFlagTitle}>{__('app.about.joinStepOne')}</p>
        </div>
        <div className={cns(styles.joinStepFlag, { [styles.joinStepFlagActivited]: currentJoinStep >= JOIN_STEP_TWO })} onClick={::this.toJoinStepTwo}>
          <span className={styles.joinStepFlagIcon}>2</span>
          <p className={styles.joinStepFlagTitle}>{__('app.about.joinStepTwo')}</p>
        </div>
        <div className={cns(styles.joinStepFlag, { [styles.joinStepFlagActivited]: currentJoinStep >= JOIN_STEP_THREE })} onClick={::this.toJoinStepThree}>
          <span className={styles.joinStepFlagIcon}>3</span>
          <p className={styles.joinStepFlagTitle}>{__('app.about.joinStepThree')}</p>
        </div>
      </div>
    );
    return (
      <Deck.Slide className={styles.join}>
        <div className={styles.joinHeader}>
          {joinSlogan}
          {stepFlags}
        </div>
        <Deck horizontal current={currentJoinStep} className={styles.joinStepDeck}>
          {this.getJoinStepOne()}
          {this.getJoinStepTwo()}
          {this.getJoinStepThree()}
        </Deck>
      </Deck.Slide>
    );
  }
  getJoinStepOne() {
    const { joinAsParent, joinAsExpert } = this.state;
    const parentRoleDescription = (
      <ul>
        {__('app.about.parentRoleDescription').split('\n').map((item, index) => {
          return <li key={index} className={styles.joinRoleDescriptionItem}><i className='fa fa-check m-r--sm'></i><span>{item}</span></li>
        })}
      </ul>
    );
    const expertRoleDescription = (
      <ul>
      {__('app.about.expertRoleDescription').split('\n').map((item, index) => {
        return <li key={index} className={styles.joinRoleDescriptionItem}><i className='fa fa-check m-r--sm'></i><span>{item}</span></li>
      })}
      </ul>
    );
    return (
      <Deck.Slide className={cns(styles.joinStepDeckSlide, 'fcol f-jc-fs f-ai-c')}>
        <div className={styles.joinRoleCards}>
          <div className={cns(styles.joinRoleCard, 'm-r--xl', { [styles.joinRoleCardSelected]: joinAsParent })} onClick={() => {this.setState({ joinAsParent: !joinAsParent })}}>
            <h2 className='text--center'>{__('terms.parent')}</h2>
            {parentRoleDescription}
          </div>
          <div className={cns(styles.joinRoleCard, { [styles.joinRoleCardSelected]: joinAsExpert })} onClick={() => {this.setState({ joinAsExpert: !joinAsExpert })}}>
            <h2 className='text--center'>{__('terms.expert')}</h2>
            {expertRoleDescription}
          </div>
        </div>
        <div className={cns(styles.joinNextStep, { [styles.joinNextStepOk]: joinAsParent || joinAsExpert })} onClick={::this.toJoinStepTwo}>{__('terms.nextStep')}</div>
      </Deck.Slide>
    );
  }
  getJoinStepTwo() {
    return (
      <Deck.Slide className={cns(styles.joinStepDeckSlide, 'fcol f-ai-c')}>
        <SignupForm className={styles.signupForm} signup={this.props.actions.signup} auth={this.props.auth} switchToLogin={() => {this.setState({ current: PREFACE_INDEX })}}></SignupForm>
      </Deck.Slide>
    );
  }
  getJoinStepThree() {
    return (
      <Deck.Slide className={styles.joinStepDeckSlide}>
      </Deck.Slide>
    );
  }
  toJoinStepTwo() {
    const { joinAsParent, joinAsExpert } = this.state;
    const isOk = joinAsParent || joinAsExpert;
    isOk && this.setState({ currentJoinStep: JOIN_STEP_TWO });
    return isOk;
  }
  toJoinStepThree() {
    const { currentJoinStep } = this.state;
    const isOk = this.toJoinStepTwo();
    isOk && this.setState({ currentJoinStep: JOIN_STEP_THREE });
  }

  render() {
    return (
      <div className={styles.about}>
        {this.getNavBar()}
        {this.getSlideIndicator()}
        <Deck current={this.state.current} vertical  swipe onSwitchStarted={::this.onSwitchStarted} onSwitchDone={::this.onSwitchDone}>
          {this.getPrefaceSlide()}

          {this.getCoursesSlide()}
          {this.getCommunitiesSlide()}
          {this.getExpertsSlide()}

          {this.getJoinSlide()}
        </Deck>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({ auth: state.auth });
const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(authActionCreators, dispatch) });

const ReduxAbout = connect(mapStateToProps, mapDispatchToProps)(About);

export default ReduxAbout;
