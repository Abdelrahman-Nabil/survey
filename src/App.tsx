import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Home } from './screens';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, AppBar, Steps, Toolbar, IconButton, MenuIcon, Typography, Button, Container, TextField } from './components'
import {
  TransitionGroup,
} from 'react-transition-group';
import { Collapse } from '@mui/material';
import ReactCSSTransitionGroup from 'react-transition-group'; // ES6

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minWidth: 20, backgroundColor: 'rgb(70, 107, 103)',
          '&:hover': {
            background: "rgb(166, 218, 213)",
          }
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          minWidth: 20, backgroundColor: 'rgb(70, 107, 103)'
  
        }
      }
    }
    
  },
 
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      // most basic recommended timing
      standard: 300,
      // this is to be used in complex animations
      complex: 375,
      // recommended when something is entering screen
      enteringScreen: 225,
      // recommended when something is leaving screen
      leavingScreen: 195,
    },
    easing: {
      // This is the most common easing curve.
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      // Objects enter the screen at full velocity from off-screen and
      // slowly decelerate to a resting point.
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      // Objects leave the screen at full velocity. They do not decelerate when off-screen.
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      // The sharp curve is used by objects that may return to the screen at any time.
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
})

const App = () => {
  return (
    <Home />
  );
}

export default App;
