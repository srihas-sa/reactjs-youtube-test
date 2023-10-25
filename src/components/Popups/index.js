import React from 'react'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import './index.css'

const Popups = props => {
  const onClickLogout = () => {
    console.log('helo')
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <Popup trigger={<button className="button"> Logout </button>} modal nested>
      {close => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header"> Alert!!! </div>
          <div className="content">
            {' '}
            <p>Are you sure, you want to logout</p>
          </div>
          <div className="actions">
            <button
              className="button1"
              onClick={() => {
                console.log('modal closed ')
                close()
              }}
            >
              Cancel
            </button>
            <button
              className="button2"
              onClick={() => {
                onClickLogout()
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </Popup>
  )
}
export default withRouter(Popups)
