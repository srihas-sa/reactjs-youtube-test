import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillHome, AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {FaHotjar, FaSave} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {BiListPlus} from 'react-icons/bi'
import Cartcontext from '../../context/Cartcontext'
import Header from '../Header'
import VideoPlayer from '../VideoPlayer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemDetails extends Component {
  state = {
    videodata: {},
    apiStatus: apiStatusConstants.initial,
    onclicklikebutton: false,
    onclickdislikebutton: false,
    onclicksavebutton: false,
  }

  componentDidMount() {
    this.getProductData()
  }

  getFormattedData1 = data => ({
    name: data.name,
    profileimageurl: data.profile_image_url,
    subscribercount: data.subscriber_count,
  })

  getFormattedData = videos => ({
    id: videos.id,
    title: videos.title,
    thumbnailurl: videos.thumbnail_url,
    channel: this.getFormattedData1(videos.channel),
    viewcount: videos.view_count,
    publishedat: videos.published_at,
    description: videos.description,
    videourl: videos.video_url,
  })

  getProductData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = this.getFormattedData(fetchedData.video_details)

      this.setState({
        videodata: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container">
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
      <h1 className="product-not-found-heading">Video Not Found Try Again!</h1>
      <button type="button" className="button">
        Continue Watching
      </button>
    </div>
  )

  onclickedkikebutton = () => {
    const {onclicklikebutton} = this.state
    this.setState({onclicklikebutton: !onclicklikebutton})
  }

  onclickeddislikebutton = () => {
    const {onclickdislikebutton} = this.state
    this.setState({onclickdislikebutton: !onclickdislikebutton})
  }

  renderProductDetailsView = () => (
    <Cartcontext.Consumer>
      {value => {
        const {
          videodata,
          onclicklikebutton,
          onclickdislikebutton,
          onclicksavebutton,
        } = this.state
        const {
          title,
          thumbnailurl,
          channel,
          viewcount,
          publishedat,
          description,
          id,
          videourl,
        } = videodata
        const {profileimageurl, name, subscribercount} = channel
        const {addcartItem, darkmode} = value
        const onClickAddToCart = () => {
          addcartItem({...videodata})
          this.setState({onclicksavebutton: true})
        }
        const onclickedkikebutton = () => {
          this.setState({onclicklikebutton: !onclicklikebutton})
        }

        const onclickeddislikebutton = () => {
          this.setState({onclickdislikebutton: !onclickdislikebutton})
        }

        return (
          <div
            className={
              darkmode
                ? 'individualdetailcarddark'
                : 'individualdetailcardlight'
            }
          >
            <VideoPlayer videourl={videourl} />

            <h3>{title}</h3>

            <div className="titlecenterlikeshare">
              <div className="centers123321">
                <p className="viewcount">{viewcount} Views</p>
                <p> • {publishedat}</p>
              </div>
              <div className="centers12321">
                <div
                  className={
                    onclicklikebutton ? 'bluecolordiv' : 'blackcolordiv'
                  }
                >
                  <AiOutlineLike className="centers12345" size={30} />
                  <h4 className="centers1234556">Like</h4>
                </div>
                <div
                  className={
                    onclickdislikebutton ? 'bluecolordiv' : 'blackcolordiv'
                  }
                >
                  <AiOutlineDislike className="centers12345" size={30} />
                  <h4 className="centers1234556">Dislike</h4>
                </div>
                <div
                  className={
                    onclicksavebutton ? 'bluecolordiv' : 'blackcolordiv'
                  }
                >
                  <BiListPlus
                    className="centers12345"
                    size={30}
                    onClick={onClickAddToCart}
                  />
                  <h4 className="centers1234556">
                    {onclicksavebutton ? 'Saved' : 'Save'}
                  </h4>
                </div>
              </div>
            </div>
            <hr />
            <div className="channelsection12">
              <img
                src={profileimageurl}
                alt="profile"
                className="channelsectionprofile"
              />
              <div className="channelsection">
                <p className="subscribercount21"> {name} </p>
                <p className="subscribercount">
                  {subscribercount} Subscribers{' '}
                </p>
              </div>
            </div>
            <p>{description}</p>
          </div>
        )
      }}
    </Cartcontext.Consumer>
  )

  renderProductDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <Cartcontext.Consumer>
        {value => {
          const {darkmode} = value
          console.log(darkmode)
          return (
            <div
              data-testid="videoItemDetails"
              className={
                darkmode ? 'tophomedarkcontainer' : 'tophomelightcontainer'
              }
            >
              <Header />
              <div
                className={
                  darkmode ? 'tophomedarkcontainer' : 'tophomelightcontainer'
                }
              >
                <div className="home-section-small-size">
                  {this.renderProductDetails()}
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
                      <p>
                        Enjoy! Now to see your channels and recommendations!
                      </p>
                    </div>
                  </div>

                  <div className="right-side-home-contaier">
                    {this.renderProductDetails()}
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

export default VideoItemDetails
