import './index.css'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    console.log('Logout Clicked')
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="nav-website-logo"
        />
      </Link>
      <ul className="nav-btn-container">
        <Link to="/" className="links">
          <li className="nav-para-btn">Home</li>
        </Link>
        <Link to="/jobs" className="links">
          <li className="nav-para-btn">Jobs</li>
        </Link>
        <li>
          <button onClick={onClickLogout} className="nav-btn">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
