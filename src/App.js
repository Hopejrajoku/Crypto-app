import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Homepage from './Pages/Homepage';
import CoinPage from './Pages/CoinPage';
import { makeStyles } from '@material-ui/core';
import  Alert  from './components/Alert';

function App() {
  const useStyles = makeStyles(() => ({
    App: {
      color: "white",
      minHeight: "100vh",
      backgroundColor: "#14161a",
    },
  }));

  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Route  path="/" component={Homepage} exact />
        <Route path="/coins/:id" component={CoinPage} />
      </div>
      <Alert/>
    </BrowserRouter>
  );
}

export default App;
