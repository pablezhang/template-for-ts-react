/** @format */

import * as React from 'react';

const Loading: any = ({ error, pastDelay }) => {
  if (error) {
    console.warn('error', error);
    return <div>未加载到该组件，请稍后重试！</div>;
  }
  if (pastDelay) {
    return <div className='loading'>努力加载中...</div>;
  }
  return null;
};
export default Loading;
