import {Link} from 'react-router-dom'
import './index.css'

const IndividualForGaming = props => {
  const {eachdetail, darkmode} = props
  const {title, thumbnailurl, viewcount, id} = eachdetail
  return (
    <Link
      to={`/videos/${id}`}
      className={
        darkmode ? 'individualgamingcard1white' : 'individualgamingcard1dark'
      }
    >
      <img
        src={thumbnailurl}
        className="individualgamingimage"
        alt="video thumbnail"
      />
      <p>{title}</p>
      <p>{viewcount} World Wide Watching</p>
    </Link>
  )
}

export default IndividualForGaming
