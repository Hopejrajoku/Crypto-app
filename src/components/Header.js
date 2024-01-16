import { AppBar, Container, MenuItem, Select, Toolbar, Typography, makeStyles } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { CryptoState } from '../CryptoContext';


const useStyles = makeStyles(() =>({
    title:{
        flex: 1,
        color: "#fff",
        fontFamily: "barlow",
        letterSpacing: "4px",
        fontWeight: "bold",
        fontSize: "26px",
        cursor: "pointer",
    },
}));

const Header = () => {

    const classes = useStyles();

    const history = useHistory();

    const {currency, setCurrency } = CryptoState();

    console.log(currency);


    return (
        <AppBar color='transparent' position='static'>
          <Container>
            <Toolbar>
                <Typography onClick={() => history.push("/")} className={classes.title}>Coincept</Typography>
                <Select variant="outlined"
                style={{
                    width: 100,
                    height: 40,
                    marginRight: 15,
                    border: '1px solid #fff',
                }}
                value={currency} 
                onChange={(e) => setCurrency(e.target.value)}
                >
                    <MenuItem value={"NGN"}>NGN</MenuItem>
                    <MenuItem value={"USD"}>USD</MenuItem>
                </Select>
            </Toolbar>
          </Container>
        </AppBar>
    )
};

export default Header;
