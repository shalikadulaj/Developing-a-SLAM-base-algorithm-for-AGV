import './Electricity.css'
import React, { useState, useEffect } from 'react'
import { Connector } from 'mqtt-react-hooks';
import { useMqttState } from 'mqtt-react-hooks';
import { useSubscription } from 'mqtt-react-hooks';

import axios from 'axios'
import mqtt from 'mqtt'

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

    let topic, reading;

    // const [con, setCon] = useState();

    let client  = mqtt.connect('ws://192.168.8.110:8083/mqtt');
    
    // if(props.id == 'http://localhost:5001/web4/1'){
    //     topic = "data/web4/web4power/0404";
    // }else{
    //     topic = "data/power/powerdash/9999";
    // }

    client.subscribe(`${topic}`);
    
    //   var note;
      client.on('message', function (topic, message) {
        setMesg(JSON.parse(message.toString()));
        // Updates React state with message 
        // setMesg(note);
        // console.log(note);
        client.end();
        });
    
      // Sets default React state 
      const [mesg, setMesg] = useState('0'); 

    //   if(props.id == 'http://localhost:5001/web4/1'){
    //       reading = mesg.power;
    //   }else{
    //       reading = mesg.mainPowerReading;
    //   }  

    let path = `${props.id}`;
    switch (path) {
        case 'http://localhost:5001/web4/1':
          topic = "data/web4/web4power/0404";
          break;
        default:
          topic = "data/power/powerdash/9999";
      }

      switch (path) {
        case 'http://localhost:5001/web4/1':
        reading = mesg.power;
          break;
        default:
        reading = mesg.mainPowerReading;
      }

    return (
        <>
        <div className="reading-table">
            <div className="table-name">Reading</div>
                <table>
                    <tbody>
                        {getenergy_daily.map(machine => {
                            let offPeak, day, peak;
                            if (machine.offPeak_main > machine.day_main) {
                                offPeak = "Null";
                            } else {
                                offPeak = (machine.day_main - machine.offPeak_main);
                            }
                            if (machine.day_main > machine.peak_main) {
                                day = "Null";
                            } else {
                                day = (machine.peak_main - machine.day_main);
                            }
                            if (machine.peak_main > machine.offPeak_main) {
                                peak = "Null";
                            } else {
                                peak = (machine.offPeak_main - machine.peak_main);
                            }
                            return (<>
                                <tr>
                                    <td>Power Reading</td>
                                     <td>{reading}</td>
                                </tr>
                                <tr>
                                    <td>Off Peak</td>
                                    <td key={machine.id}>{offPeak}</td>
                                </tr>
                                <tr>
                                    <td>Day</td>
                                    <td key={machine.id}>{day}</td>
                                </tr>
                                <tr>
                                    <td>Peak</td>
                                    <td key={machine.id}>{peak}</td>
                                </tr></>);
                        })}

                    </tbody>
                </table>
            </div></>
    )
}

export default ElectricityGeneratorM