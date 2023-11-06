import {Link} from 'react-router-dom'

import {
  AiFillHome,
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillLinkedin,
} from 'react-icons/ai'
import {FaHotjar, FaSave, FaFacebook} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import {MdDelete} from 'react-icons/md'
import Cartcontext from '../../context/Cartcontext'
import IndividualcardforSaved from '../IndividualcardforSaved'
import Header from '../Header'
import {HomeOuterMostContainer} from './styledComponents'
import './index.css'

const SavedVideos = () => (
  <Cartcontext.Consumer>
    {value => {
      const {videolist, darkmode} = value
      const condition = videolist.length > 0
      console.log(condition)
      return condition ? (
        <HomeOuterMostContainer
          type="div"
          outline={darkmode}
          data-testid="savedVideos"
        >
          <Header />
          <div
            className={
              darkmode ? 'tophomedarkcontainer' : 'tophomelightcontainer'
            }
          >
            <div className="home-section-small-size">
              <ul className="cart-list">
                {videolist.map(eachCartItem => (
                  <IndividualcardforSaved
                    key={eachCartItem.id}
                    cartItemDetails={eachCartItem}
                    darkmode={darkmode}
                  />
                ))}
              </ul>
            </div>

            <div className="home-section-medium-size">
              <div
                className={
                  darkmode
                    ? 'tophomedarkcontainerleftside'
                    : 'tophomelightcontainerleftside'
                }
              >
                <div>
                  <Link to="/" className="links">
                    <div className="links1">
                      <AiFillHome className="homeicon" />
                      <h3 className="margintop">Home</h3>
                    </div>
                  </Link>
                  <Link to="/trending" className="links">
                    <div className="links1">
                      <FaHotjar className="homeicon" />
                      <h3 className="margintop">Trending</h3>
                    </div>
                  </Link>
                  <Link to="/gaming" className="links">
                    <div className="links1">
                      <SiYoutubegaming className="homeicon" />
                      <h3 className="margintop">Gaming</h3>
                    </div>
                  </Link>
                  <Link to="/saved-videos" className="links">
                    <div className="links12">
                      <FaSave className="homeiconred" />
                      <h3 className="margintop">Saved Videos</h3>
                    </div>
                  </Link>
                </div>

                <div>
                  <p>CONTACT US</p>
                  <div>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                      className="marginss1"
                      alt="facebook logo"
                    />
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                      className="marginss1"
                      alt="twitter logo"
                    />
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                      className="marginss1"
                      alt="linked in logo"
                    />
                  </div>
                  <p>Enjoy! Now to see your channels and recommendations!</p>
                </div>
              </div>

              <div
                className={
                  darkmode
                    ? 'tophomedarkcontainerrightside'
                    : 'tophomelightcontainerrightside'
                }
              >
                <div className="links12">
                  <FaSave className="homeiconred" size="25" />
                  <h1 className="margintop">Saved Videos</h1>
                </div>
                <ul>
                  {videolist.map(eachSimilarProduct => (
                    <IndividualcardforSaved
                      cartItemDetails={eachSimilarProduct}
                      key={eachSimilarProduct.id}
                      darkmode={darkmode}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </HomeOuterMostContainer>
      ) : (
        <HomeOuterMostContainer
          type="div"
          outline={darkmode}
          data-testid="savedVideos"
        >
          <Header />
          <div className="home-section-small-size">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
              className="novideosviewforPhone"
            />
            <h1>No saved videos found</h1>
            <p>Save your videos by clicking a button</p>
            <p>Save your videos by clicking a button</p>
          </div>
          <div className="home-section-medium-size">
            <div
              className={
                darkmode
                  ? 'tophomedarkcontainerleftside'
                  : 'tophomelightcontainerleftside'
              }
            >
              <div>
                <Link to="/" className="links">
                  <div className="links1">
                    <AiFillHome className="homeicon" />
                    <h3 className="margintop">Home</h3>
                  </div>
                </Link>
                <Link to="/trending" className="links">
                  <div className="links1">
                    <FaHotjar className="homeicon" />
                    <h3 className="margintop">Trending</h3>
                  </div>
                </Link>
                <Link to="/gaming" className="links">
                  <div className="links1">
                    <SiYoutubegaming className="homeicon" />
                    <h3 className="margintop">Gaming</h3>
                  </div>
                </Link>
                <Link to="/saved-videos" className="links">
                  <div className="links12">
                    <FaSave className="homeiconred" />
                    <h3 className="margintop">Saved Videos</h3>
                  </div>
                </Link>
              </div>

              <div>
                <p>CONTACT US</p>
                <div>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                    className="marginss1"
                    alt="facebook logo"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                    className="marginss1"
                    alt="twitter logo"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                    className="marginss1"
                    alt="linked in logo"
                  />
                </div>
                <p>Enjoy! Now to see your channels and recommendations!</p>
              </div>
            </div>

            <div className="right-side-home-contaier">
              <div className="links12">
                <FaSave className="homeiconred" size="25" />
                <h1 className="margintop">Saved Videos</h1>
              </div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                alt="no saved videos"
                className="novideosview"
              />
              <h1>No saved videos found</h1>
              <p>Save your videos by clicking a button</p>
              <p>Save your videos by clicking a button</p>
            </div>
          </div>
        </HomeOuterMostContainer>
      )
    }}
  </Cartcontext.Consumer>
)

export default SavedVideos
