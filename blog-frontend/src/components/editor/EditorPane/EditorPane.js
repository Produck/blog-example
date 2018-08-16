import React, { Component } from 'react';
import styles from './EditorPane.scss';
import classNames from 'classnames/bind';

import CodeMirror from 'codemirror';

import 'codemirror/mode/markdown/markdown'; // 마크다운 문법 색상
// 마크다운 내부에 들어가는 코드 색상
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/css/css';
import 'codemirror/mode/shell/shell';

// CodeMirror를 위한 CSS 스타일
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';

const cx = classNames.bind(styles);

class EditorPane extends Component {
  editor = null;
  codeMirror = null;
  cursor = null;

  initializeEditor = () => {
    this.codeMirror = CodeMirror(this.editor, {
      mode: 'markdown',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true
    });
    this.codeMirror.on('change', this.handleChangeMarkdown);
  }

  handleChange = (e) => {
    const { onChangeInput } = this.props;
    const { value, name } = e.target;

    onChangeInput({name, value});
  }

  handleChangeMarkdown = (doc) => {
    const { onChangeInput } = this.props;
    this.cursor = doc.getCursor();
    onChangeInput({
      name: 'markdown',
      value: doc.getValue()
    });
  }

  componentDidMount() {
    this.initializeEditor();
  }

  componentDidUpdate(prevProps, prevState) {
    // markdown이 변경되면 에디터 값도 변경합니다.
    // 이 과정에서 텍스트 커서의 위치가 초기화되기 때문에,
    // 저장한 커서의 위치가 있으면 해당 위치로 설정합니다.
    if (prevProps.markdown !== this.props.markdown) {
      const { codeMirror, cursor } = this;
      if (!codeMirror) return;
      codeMirror.setValue(this.props.markdown);
      if (!cursor) return;
      codeMirror.setCursor(cursor);
    }
  }
  
  render() { 
    const { handleChange } = this;
    const { tags, title } = this.props;

    return (
      <div className={cx('editor-pane')}>
        <input className={cx('title')} placeholder="Enter title here" name="title" value={title} onChange={handleChange}/>
        <div className={cx('code-editor')} ref={ref => this.editor = ref}></div>
        <div className={cx('tags')}>
          <div className={cx('description')}>Tags</div>
          <input name="tags" placeholder="Enter tags (separated by comma)" value={tags} onChange={handleChange}/>
        </div>
      </div>
    );
  }
};


export default EditorPane;