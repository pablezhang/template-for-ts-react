/** @format */

import React, { Component } from 'react';

import classNames from 'classnames';
import './FooterStyle.less';
import { UIBaseProps } from 'Components/UIBaseComponents';

export default class FooterView extends Component<UIBaseProps> {
  render() {
    const { style, className, prefix = 'Footer' } = this.props;
    return (
      <footer className={classNames(prefix, className)} style={{ ...style }}>
        Hello! It's me.
      </footer>
    );
  }
}
