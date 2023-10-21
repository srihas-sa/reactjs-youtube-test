import React from 'react'

const Cartcontext = React.createContext({
  videolist: [],
  addcartItem: () => {},
  darkmode: false,
  toggletheme: () => {},
})

export default Cartcontext
