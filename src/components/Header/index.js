import {useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaHotjar, FaSave, FaMoon} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import Popups from '../Popups'
import './index.css'

const Header = props => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="nav-bar-mobile-logo-container">
          <Link to="/" className="nav-link">
            <img
              className="website-logo"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="website logo"
            />
          </Link>
          <button type="button" className="nav-mobile-btn">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
              alt="nav logout"
              className="nav-bar-image"
            />
          </button>
        </div>

        <div className="nav-bar-large-container">
          <Link to="/" className="nav-link">
            <img
              className="website-logo"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="website logo"
            />
          </Link>
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link to="/" className="nav-link">
                <FaMoon className="profileimage" />
              </Link>
            </li>

            <li className="nav-menu-item">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
                className="profileimage"
              />
            </li>
          </ul>
          <button type="button" className="logout-desktop-btn">
            <Popups />
          </button>
        </div>
      </div>
      <div className="nav-menu-mobile">
        <ul className="nav-menu-list-mobile">
          <li className="nav-menu-item-mobile">
            <Link to="/" className="nav-link">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
                alt="nav home"
                className="nav-bar-image"
              />
            </Link>
          </li>

          <li className="nav-menu-item-mobile">
            <Link to="/trending" className="nav-link">
              <FaHotjar />
            </Link>
          </li>

          <li className="nav-menu-item-mobile">
            <Link to="/gaming" className="nav-link">
              <SiYoutubegaming />
            </Link>
          </li>

          <li className="nav-menu-item-mobile">
            <Link to="/savedvideos" className="nav-link">
              <FaSave />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Header
