import React, { Component, Children } from 'react';
import cns from 'classnames';

import Deck from 'components/deck';
//import Deck from 'react-slide-deck';
import styles from './style.scss';

const DURA = 8200;
const SLIDES_COUNT = 3;
let timer;
let auto = true;

class Preface extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {current: 0};
  }
  componentDidMount() {
    timer = setTimeout(::this.loop, DURA);
  }
  componentWillUnmount() {
    clearTimeout(timer);
  }
  componentWillReceiveProps(nextProps) {
    clearTimeout(timer);
    if (nextProps.play) {
      timer = setTimeout(::this.loop, DURA);
    }
  }
  loop() {
    auto = true;
    this.setState({current: (this.state.current + 1) % SLIDES_COUNT});
    timer = setTimeout(::this.loop, DURA);
  }
  setSlide(e) {
    let target = e.target;
    if (target.className.indexOf(styles.dot) !== -1) {
      clearTimeout(timer);
      const index = Array.prototype.indexOf.call(target.parentElement.children, target);
      auto = false;
      this.setState({current: index, loop: false});
      timer = setTimeout(::this.loop, DURA);
    }
  }
  getSlideNav() {
    const current = this.state.current;
    let dots = [];
    for (let index = 0; index < SLIDES_COUNT; index++) {
      dots.push(
        <span key={index} className={cns({[styles.dotActived]: index===current}, styles.dot)}></span>
      );
    }
    return (
      <div className={styles.slideNav} onClick={::this.setSlide}>
        {dots}
      </div>
    );
  }
  render() {
    let slogan = __('app.metas.slogan').split('\n').map((word, index) => (
      <p className={styles.introSlogan} key={index}>{word}</p>
    ));
    return (
      <div className={styles.preface}>
        <Deck dura={1000} direction='down' horizontal current={this.state.current} loop={auto}>
          <Deck.Slide className={styles.intro}>
            <h1 className={styles.introApp}>{__('app.metas.name')}</h1>
            {slogan}
          </Deck.Slide>
          <Deck.Slide className={styles.spec}>
            <h1>hi</h1>
          </Deck.Slide>
          <Deck.Slide className={styles.case}>
            <h1>hi</h1>
          </Deck.Slide>
        </Deck>
        {this.getSlideNav()}
      </div>
    );
  }
}

export default Preface

