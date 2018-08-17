import React, { Component } from 'react';
import styles from './MarkdownRender.scss';
import classNames from 'classnames/bind';

import marked from 'marked';

// prismjs 관련 코드
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
// 지원할 코드 형식들을 불러옵니다.
// https://prismjs.com/#languages-list 참조
import 'prismjs/components/prism-bash.min.js';
import 'prismjs/components/prism-javascript.min.js';
import 'prismjs/components/prism-jsx.min.js';
import 'prismjs/components/prism-css.min.js';

const cx = classNames.bind(styles);

class MarkdownRender extends Component {
  state = {
    html: ''
  }

  renderMarkdown = () => {
    const { markdown } = this.props;

    if (!markdown) {
      this.setState({ html: '' });
      return ;
    }

    this.setState({
      html: marked(markdown, {
        breaks: true, // 일반 엔터로 새 줄 입력
        sanitize: true, // 맠느다운 내부 html 무시
      })
    });
  }

  constructor(props) {
    super(props);
    const { markdown } = this.props;
    //서버사이드 렌더링에서도 마크다운 처리가 되도록 constructor 쪽에서 구현
    this.state = {
      html: markdown ? marked(props.markdown, {
        breaks: true,
        sanitize: true,
      }) : ''
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.markdown !== this.props.markdown) {
      this.renderMarkdown();
    }

    if (prevState.html !== this.state.html) {
      Prism.highlightAll();
    }
  }

  componentDidMount() {
    Prism.highlightAll();
  }


  render() {
    const { html } = this.state;

    // React에서 html을 렌더링하려면 객체를 만들어 내부에
    // __html 값ㅇ을 설정해야 합니다.
    const markup = {
      __html: html
    };

    return (
      <div className={cx('markdown-render')} dangerouslySetInnerHTML={markup}>

      </div>
    );
  }
}


export default MarkdownRender;