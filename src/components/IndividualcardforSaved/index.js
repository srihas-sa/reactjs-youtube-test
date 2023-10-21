import {Link} from 'react-router-dom'

import './index.css'

const IndividualcardforSaved = props => {
  const {cartItemDetails} = props
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
    <Link to={`/videos/${id}`} className="individualtrendingcard1">
      <img
        src={thumbnailurl}
        alt="video thumbnail"
        className="individualtrendingcardimage12"
      />
      <div className="titlecenter1123">
        <p>{title}</p>

        <p className="channelname1123">{name}</p>
        <div className="viewsanddate">
          <p className="viewcount1">{viewcount} Views</p>
          <p> • {publishedat}</p>
        </div>
      </div>
    </Link>
  )
}

export default IndividualcardforSaved
