import React, { useEffect, useState } from 'react';
import CoinInfo from '../components/CoinInfo';
import { useParams } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { SingleCoin } from '../Config/api';
import { Button, LinearProgress, ThemeProvider, Typography, createTheme, makeStyles } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';
import { numberWithCommas } from '../components/Banner/Carousel';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';


const useStyles = makeStyles((theme) =>({
  container: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    }
  },
  sidebar: {
    width: "30%",
    [theme.breakpoints.down("md")]:{
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
  },
  heading: {
    fontWeight: "bold",
    marginBottom:20,
    fonFamily: "tektur",
  },
  description:{
    width: "100%",
    fontFamily: "tektur",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  },
  marketdata:{
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    
    //Make it Responsive

    [theme.breakpoints.down("sm")]:{
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("md")]:{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]:{
      alignItems: "start",
    },

  },
}));




const CoinPage = () => {

  const darkTheme = createTheme({
    palette:{
      primary:{
        main: "#fff",
      },
      type: "dark",
    },
  });

  const { id } = useParams();
  const [ coin, setCoin ] = useState();
  const {currency, symbol, user, watchlist, setAlert} = CryptoState();
  const fetchCoin = async() => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  console.log(coin);

  const inWatchlist = watchlist.includes(coin?.id);

  const addToWatchlist = async() => {
    const coinRef = doc(db, "watchlist", user.uid);
  
    try {
      await setDoc(coinRef,
        {coins:watchlist?[...watchlist, coin?.id] : [coin?.id],
        });

        setAlert({
          open: true,
          message: `${coin.name} Added to Watchlist !`,
          type: "Success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
    });
    }
  }

  const removeFromWatchlist = async() => {
    const coinRef = doc(db, "watchlist", user.uid);
  
    try {
      await setDoc(coinRef,
        {coins: watchlist.filter((watch) => watch !== coin?.id)},
        {merge : "true"}
        );

        setAlert({
          open: true,
          message: `${coin.name} Removed from Watchlist !`,
          type: "Success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
    });
    }
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const classes = useStyles();

  if (!coin) return <LinearProgress style={{ backgroundImage: "linear-gradient(45deg, blue, red, blue)"}} />
  
  
  return (
    <ThemeProvider theme={darkTheme}>
    <div className={ classes.container }>
      <div className={ classes.sidebar}>
        <img 
        src={coin?.image.large}
        alt={coin?.name}
        height= "200"
        style={{
          marginBottom: 20
        }}
        />
        <Typography variant='h3' className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant='subtitle1' className={classes.description}>
        {ReactHtmlParser(coin?.description.en.split(". ")[0])}. 
        </Typography>
        <div className={classes.marketdata}>
          <span style={{ display: "flex"}}>
            <Typography variant='h5' className={classes.heading}>Rank:</Typography>
            &nbsp; &nbsp;
            <Typography variant='h5' style={{ fontFamily: "tektur"}}>{coin?.market_cap_rank}</Typography>
          </span>
          <span style={{ display: "flex"}}>
            <Typography variant='h5' className={classes.heading}>Current Price:</Typography>
            &nbsp; &nbsp;
            <Typography variant='h5' style={{ fontFamily: "tektur"}}>
            {symbol}{" "}
            {numberWithCommas(
              coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex"}}>
            <Typography variant='h5' className={classes.heading}>Market Cap:{" "}</Typography>
            &nbsp; &nbsp;
            <Typography variant='h5' style={{ fontFamily: "tektur"}}>
            {symbol}{" "}
            {numberWithCommas(
              coin?.market_data.market_cap[currency.toLowerCase()]
              .toString()
              .slice(0, -6)
              )}M
            </Typography>
          </span>
          {user && (
            <Button
            variant="outlined"
            style={{
              width:"100%",
              height: 40,
              backgroundColor: inWatchlist ? "red" : "blue",
            }}
            onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
            >
              {inWatchlist? "Remove from Watchlist" : "Add to Watchlist"}
            </Button>
          )}
        </div>
      </div>

      <CoinInfo coin ={coin} />
    </div>
    </ThemeProvider>
  )

};


export default CoinPage;
