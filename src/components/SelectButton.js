//import { makeStyles } from '@material-ui/core';
import React from 'react';
//import { Chart as ChartJS } from 'chart.js/auto';

const SelectButton = ({ children, selected, onClick }) => {

   // const useStyles = makeStyles({
   //     selectbutton: {
   //         border: "1px solid blue",
   //         borderRadius: 5,
   //         padding: 10,
   //         paddingLeft: 20,
   //         paddingRight: 20,
   //         fontFamily: "tektur",
   //         cursor: "pointer",
   //         backgroundColor: selected ? "blue" : "",
   //         color: selected ? "#fff" : "",
   //         fontWeight: selected ? 700 : 500,
   //         "&:hover": {
   //             backgroundColor: "blue",
   //             color: "#fff",
   //     },
   //         width: "22%",
//
   //     },
   // });
//
   // const classes = useStyles();
  return (
    <span onClick={onClick} 
    style={{
        border: "1px solid blue",
            borderRadius: 5,
            padding: 10,
        textAlign: "center",
            paddingLeft: 20,
            paddingRight: 20,
            fontFamily: "barlow",
            cursor: "pointer",
            backgroundColor: selected ? "blue" : "",
            color: selected ? "#fff" : "",
            fontWeight: selected ? 700 : 500,
            "&:hover": {
                backgroundColor: "blue",
                color: "#fff",
        },
            width: "22%",
    }}
    >
      {children}
    </span>
  )
}

export default SelectButton
