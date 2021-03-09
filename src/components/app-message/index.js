import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

import { StyledWrapper } from './style'

class AppMessage extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      message: '',
      isShow: false,
      timer: null
    }
    this.handleCloseClick = this.handleCloseClick.bind(this)
  }

  handleCloseClick() {
    if (this.state.timer) {
      clearTimeout(this.state.timer)
    }
    this.setState({
      message: '',
      isShow: false,
      timer: null
    })
  }

  show(message, duration) {
    if (this.state.timer) {
      clearTimeout(this.state.timer)
    }
    this.setState({
      message: message || '',
      isShow: true,
      timer: null
    })
    if (duration && duration > 0) {
      let timer = setTimeout(() => {
        this.setState({
          message: '',
          isShow: false,
          timer: null
        })
        clearTimeout(timer)
        timer = null
      }, duration)
      this.setState({
        timer: timer
      })
    }
  }

  render() {
    return (
      <StyledWrapper className="cpn-app-message" style={{ display: this.state.isShow ? 'flex' : 'none' }}>
        <div className="box">
          <div className="header">
            <h3 className="title">提示</h3>
            <i className="close" onClick={this.handleCloseClick}>X</i>
          </div>
          <div className="content">
            <p className="message">{this.state.message}</p>
            <button className="confirm" onClick={this.handleCloseClick}>知道了</button>
          </div>
        </div>
      </StyledWrapper>
    )
  }
}

const messageEl = document.createElement('div')

document.body.appendChild(messageEl)

const defaultProps = {}

// const messageCpn = ReactDOM.render(React.createElement(AppMessage, defaultProps), messageEl)
const messageCpn = ReactDOM.render(<AppMessage {...defaultProps} />, messageEl)

export default messageCpn
