import {Link} from 'react-router-dom'

import './index.css'

const IndividualcardforSaved = props => {
  const {cartItemDetails, darkmode} = props
  const {
    title,
    thumbnailurl,
    channel,
    viewcount,
    publishedat,
    id,
  } = cartItemDetails
  const {name, profileimageurl} = channel

  return (
    <Link
      to={`/videos/${id}`}
      className={
        darkmode ? 'individualgamingcard1white' : 'individualgamingcard1dark'
      }
    >
      <div className="individualtrendingcard1">
        <img
          src={thumbnailurl}
          alt="video thumbnail"
          className="individualtrendingcardimage12"
        />
        <div className="titlecenter1123">
          <p className="titlebold">{title}</p>

          <p className="channelname1123">{name}</p>
          <div className="viewsanddate">
            <p className="viewcount1">{viewcount} Views</p>
            <p> • {publishedat}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default IndividualcardforSaved
