import {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {
  AiFillHome,
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillLinkedin,
} from 'react-icons/ai'
import {FaHotjar, FaSave, FaFacebook} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'

import Header from '../Header'

import IndividualForGaming from '../IndividualForGaming'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Gaming extends Component {
  state = {
    gaminglist: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.videos.map(videos => ({
        id: videos.id,
        title: videos.title,
        thumbnailurl: videos.thumbnail_url,
        viewcount: videos.view_count,
      }))
      console.log(updatedData)

      this.setState({
        gaminglist: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <button type="button" className="button">
        Continue Shopping
      </button>
    </div>
  )

  renderTrendingVideosview = () => {
    const {gaminglist} = this.state
    return (
      <div className="alignment123">
        {gaminglist.map(eachvideo => (
          <IndividualForGaming key={eachvideo.id} eachdetail={eachvideo} />
        ))}
      </div>
    )
  }

  getalltrendingvideos = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderTrendingVideosview()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {videosList, gaminglist} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    console.log(videosList)
    return (
      <div data-testid="trending">
        <Header />
        <div className="tophomecontainer">
          <div className="home-section-small-size">
            {gaminglist.map(eachvideo => (
              <IndividualForGaming key={eachvideo.id} eachdetail={eachvideo} />
            ))}
          </div>

          <div className="home-section-medium-size">
            <div className="left-side-home-contaier">
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
                  <div className="links12">
                    <SiYoutubegaming className="homeiconred" />
                    <h3 className="margintop">Gaming</h3>
                  </div>
                </Link>
                <Link to="/savedvideos" className="links">
                  <div className="links1">
                    <FaSave className="homeicon" />
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
              <h1>Gaming</h1>
              {this.getalltrendingvideos()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Gaming
