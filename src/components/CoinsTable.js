import { Container, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { CoinList } from '../Config/api';
import { useHistory } from 'react-router-dom';
import { numberWithCommas } from './Banner/Carousel';
import { Pagination } from '@material-ui/lab';

const useStyles = makeStyles(() =>({
    main:{
        color: "#000",
        fontFamily: "barlow",
        letterSpacing: "4px",
        fontSize: "26px",
    },
    row:{
        backgroundColor:"#16171a",
        cursor: "pointer", 
        "&:hover": {
            backgroundColor: "#131111",
        },
        fontFamily:"tektur"
    },
    pagination: {
        "& .MuiPaginationItem-root":{
            color: "blue"
        },
    },
    
}));



const CoinsTable = () => {

    const [page, setPage] = useState(1);

    const history = useHistory();

    const [search, setSearch] = useState("");
   

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);


    const {currency, symbol} = CryptoState();

    const fetchCoins = async () => {
        setLoading(true);
        const { data }= await axios.get (CoinList(currency));

        setCoins(data);
        setLoading(false);
    };

    console.log(coins)

    useEffect(() => {
        fetchCoins();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency]);

    const handleSearch = () => {
        return coins.filter((coin) =>(
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        ))
    };

   
    const classes= useStyles();
  return (
        <Container style={{ textAlign: 'center' }}>
            <Typography className={classes.main}
            variant="h4"
            style={{ margin: 18, fontFamily: "tektur" , fontWeight: "bold,"}}
            >
                Coin Prices By Market Cap
            </Typography>
            <TextField 
            label="Search For Any Coin..." 
            variant="outlined"
            style={{ 
                marginBottom: 20, 
                width: "100%",  
                borderRadius: "10px",
                color: "#000",
            }}
            onChange={(e) => setSearch(e.target.value)}
            />
            <TableContainer>
                {loading ? (
                    <LinearProgress style={{ backgroundColor: "#000" }} />
                ): (
                    <Table>
                        <TableHead style={{ backgroundColor: "#02198b"}} >
                            <TableRow>
                            {["Coin", "Price", "24h Change", "Market Cap"].map((head) =>(
                                <TableCell
                                style={{
                                    color: "#fff",
                                    fontWeight: "700",
                                    fontFamily: "tektur",
                                }}
                                key={head}
                                align={head === "Coin" ? "" : "right"}
                                >
                                {head}
                                </TableCell>
                            ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {handleSearch()
                            .slice(( page - 1 ) * 10 ,(page - 1) *10 + 10)
                            .map(row=>{
                                const profit = row.price_change_percentage_24h> 0;

                                return(
                                    <TableRow onClick={()=> history.push(`/coins/${row.id}`)}
                                    className={classes.row}
                                    key={row.name}>
                                        <TableCell component="th" scope='row'
                                        style={{
                                            display: "flex",
                                            gap: 15,
                                        }}
                                        >
                                            <img 
                                            src={row?.image}
                                            alt={row.name}
                                            height="50"
                                            style={{ marginBottom: 10 }}
                                            />
                                            <div
                                            style={{ display: "flex", flexDirection: "column"}}
                                            >
                                                <span
                                                style={{ textTransform: "uppercase", fontSize: 22, color: "white"}}
                                                >
                                                    {row.symbol}
                                                </span>
                                                <span style={{ color: "White" }}>{row.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell
                                        align="right"
                                        style={{ fontWeight: 600, color: "white"}}
                                        >
                                            {symbol}{" "}
                                            {numberWithCommas(row.current_price.toFixed(2))}
                                            
                                        </TableCell>
                                        <TableCell
                                        align="right"
                                        style={{ color: profit > 0 ? "green" : "red", fontWeight: 600}}
                                        >
                                            {profit && "+"}
                                            {row.price_change_percentage_24h.toFixed(2)}%
                                        </TableCell>
                                        <TableCell
                                        align="right"
                                        style={{ fontWeight: 600, color: "white"}}
                                        >
                                            {symbol}{" "}
                                            {numberWithCommas(row.market_cap.toString().slice(0, -6)
                                            )}
                                             M
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                    )}
            </TableContainer>
            <Pagination
            style={{
                padding: 20,
                width: "100%",
                display: "flex",
                justifyContent: "center",
                
            }}
            classes={{ ul: classes.pagination}}
            count={(handleSearch()?.length/10).toFixed(0)}
            onChange={(_, value) => {
                setPage(value);
                window.scroll(0, 450);
            }}
            />
        </Container>
  )
}

export default CoinsTable;
