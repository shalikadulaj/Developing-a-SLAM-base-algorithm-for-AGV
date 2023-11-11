// import React from 'react'
// import { CNav,CNavItem,CNavLink} from '@coreui/react';
// import "./Navbar.css"


// function NavbarMain() {
//     return (
//         <CNav variant="pills" layout="fill">
//         <CNavItem>
//           <CNavLink href="/" >
//           <h4>ASSEMBLY</h4>
//           </CNavLink>
//         </CNavItem>
//         <CNavItem>
//           <CNavLink href="/factory2"><h4>PRINTING</h4></CNavLink>
//         </CNavItem>
//         <CNavItem>
//           <CNavLink href="/factory4"><h4>INM</h4></CNavLink>
//         </CNavItem>
//         <CNavItem>
//           <CNavLink href="/factory4"><h4>GENERAL</h4></CNavLink>
//         </CNavItem>
//       </CNav>
//     )
// }

// export default NavbarMain

import React from 'react'
import './Navibar.css'
import { NavLink } from 'react-router-dom'

const Navibar = () => {
    return (
      <div className="divNav">
      <nav className="nav">
        <div className="navButtons">
          <ul className="plant">
            
            <div className="plant overall"><NavLink to="/" style={{ textDecoration: 'none' , color: 'black'}}><li>OVERALL</li></NavLink></div>
            <div className="plant assembly"><NavLink to="/assembly" style={{ textDecoration: 'none' , color: 'black'}}><li>ASSEMBLY</li></NavLink></div>
            <div className="plant printing"><NavLink to="/printing" style={{ textDecoration: 'none' , color: 'black'}}><li>PRINTING</li></NavLink></div>
            <div className="plant inm"><NavLink to="#" style={{ textDecoration: 'none' , color: 'black'}}><li>INM</li></NavLink></div>
            <div  className="plant general" ><NavLink to="#" style={{ textDecoration: 'none' , color: 'black'}}><li>GENERAL</li></NavLink></div>
          </ul>
        </div>
        {/* <div class="buttonsLogin">
          <button>Sign In</button>
          <button>Log In</button>
        </div> */}
      </nav>
    </div>
    )
}

export default Navibar

