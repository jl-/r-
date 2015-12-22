/**
 * <Flex inline // display: inline-flex
 *       row // flex-direction, default
 *       column // flex-direction: column
 *       justifyContent='flex-start|...',
 *       alignItems='center'
 *       alignContent='center',
 *       alignSelf='auto',
 *       order='1',
 *       wrap='wrap'
 *       tag='article' // wrapper html element tag, default: 'div'
 *       grow='1'
 *       shrink='1',
 *       basis='1',
 *       flex='1 2 400px'
 *       --------
 *       -- All props are optional. if none of `inline|row|column` is present, then just render `this.props.children` wrapped with `tag`(default is `div`)
 *       -- `inline` => flex display level, set this to change to `inline-flex`. (default is `flex`)
 *       -- `row|column` => A flex container, with flex-direction: row|column; and other default rules display: flex; justify-content: space-around; align-items: center; align-content: center; flex-wrap: wrap

 *       -- ... set other props to override its default value.
 *       -- can also pass other props(data-), will be set on wrapper element
 *       -------------------------------
 *       >
 * </Flex>
 */
import React, { Component } from 'react';
import cns from 'classnames';
import styles from './style.scss';

const FLEX_PROPS_MAP = {
  justifyContent: 'justify-content',
  alignItems: 'align-item',
  alignContent: 'align-content',
  alignSelf: 'align-self',
  wrap: 'flex-wrap',
  grow: 'flex-grow',
  shrink: 'flex-shrink',
  basis: 'flex-basis'
};
const FLEX_GROW_PROPS = ['WebkitBoxFlex', 'WebkitFlexGrow', 'msFlexPositive', 'flexGrow'];
const FLEX_SHRINK_PROPS = ['WebkitFlexShrink', 'msFlexNegative', 'flexShrink'];
const FLEX_BASIS_PROPS = ['WebkitFlexBasis', 'msFlexPreferredSize', 'flexBasis'];
const FLEX_FLEX_PROPS = ['WebkitBoxFlex', 'WebkitFlex', 'msFlex', 'flex'];
const FLEX_ORDER_PROPS = ['WebkitBoxOrdinalGroup', 'WebkitOrder', 'msFlexOrder', 'order'];

function prefix(style, props, val) {
  props.forEach(prop => style[prop] = val);
}
function shortenFlexTerm(term) {
  return term.replace(/\-?([a-z])[a-z]+/g, '$1');
}

class Flex extends Component {
  transformProps() {
    let { inline, row, column, grow, shrink, basis, flex, order, className, style = {}, ...restProps } = this.props;
    let preservedProps = {};
    let level = inline ? 'i' : '';
    let cls = {
      [className]: !!className,
      [level + 'frow']: row,
      [level + 'fcol']: column
    };
    for (let prop in restProps) {
      if (prop in FLEX_PROPS_MAP) {
        cls['f-' + shortenFlexTerm(FLEX_PROPS_MAP[prop]) + '-' + shortenFlexTerm(restProps[prop])] = true;
      } else {
        preservedProps[prop] = restProps[prop];
      }
    }

    // flex-grow, flex-shrink, order, flex-basis and flex prefix.
    (grow = +grow, grow === grow && prefix(style, FLEX_GROW_PROPS, grow));
    (shrink = +shrink, shrink === shrink && prefix(style, FLEX_SHRINK_PROPS, shrink));
    (order = +order, order === order && prefix(style, FLEX_ORDER_PROPS, order));
    basis && prefix(style, FLEX_BASIS_PROPS, basis);
    flex && prefix(style, FLEX_FLEX_PROPS, flex);

    return { className: cns(cls), style, ...preservedProps };
  }
  render() {
    let { tag = 'div', children, ...props } = this.transformProps();
    return React.createElement(tag, props, children);
  }
}

export default Flex;
