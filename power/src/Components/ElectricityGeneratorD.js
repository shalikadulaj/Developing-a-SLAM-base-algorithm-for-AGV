import React, { Component } from 'react'
import './Electricity.css'
import mqtt from 'mqtt'
import { useEffect, useState } from 'react'


class ElectricityCEBD extends Component {

    constructor(props){
        super(props)
        this.state = {}

        // this.powerReading1 = this.state.mainPowerReading
        var today = new Date(),

        time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    
       
    
        this.state = {
    
          currentTime: time
    
        }

        
    }


    componentDidMount(){
        // if(this.state.currentTime > '12:40:00' && this.state.currentTime < '12:50:00'){
        //     this.powerReading1 = this.state.mainPowerReading;
        // }else if (this.state.currentTime > '12.12.00') {
        //     this.powerReading2 = this.state.mainPowerReading;
            
        // }else if (this.state.currentTime == '12:13:00') {
        //     this.powerReading3 = this.state.mainPowerReading;
        // }

        // const today = new Date();
        // const hour = today.getHours();
        // const minute = today.getMinutes();
        // const secs = today.getSeconds();
        // const time = hour+minute+secs;

        // setInterval(() => {
        //     if((time >= 5300) && (time <= 185959))
        //     {
        //         this.tariff1 = this.state.realPower;
        //     }else if((time >= 1900 ) && ( time <= 222959 )){
        //         this.tariff2 = this.state.realPower;
        //     }else if((time >= 22300 ) && ( time <= 52959 )){
        //         this.tariff3 = this.state.realPower;
        //     }else{
        //         return-1
        //     }
        // })

    // setInterval(() => {
    //     schedule.scheduleJob('40 12 * * *', () => {
    //         this.tariff1 = this.state.mainPowerReading;    
    //     })
    
    //     schedule.scheduleJob('45 12 * * *', () => {
    //         this.tariff2 = this.state.mainPowerReading;    
    //     })
    
    //     schedule.scheduleJob('35 12 * * *', () => {
    //         this.tariff3 = this.state.mainPowerReading;    
    //     })
    
    // },1000)

    // this.powerReading1 = this.state.mainPowerReading;

    this.client = mqtt.connect('ws://192.168.8.110:8083/mqtt')

    this.client.on('connect', () => {
        this.client.subscribe("data/power/powerdash/9999");
        this.client.subscribe("data/web4/web4power/0404");
        console.log("Client has subscribed")
    });
            
    this.client.on('message', (topic, message) => {
        this.handleJsonMessage(JSON.parse(message.toString()));
        // console.log(message);
    })
    }

    handleJsonMessage = (json) => {
        this.setState({...json})
    }

    componentWillUnmount(){
        if(this.client)
        this.client.end()
    }

    render() {
        return (
            <div className = "reading-table">
            <div className="table-name">Reading</div>
            <table>
                <tbody>
                <tr>
                    <td>Power Reading</td>
                    <td>{}</td>
                </tr>
                <tr>
                    <td>Off Peak</td>
                    <td>{}</td>
                </tr>
                <tr>
                    <td>Day</td>
                    <td>{}</td>
                </tr>
                <tr>
                    <td>Peak</td>
                    <td>{}</td>
                </tr>
            </tbody>
            </table>
        </div>
    )
        
    }
}

export default ElectricityCEBD
