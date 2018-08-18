import React, { Component } from 'react';
import LoginModalContainer from 'containers/modal/LoginModalContainer';

class Base extends Component {
  initialize = async () => {
    // 로그인 상태 확인
  }

  componentDidMount() {
    this.initialize();
  }
  
  render() {
    return (
      <div>
        <LoginModalContainer />
        {/* 전역적으로 사용할 컴포넌트는 여기서 렌더링 */}
      </div>
    );
  }
}

export default Base;