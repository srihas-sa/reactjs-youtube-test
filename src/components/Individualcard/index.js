import {Link} from 'react-router-dom'
import './index.css'

const Individualcard = props => {
  const {eachdetail} = props
  const {title, thumbnailurl, channel, viewcount, publishedat, id} = eachdetail
  const {name, profileimageurl} = channel
  return (
    <Link to={`/videos/${id}`} className="individualcard">
      <img
        src={thumbnailurl}
        alt="video thumbnail"
        className="individualcardimage"
      />
      <div className="titlecenter123">
        <img
          src={profileimageurl}
          alt="channel logo"
          className="channellogoimage"
        />
        <p>{title}</p>
      </div>
      <p className="channelname">{name}</p>
      <div className="titlecenter">
        <p className="viewcount">{viewcount} Views</p>
        <p> • {publishedat}</p>
      </div>
    </Link>
  )
}

export default Individualcard
