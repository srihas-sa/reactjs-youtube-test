import {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import VideoItemDetails from './components/VideoItemDetails'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import Cartcontext from './context/Cartcontext'
import SavedVideos from './components/SavedVideos'
import NotFound from './components/NotFound'

class App extends Component {
  state = {
    videolist: [],
    darkmode: false,
  }

  addcartItem = product => {
    this.setState(prevState => ({
      videolist: [...prevState.videolist, product],
    }))
  }

  toggletheme = () => {
    const {darkmode} = this.state
    console.log(!darkmode)
    this.setState({darkmode: !darkmode})
  }

  render() {
    const {videolist, darkmode} = this.state
    return (
      <BrowserRouter>
        <Cartcontext.Provider
          value={{
            videolist,
            addcartItem: this.addcartItem,
            toggletheme: this.toggletheme,
            darkmode,
          }}
        >
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute
              exact
              path="/videos/:id"
              component={VideoItemDetails}
            />
            <ProtectedRoute exact path="/trending" component={Trending} />
            <ProtectedRoute exact path="/gaming" component={Gaming} />
            <ProtectedRoute
              exact
              path="/saved-videos"
              component={SavedVideos}
            />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </Cartcontext.Provider>
      </BrowserRouter>
    )
  }
}
export default App
