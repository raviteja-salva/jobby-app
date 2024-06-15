import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class LoginForm extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken)
    return history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.setState({errorMsg: data.error_msg, showSubmitError: true})
    }
  }

  renderUsernameInput = () => (
    <div className="input-container">
      <label htmlFor="username" className="label-text">
        USERNAME
      </label>
      <input
        type="text"
        id="username"
        className="login-input"
        placeholder="Username"
        onChange={this.onChangeUsername}
      />
    </div>
  )

  renderPasswordInput = () => (
    <div className="input-container">
      <label htmlFor="password" className="label-text">
        PASSWORD
      </label>
      <input
        type="password"
        id="password"
        className="login-input"
        placeholder="Password"
        onChange={this.onChangePassword}
      />
    </div>
  )

  showErrorMessage = () => {
    const {errorMsg} = this.state
    return <p className="error-msg">*{errorMsg}</p>
  }

  renderLoginForm = () => {
    const {showSubmitError} = this.state
    return (
      <form className="login-form" onSubmit={this.onSubmitForm}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="website-logo"
        />
        {this.renderUsernameInput()}
        {this.renderPasswordInput()}
        <button type="submit" className="login-btn">
          Login
        </button>
        {showSubmitError && this.showErrorMessage()}
      </form>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return <div className="login-form-container">{this.renderLoginForm()}</div>
  }
}

export default LoginForm
