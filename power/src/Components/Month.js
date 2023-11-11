import React from 'react'
import './Header.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Select from 'react-select'
import ElectricityCEBM from './ElectricityCEBD'
import Header from './Header';

const Month = ({setHandleMonth}) => {

    // const[month, setMonth] = useState();
    // setHandleMonth(month);

    // function handleChange(event) {
    //     setMonth(event.target.value);
    //   }

    const [month, setMonth] = useState("http://localhost:5001/getenergy_all_monthly/1");

    const [janContentVisible, setJanContentVisible] = useState(false);
    const [febContentVisible, setFebContentVisible] = useState(false);
    const [marchContentVisible, setMarchContentVisible] = useState(false);
  
    useEffect(() => {
      month === "http://localhost:5001/getenergy_all_monthly/1"
        ? setJanContentVisible(true) : setJanContentVisible(false);
      month === "http://localhost:5001/getenergy_all_monthly/2" 
      ? setFebContentVisible(true) : setFebContentVisible(false);
      month === "http://localhost:5001/getenergy_all_monthly/3" 
      ? setMarchContentVisible(true) : setMarchContentVisible(false);
    }, [month]);
  
    const handleChange = (e) => {
      setMonth(e.target.value);
    };
  
    // const makeFirstLetterCapital = (str) => {
    //   return str.charAt(0).toUpperCase() + str.slice(1);
    // };
  
    // const renderResult = () => {
    //   let result;
    //   month === "selectDreamCar"
    //     ? (result = "select your dream car")
    //     : (result = makeFirstLetterCapital(month));
    //   return result;
    // };

    setHandleMonth(month);

    return (
        <div className= "select" >
            <select value={month} onChange={handleChange}>
            <option value="http://localhost:5001/getenergy_all_monthly/2">January</option>
                <option value="http://localhost:5001/getenergy_all_monthly/3">February</option>
                <option value="http://localhost:5001/getenergy_all_monthly/4">March</option>
                <option value="http://localhost:5001/getenergy_all_monthly/5">April</option>
                <option value="http://localhost:5001/getenergy_all_monthly/6">May</option>
                <option value="http://localhost:5001/getenergy_all_monthly/7">June</option>
                <option value="http://localhost:5001/getenergy_all_monthly/8">July</option>
                <option value="http://localhost:5001/getenergy_all_monthly/9">August</option>
                <option value="http://localhost:5001/getenergy_all_monthly/10">September</option>
                <option value="http://localhost:5001/getenergy_all_monthly/11">October</option>
                <option value="http://localhost:5001/getenergy_all_monthly/12">November</option>
                <option value="http://localhost:5001/getenergy_all_monthly/13">December</option>
            </select>        
            {/* {janContentVisible && < ElectricityCEBM />}
            {febContentVisible && < Header />}
            {marchContentVisible && < ElectricityCEBM />} */}
            </div>
    )
}

export default Month