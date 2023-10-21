import {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillHome} from 'react-icons/ai'
import {FaHotjar, FaSave} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import {FcSearch} from 'react-icons/fc'
import {ImCross} from 'react-icons/im'
import Header from '../Header'
import Cartcontext from '../../context/Cartcontext'
import Individualcard from '../Individualcard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    videosList: [],
    apiStatus: apiStatusConstants.initial,
    searchinput: '',
    onclicking: false,
  }

  componentDidMount() {
    this.getProducts()
  }

  getFormattedData1 = data => ({
    name: data.name,
    profileimageurl: data.profile_image_url,
  })

  getProducts = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const {searchinput} = this.state
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchinput}`
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
        channel: this.getFormattedData1(videos.channel),
        viewcount: videos.view_count,
        publishedat: videos.published_at,
      }))
      console.log(updatedData)

      this.setState({
        videosList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
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

  cickingSearch = event => {
    this.setState({searchinput: event.target.value})
  }

  clickinglabel = () => {
    this.getProducts()
  }

  Onclickingcrossmark = () => {
    const {onclicking} = this.state
    this.setState({onclicking: !onclicking})
  }

  render() {
    const {videosList, onclicking} = this.state
    const lengthgreaterthan = videosList.length > 0
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    console.log(videosList)

    return (
      <Cartcontext.Consumer>
        {value => {
          const {darkmode} = value
          console.log(darkmode)

          return (
            <div
              className={
                darkmode ? 'tophomedarkcontainer' : 'tophomelightcontainer'
              }
              data-testid="home"
            >
              <Header />
              <div className="home-section-small-size">
                <div className="background-color" data-testid="banner">
                  <div className="image-cross">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                      className="logoimage"
                      alt="nxt watch logo"
                    />
                    <button type="button" data-testid="close">
                      <ImCross onClick={this.Onclickingcrossmark} />
                    </button>
                  </div>
                  <h3>
                    Buy NxtWatch Premium prepaid plans with <br />
                    UPI
                  </h3>
                  <button type="button" className="buttonbuyNow">
                    Get It Now
                  </button>
                </div>
                <div className="searchinh">
                  <input
                    type="search"
                    id="hello"
                    placeholder="Search"
                    data-testid="searchButton"
                    onChange={this.cickingSearch}
                  />
                  <label
                    htmlFor="hello"
                    className="backgrrrr"
                    onClick={this.clickinglabel}
                  >
                    <FcSearch />
                  </label>
                </div>
                {videosList.map(eachvideo => (
                  <Individualcard key={eachvideo.id} eachdetail={eachvideo} />
                ))}
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
                      <div className="links12">
                        <AiFillHome className="homeiconred" />
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

                <div
                  className={
                    darkmode
                      ? 'tophomedarkcontainerrightside'
                      : 'tophomelightcontainerrightside'
                  }
                >
                  {onclicking ? (
                    <h1>Thank You</h1>
                  ) : (
                    <div className="background-color" data-testid="banner">
                      <div className="image-cross">
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                          className="logoimage"
                          alt="nxt watch logo"
                        />
                        <button type="button" data-testid="close">
                          <ImCross onClick={this.Onclickingcrossmark} />
                        </button>
                      </div>
                      <h3>
                        Buy NxtWatch Premium prepaid plans with <br />
                        UPI
                      </h3>
                      <button type="button" className="buttonbuyNow">
                        Get It Now
                      </button>
                    </div>
                  )}
                  <div className="searchinh">
                    <input
                      type="search"
                      id="hello"
                      placeholder="Search"
                      data-testid="searchButton"
                      onChange={this.cickingSearch}
                    />
                    <label
                      htmlFor="hello"
                      className="backgrrrr"
                      onClick={this.clickinglabel}
                    >
                      <FcSearch />
                    </label>
                  </div>
                  <div className="alignment2">
                    <div className="alignment">
                      {lengthgreaterthan &&
                        videosList.map(eachvideo => (
                          <Individualcard
                            key={eachvideo.id}
                            eachdetail={eachvideo}
                          />
                        ))}

                      {!lengthgreaterthan && (
                        <div className="novideocontainer">
                          <div>
                            <img
                              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
                              alt="no videos"
                              className="novideosview"
                            />
                            <h1>No Search results found</h1>
                            <p>
                              Try different key words or remove search filter
                            </p>
                            <button type="button" className="retrybutton">
                              {' '}
                              Retry
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </Cartcontext.Consumer>
    )
  }
}
export default Home
