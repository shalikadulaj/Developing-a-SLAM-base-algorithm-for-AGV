// import { response } from 'express'
// import { STATES } from 'mongoose'
import './Electricity.css'
import './PrintingMap'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import PrintingMap from './PrintingMap'

// const axios = require('axios');

// const newPrintingMap = new PrintingMap();
// let id1 = newPrintingMap.click(1);

const ElectricityCEBM = (props) => {

    // const [getenergy_daily, setBranch] = useState([]);

    // useEffect(() => {
    //     axios.get(`${props.id}`)
    //     .then(res => {
    //         console.log(res)
    //         setBranch(res.data)
            
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    // }, [] ); 
    
    const [getenergy_daily, setBranch] = useState([]);

    useEffect(() => {
        axios.get(`${props.id}`)
        .then(res => {
            console.log(res)
            setBranch(res.data)
            
        })
        .catch(err => {
            console.log(err)
        })
    }, [] ); 

    return (
        <div className = "reading-table">
            <div className="table-name">Reading</div>
            <table>
                <tbody>
                {getenergy_daily.map(machine => {
                    return(<><tr>
                        <td>Off Peak</td>
                        <td key={machine.id}>{machine.offPeak_main}</td>
                    </tr><tr>
                        <td>Day</td>
                        <td key={machine.id}>{machine.day_main}</td>
                    </tr><tr>
                        <td>Peak</td>
                        <td key={machine.id}>{machine.peak_main}</td>
                    </tr></>)
                })}
                
            </tbody>
            </table>
        </div>

        

    // <div>
    //     <ul>
    //         {getbranch.map(branch => {
    //             return <li key={branch.id}>{branch.name}</li>
    //         })}
    //     </ul>
    // </div>
    )
    
}

export default ElectricityCEBM
