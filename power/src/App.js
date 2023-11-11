import Header from './Components/Header';
import './App.css';
import Navibar from './Components/Navibar';
import PrintingMap from './Components/PrintingMap';
import Assembly from './Components/FactoryMaps/Assembly';
import MainHeader from './Components/MainHeader';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useState } from 'react'
import ElectricityCEBM from './Components/ElectricityCEBM';

function App() {  

  
//   const [machineUrl, setMachineUrl] = useState([
//     {
//         mUrl: "http://localhost:5000/getenergy_daily/1",
//         mUr2: "http://localhost:5000/getenergy_daily/2",
//         mUr3: "http://localhost:5000/getenergy_daily/3"
//     }   
// ])
const [handleClick, setHandleClick] = useState()

  return (
    <Router>
      <div className="App">
        {/* <Header /> */}
        <Navibar />
        <Routes>
        <Route path="/printing" element={<PrintingMap setHandleClick={setHandleClick}/>} />
        <Route path="/assembly" element={<Assembly />} />
        {/* printing map eke onClick eken ena state eka id kiyala variable ekakata dala prop ekak vidihata header ekata pass karanwa*/}
        <Route path="/header" element={<MainHeader id={handleClick}/>} />
        <Route path="/" element={<Header />} />
        </Routes>
        {/* <Header /> */}
      </div>
      </Router>
  );
  
}

export default App;
