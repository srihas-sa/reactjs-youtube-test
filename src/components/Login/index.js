import {Component} from 'react'
import Cookies from 'js-cookie'
import Popups from '../Popups'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: 'Username and Password did&apos;nt match',
    showpasword: true,
  }

  changingusername = event => {
    this.setState({username: event.target.value})
  }

  changingpassword = event => {
    this.setState({password: event.target.value})
  }

  Onclickingshowbutton = () => {
    const {showpasword} = this.state
    this.setState({showpasword: !showpasword})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
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
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {showSubmitError, errorMsg, showpasword} = this.state
    return (
      <div className="outerlogin">
        <form className="form" onSubmit={this.submitForm}>
          <div className="imgdiv">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="website logo"
              className="loginlogo"
            />
          </div>
          <label htmlFor="username">USERNAME</label> <br />
          <input
            id="username"
            type="text"
            placeholder="Username"
            className="inputUser"
            onChange={this.changingusername}
          />
          <br />
          <label htmlFor="PASSWORD">PASSWORD</label>
          <br />
          <input
            type={showpasword ? 'text' : 'password'}
            id="PASSWORD"
            placeholder="Password:rahul@2021"
            className="inputUser"
            onChange={this.changingpassword}
          />
          <div className="showbuttoncontainer">
            <input
              type="checkbox"
              value="Show Password"
              onClick={this.Onclickingshowbutton}
              id="showpassword"
            />
            <label htmlFor="showpassword">Show Password</label>
          </div>
          <br />
          <button type="submit" className="loginbuttn">
            Login
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
