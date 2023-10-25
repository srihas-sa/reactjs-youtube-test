import {Link} from 'react-router-dom'
import Cartcontext from '../../context/Cartcontext'
import './index.css'

const Individualcard = props => {
  const {eachdetail} = props
  const {title, thumbnailurl, channel, viewcount, publishedat, id} = eachdetail
  const {name, profileimageurl} = channel
  return (
    <Cartcontext.Consumer>
      {value => {
        const {darkmode} = value
        return (
          <Link
            to={`/videos/${id}`}
            className={
              darkmode ? 'individualcardarkmode' : 'individualcarlightmode'
            }
          >
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
      }}
    </Cartcontext.Consumer>
  )
}

export default Individualcard
