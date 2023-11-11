import { Link } from 'react-router-dom';
import './FactoryMaps/FactoryMaps.css'
import './ElectricityCEBM'
import React, { useState, useEffect, Component } from 'react'
import axios from 'axios'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ElectricityCEBM from './ElectricityCEBM';
// import IMAX from '../public/images/2.png'

const PrintingMap = ({setHandleClick}) => {

    // let machineUrl = "http://localhost:5000/getenergy_daily/";
    // console.log(newMachineUrl);

    // function click(id) {
    //    let newMachineUrl = machineUrl+id;
    //     console.log(newMachineUrl);
    //     }

        return (
            <div className= 'containe'>
    
            <div className='mapx'>
                <div>
                    <span>
                        <img src="/images/2.png" style={{ maxWidth: '100rem'}} useMap='#factory2map' className="printingmap"/>
                    </span>
                    
                    <map name="factory2map">
                    <Link to='/header' onClick={() => setHandleClick('http://localhost:5001/folding1/1')}><area target="_blank" alt="1" title="Folding 1" href="1" coords="348,219,372,115" shape="rect"/></Link>
                    <Link to='/header' onClick={() => setHandleClick('http://localhost:5001/folding2/1')}><area target="_blank" alt="2" title="Folding 2" href="2" coords="390,220,413,117" shape="rect"/></Link>
                    <Link to='/header' onClick={() => setHandleClick('http://localhost:5001/folding3/1')}><area target="_blank" alt="3" title="Folding 3" href="3" coords="432,225,459,120" shape="rect"/></Link>
                    <Link to='/header' onClick={() => setHandleClick('http://localhost:5001/folding4/1')}><area target="_blank" alt="4" title="Folding 4" href="4" coords="475,224,500,120" shape="rect"/></Link>
                    <Link to='/header' onClick={() => setHandleClick('http://localhost:5001/folding5/1')}><area target="_blank" alt="5" title="Folding 5" href="5" coords="518,222,543,117" shape="rect"/></Link>
                    <Link to='/header' onClick={() => setHandleClick('http://localhost:5001/folding6/1')}><area target="_blank" alt="6" title="Folding 6" href="6" coords="562,221,586,116" shape="rect"/></Link>
                    <Link to='/header' onClick={() => setHandleClick('http://localhost:5001/folding7/1')}><area target="_blank" alt="8" title="Folding 7" href="8" coords="599,220,624,114" shape="rect"/></Link>
                    <Link to='/header' onClick={() => setHandleClick('http://localhost:5001/folding8/1')}><area target="_blank" alt="9" title="Folding 8" href="9" coords="637,218,661,116" shape="rect"/></Link>
                    <Link to='/header'><area target="_blank" alt="7" title="09" href="7" coords="725,302,771,356" shape="rect"/></Link>
                    <Link to='/header'><area target="_blank" alt="10" title="10" href="10" coords="200,131,163,97" shape="rect"/></Link>
                    <Link to='/header'><area target="_blank" alt="11" title="11" href="11" coords="163,186,199,153" shape="rect"/></Link>
                    <Link to='/header'><area target="_blank" alt="12" title="12" href="12" coords="162,236,198,202" shape="rect"/></Link>
                    <Link to='/header'><area target="_blank" alt="13" title="13" href="13" coords="106,134,145,101" shape="rect"/></Link>
                    <Link to='/header'><area target="_blank" alt="14" title="14" href="14" coords="109,185,144,153" shape="rect"/></Link>
                    <Link to='/header'><area target="_blank" alt="15" title="15" href="15" coords="108,236,144,202" shape="rect"/></Link>
                    <Link to='/header'><area target="_blank" alt="16" title="16" href="16" coords="217,105,256,187" shape="rect"/></Link>
                    <Link to='/header'><area target="_blank" alt="17" title="17" href="17" coords="785,350,815,299" shape="rect"/></Link>
                    <Link to='/header'><area target="_blank" alt="18" title="18" href="18" coords="218,245,254,222" shape="rect"/></Link>
                    <Link to='/header'><area target="_blank" alt="19" title="19" href="19" coords="48,99,79,151" shape="rect"/></Link>
                    <Link to='/header'><area target="_blank" alt="20" title="20" href="20" coords="53,306,93,348" shape="rect"/></Link>
                    <Link to='/header'><area target="_blank" alt="21" title="21" href="21" coords="351,69,389,29" shape="rect"/></Link>
                    <Link to='/header'><area target="_blank" alt="22" title="22" href="22" coords="433,67,471,29" shape="rect"/></Link>
                    <Link to='/header'><area target="_blank" alt="23" title="23" href="23" coords="517,67,556,29" shape="rect"/></Link>
                    <Link to='/header'><area target="_blank" alt="24" title="24" href="24" coords="586,66,624,27" shape="rect"/></Link>
                    <Link to='/header'><area target="_blank" alt="25" title="25" href="25" coords="667,63,706,22" shape="rect"/></Link>
                    <Link to='/header'><area target="_blank" alt="26" title="26" href="26" coords="366,292,487,328" shape="rect"/></Link>
                    <Link to='/header'><area target="_blank" alt="27" title="27" href="27" coords="707,114,738,211" shape="rect"/></Link>
                    <Link to='/header'><area target="_blank" alt="28" title="28" href="28" coords="621,317,668,367" shape="rect"/></Link>
                    <Link to='/header' onClick={() => setHandleClick('http://localhost:5001/web4/1')}><area target="_blank" alt="WEB1" title="WEB1" href="29" coords="935,252,1051,294" shape="rect"/></Link>
                    <Link to='/header' onClick={() => setHandleClick('http://localhost:5001/web2/1')}><area target="_blank" alt="BM2" title="WEB2" href="30" coords="938,322,1052,358" shape="rect"/></Link>
                    <Link to='/header' onClick={() => setHandleClick('http://localhost:5001/bm1/1')}><area target="_blank" alt="31" title="BM 1" href="31" coords="757,152,823,152,824,209,996,211,993,165,866,165,865,143,842,143,841,112,757,112" shape="poly"/></Link>
                    <Link to='/header' onClick={() => setHandleClick('http://localhost:5001/bm2/1')}><area target="_blank" alt="32" title="BM 2" href="32" coords="783,54,839,56,842,90,1021,88,1021,53,888,56,888,39,866,39,865,16,783,15" shape="poly"/></Link>
                    <Link to='/header'><area target="_blank" alt="33" title="33" href="33" coords="78,195,79,174,39,173,40,88,13,89,12,194" shape="poly"/></Link>
                    <Link to='/header'><area target="_blank" alt="34" title="34" href="34" coords="13,73,33,73,34,35,116,36,119,9,17,13" shape="poly"/></Link>
                    <Link to='/header'><area target="_blank" alt="35" title="35" href="35" coords="412,366,556,360,556,314,541,315,537,334,484,342,478,329,429,331,426,342,412,342" shape="poly"/></Link>
                   
                    </map>
                </div>
    
            </div>
        </div>
        )
}

export default PrintingMap