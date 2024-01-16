import { Container, Typography, makeStyles } from '@material-ui/core'
import React from 'react'
import Carousel from './Carousel';



const useStyles = makeStyles(() => ({
    banner:{
        backgroundImage: "linear-gradient(transparent, #000),url(./rrr.jpg)",
    },
    bannerContent:{
        height: 400,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around",
    },
    tagline: {
        display: "flex",
        height: "40%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
    },
}));

const Banner = () => {
  const  classes = useStyles();
  return <div className={classes.banner}>
    <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
            <Typography
            variant="h2"
            style={{
                color: "#fff",
                fontWeight: "bold",
                marginBottom: 15,
                fontFamily: "tektur",
                letterSpacing: "4px",
            }}
            >
            Coincept     
            </Typography>
            <Typography
            variant='subtitle2'
            style={{
                color: "#d8d6d6",
                textTransform: "capitalize",
                fontFamily: "tektur",
                fontSize: "17px",
            }}
            >
                We make it easy for you to interact, track prices, add to watchlist and more all your favorite crypto currencies.
            </Typography>
        </div>
        <Carousel />
    </Container>
  </div>;
};

export default Banner
