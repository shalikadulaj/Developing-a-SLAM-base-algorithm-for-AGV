// import React, { Component } from 'react'
// import './Electricity.css'
// import mqtt from 'mqtt'
// import { useEffect, useState } from 'react'

// class Test extends Component {

//     constructor(props){
//         super(props)
//         this.state = {}
//     }

//     componentDidMount(){
//         this.client = mqtt.connect('ws://192.168.8.110:8083/mqtt')

//         this.client.on('connect', () => {
//             this.client.subscribe("data/power/powerdash/9999");
//             console.log("Client has subscribed")
//         });
        
//         this.client.on('message', (topic, message) => {
//             this.handleJsonMessage(JSON.parse(message.toString()));
//             console.log(message);
//         })
//     }

//     handleJsonMessage = (json) => {
//         this.setState({...json})
//     }

//     componentWillUnmount(){
//         if(this.client)
//         this.client.end()
//     }

//     render() {
//         return (
//             <div className = "reading-table">
//             <div className="table-name">Reading</div>
//             <table>
//                 <tbody>
//                 <tr>
//                     <td>Tariff 01</td>
//                     <td>***</td>
//                 </tr>
//                 <tr>
//                     <td>Tariff 02</td>
//                     <td>{this.state.realPower}</td>
//                 </tr>
//                 <tr>
//                     <td>Tariff 03</td>
//                     <td>***</td>
//                 </tr>
//             </tbody>
//             </table>
//         </div>
//     )
        
//     }
// }

// export default Test
