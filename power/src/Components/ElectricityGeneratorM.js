import './Electricity.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ElectricityGeneratorM = (props) => {

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
                        <td key={machine.id}>{machine.tariff1gen}</td>
                    </tr><tr>
                        <td>Day</td>
                        <td key={machine.id}>{machine.tariff2gen}</td>
                    </tr><tr>
                        <td>Peak</td>
                        <td key={machine.id}>{machine.tariff3gen}</td>
                    </tr></>)
                })}

            </tbody>
            </table>
        </div>
    )
}

export default ElectricityGeneratorM
