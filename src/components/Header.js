import { AppBar, Container, MenuItem, Select, Toolbar, ThemeProvider, Typography, createTheme, makeStyles } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { CryptoState } from '../CryptoContext';
import AuthModal from './Authentication/AuthModal';
import UserSidebar from './Authentication/UserSidebar';


const useStyles = makeStyles(() =>({
    title:{
        flex: 1,
        fontFamily: "tektur",
        letterSpacing: "4px",
        fontWeight: "bold",
        fontSize: "20px",
        cursor: "pointer",
    },
}));

const Header = () => {

    const classes = useStyles();

    const history = useHistory();

    const {currency, setCurrency, user } = CryptoState();

    console.log(currency);

    const darkTheme = createTheme({
        palette:{
          primary:{
            main: "#fff",
          },
          type: "dark",
        },
      });


    return (
        <ThemeProvider theme={darkTheme}>
        <AppBar color='transparent' position='static'>
          <Container>
            <Toolbar>
                <Typography onClick={() => history.push("/")} className={classes.title}>Coincept</Typography>
                <Select variant="outlined"
                style={{
                    width: 100,
                    height: 40,
                    marginRight: 15,
                }}
                value={currency} 
                onChange={(e) => setCurrency(e.target.value)}
                >
                    <MenuItem value={"NGN"}>NGN</MenuItem>
                    <MenuItem value={"USD"}>USD</MenuItem>
                </Select>
                {user ? <UserSidebar/> : <AuthModal />}
            </Toolbar>
          </Container>
        </AppBar>
        </ThemeProvider>
    )
};

export default Header;
