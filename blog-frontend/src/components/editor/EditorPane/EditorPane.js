import React from 'react';
import styles from './EditorPane.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const EditorPane = () => (
  <div className={cx('editor-pane')}>
    <input className={cx('title')} placeHolder="Enter title here" name="title"/>
    <div className={cx('code-editor')}></div>
    <div className={cx('tags')}>
      <div className={cx('description')}>Tags</div>
      <input name="tags" placeholder="Enter tags (separated by comma)"/>
    </div>
  </div>
);


export default EditorPane;