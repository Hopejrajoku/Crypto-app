import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { CoinList } from './Config/api';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, onSnapshot } from 'firebase/firestore';


const Crypto = createContext();

const CryptoContext = ({children}) => {

  const [currency, setCurrency] = useState("NGN");
  const [symbol, setSymbol] = useState("₦");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user.uid);
      var unsubscribe = onSnapshot(coinRef, coin => {
        if(coin.exists()) {
          setWatchlist(coin.data().coins);
        }
        else {
          console.log("No Coins in Watchlist");
        }
      });
      return () => {
        unsubscribe();
      };
    }
    
  }, [user]);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if(user)setUser(user);
      else setUser(null);

      console.log(user);
    });
  }, []);

  const fetchCoins = async () => {
    setLoading(true);
    const { data }= await axios.get (CoinList(currency));

    setCoins(data);
    setLoading(false);
};
  
  useEffect(() =>{
      if (currency === "NGN") setSymbol("₦")
      else if (currency === "USD") setSymbol("$")
  },[currency]);

  
  return <Crypto.Provider value={{currency, symbol, setCurrency, coins, loading, fetchCoins, alert, setAlert, user, watchlist}}>{children}</Crypto.Provider>
};

export default CryptoContext;

export const CryptoState = () => {
    return useContext(Crypto)
}
