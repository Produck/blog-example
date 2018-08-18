import React, { Component } from 'react';
import LoginModal from 'components/modal/LoginModal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';

class LoginModalContainer extends Component {
  handleLogin = async () => {
    const { BaseActions, password } = this.props;

    try {
      await BaseActions.login(password);
      BaseActions.hideModal('login');
    } catch (e) {
      console.log(e);
    }
  }

  handleCancel = () => {
    const { BaseActions } = this.props;
    BaseActions.hideModal('login');
  }

  handleChange = () => {

  }

  handleKeyPress = (e) => {

  }

  render() {
    const {
      handleLogin, handleCancel, handleChange, handleKeyPress
    } = this;
    const { visible } = this.props;

    return (
      <LoginModal
        visible={visible}
        onLogin={handleLogin} onCancel={handleCancel} onChange={handleChange} onKeyPress={handleKeyPress} />
    );
  }
}

export default connect(
  (state) => ({
    visible: state.base.getIn(['modal', 'login']),
    password: state.base.getIn(['loginModal', 'password'])
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(LoginModalContainer);