import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import {StripeProvider} from 'react-stripe-elements'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
