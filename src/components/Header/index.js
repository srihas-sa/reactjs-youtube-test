import {Link} from 'react-router-dom'

import {FaHotjar, FaSave, FaMoon, FaRegLightbulb} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'

import Popups from '../Popups'
import Cartcontext from '../../context/Cartcontext'

import './index.css'

const Header = () => (
  <Cartcontext.Consumer>
    {value => {
      const {toggletheme, darkmode} = value
      const onClickChangeTheme = () => {
        toggletheme()
      }

      return (
        <nav className="nav-header">
          <div className="nav-content">
            <div className="nav-bar-mobile-logo-container">
              <Link to="/">
                {darkmode && (
                  <img
                    className="website-logo"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    alt="website logo"
                  />
                )}

                {!darkmode && (
                  <img
                    className="website-logo"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                    alt="website logo"
                  />
                )}
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
              <Link to="/">
                {darkmode && (
                  <img
                    className="website-logo"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                    alt="website logo"
                  />
                )}

                {!darkmode && (
                  <img
                    className="website-logo"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    alt="website logo"
                  />
                )}
              </Link>
              <ul className="nav-menu">
                <li className="nav-menu-item">
                  <button type="button" data-testid="theme">
                    {!darkmode ? (
                      <FaMoon
                        className="profileimage"
                        onClick={onClickChangeTheme}
                        data-testid="theme"
                      />
                    ) : (
                      <FaRegLightbulb
                        className="profileimage"
                        onClick={onClickChangeTheme}
                        data-testid="theme"
                      />
                    )}
                  </button>
                </li>

                <li className="nav-menu-item">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                    alt="profile"
                    className="profileimage"
                  />
                </li>
              </ul>
              <Popups />
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
                <Link to="/saved-videos" className="nav-link">
                  <FaSave />
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      )
    }}
  </Cartcontext.Consumer>
)

export default Header
