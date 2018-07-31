import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue'
import purple from '@material-ui/core/colors/purple'

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: purple,
  }
})

// establishes socket connection
import './socket'

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
    <Router history={history}>
      <App />
    </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app')
)
