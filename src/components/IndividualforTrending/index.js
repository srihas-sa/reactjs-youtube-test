import {Link} from 'react-router-dom'
import './index.css'

const IndividualforTrending = props => {
  const {eachdetail, darkmode} = props
  const {title, thumbnailurl, channel, viewcount, publishedat, id} = eachdetail
  const {name, profileimageurl} = channel
  return (
    <Link
      to={`/videos/${id}`}
      className={
        darkmode
          ? 'individualtrendingcard1white'
          : 'individualtrendingcard1dark'
      }
    >
      <img
        src={thumbnailurl}
        alt="video thumbnail"
        className="individualtrendingcardimage1"
      />
      <div className="titlecenter1123">
        <p className="titlebold">{title}</p>

        <p className="channelname1123">{name}</p>
        <div className="viewsanddate">
          <p className="viewcount1">{viewcount} Views</p>
          <p> • {publishedat}</p>
        </div>
      </div>
    </Link>
  )
}

export default IndividualforTrending
