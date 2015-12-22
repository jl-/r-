////////////
/// <LiveButton ></LiveButton>
//////////////////////
import React, { Component } from 'react';
import cns from 'classnames';

import styles from './style.scss';

const VALIDATE_TIMEOUT = 300;
const STATUS = {
  PRISTINE: 1,
  BLANK: 2,
  DIRTY: 4,
  PENDING: 8,
  VALID: 16,
  INVALID: 32,
  FOCUSED: 64
};

class PaperInput extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      status: STATUS.PRISTINE,
      error: null
    };
  }
  render(){
    let { type, label, hint, placeholder, ref, error, className, validator, ...rest } = this.props;
    let { status } = this.state;
    error = error || this.state.error;

    if (label) {
      label = <label className='paper-input-label'>{label}</label>;
    }
    if (hint || validator) {
      hint = <span className='paper-input-info'>{error || hint}</span>;
    }

    let cn = cns({
      'paper-input--pristine': status & STATUS.PRISTINE,
      'paper-input--blank': status & STATUS.BLANK,
      'paper-input--dirty': status & STATUS.DIRTY,
      'paper-input--pending': status & STATUS.PENDING,
      'paper-input--valid': status & STATUS.VALID,
      'paper-input--invalid': status & STATUS.INVALID,
      'paper-input--focused': status & STATUS.FOCUSED
    }, 'paper-input');
    className = cns({
      [className]: !!className
    }, 'paper-input-field');


    return (
      <div className={cn}>
        {label}
        <input className={className} ref='input' type={type} onFocus={::this.onFocus} onBlur={::this.onBlur} onInput={::this.onInput} {...rest} />
        <span className={cns('paper-input-underline')}></span>
        {hint}
      </div>
    );
  }
  onFocus(){
    let status = this.state.status;
    if (this.val().length === 0 && status === STATUS.PRISTINE) {
      status = STATUS.BLANK;
    }
    this.setState({status: status | STATUS.FOCUSED});
  }
  onBlur(){
    let status = this.state.status & (~STATUS.FOCUSED);
    if (!(status & STATUS.INVALID) && this.val().length === 0) status |= STATUS.BLANK;
    this.setState({status});
    //this.onInput();
  }
  val() {
    return this.refs.input.value;
  }

  onInput(){
    let status = this.state.status | STATUS.DIRTY;
    let { validator } = this.props;
    if (this.val().length === 0) {
      if (~status & STATUS.BLANK) {
        this.setState({status: status | STATUS.BLANK});
      }
    } else if (status & STATUS.BLANK) {
      this.setState({status: status & (~STATUS.BLANK)});
    }
    if(!validator) return;

    clearTimeout(this._timer);
    this._timer = setTimeout(() => {
      let res = validator.call(this, this.val());
      if (res && typeof res.then === 'function') {
        this.setState({status: this.state.status | STATUS.PENDING});
        res.then(() => {
          this.setState({error: null, status: this.state.status & (~STATUS.PENDING) & (~STATUS.INVALID) | STATUS.VALID});
        }, error => {
          this.setState({error, status: this.state.status & (~STATUS.PENDING) & (~STATUS.VALID) | STATUS.INVALID});
        });
      } else {
        status = res === true ? this.state.status & (~STATUS.INVALID) | STATUS.VALID : this.state.status & (~STATUS.VALID) | STATUS.INVALID;
        this.setState({status, error: res === true ? null : res});
      }
    }, VALIDATE_TIMEOUT);
  }
}

export default PaperInput;
