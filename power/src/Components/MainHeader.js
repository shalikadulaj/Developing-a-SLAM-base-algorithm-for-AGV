import './Header.css';
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Test from './Test';
import ElectricityCEBD from './ElectricityCEBD';
import ElectricityCEBM from './ElectricityCEBM';
import ElectricityGeneratorD from './ElectricityGeneratorD';
import ElectricityGeneratorM from './ElectricityGeneratorM';
import Month from './Month';
import mqtt from 'mqtt'
//import Toggle from './Toggle';

function Header(props) {

    const [toggle, setToggle1] = useState(false);
    // const [toggle2, setToggle2] = useState(false);

    const [frequency, setFrequency] = useState(false)

    //function for toggle between daily and monthly energy consumption tables
    const handleClick = () => {
        toggle ? setToggle1(false) : setToggle1(true);
        // toggle2 ? setToggle2(false) : setToggle2(true);

        frequency ? setFrequency(false) : setFrequency(true);
    }

    const [handleMonth, setHandleMonth] = useState()

    return (
        <div className="container">
            <div className="grid grid-responsive custom-scroll">
                        <div className="card header">
                            
                            {frequency ? <span className="frequency">Monthly Energy Consumption <Month setHandleMonth = {setHandleMonth}/></span> : <span className="frequency">Daily Energy Consumption </span>}
                        
                        <i className="fa fa-chevron-circle-right" aria-hidden="true" onClick={handleClick}></i>                        
                    <div>
                        {/*toggle switch*/}
                        {/* <label className="switch">{frequency ? <span className="frequency">Daily</span > : <span className="frequency">Monthly</span>}
                            <input className="checkbox" type="checkbox" onClick={handleClick}/>           
                            <span className="slider"/>
                        </label>  */}
                    </div>
                </div>

                <div className="card ceb" style={{textAlign:"left"}}>CEB-Main
                    {toggle ? <ElectricityCEBM /> : <ElectricityCEBD id={props.id}/>}
                </div>

                {/*update Generator UI feild upon a click on toggle switch*/}
                <div className="card generator" style={{textAlign:"left"}}>Generator
                    {toggle ? <ElectricityGeneratorM /> : <ElectricityGeneratorD  />}
                </div>

            </div>
        </div>
    );
}

export default Header