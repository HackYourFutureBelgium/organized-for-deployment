import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css';
  

function Navbar() {

    const [click, setClick] = useState(false);
    
    const iconMenu = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    return ( 
    <>
        <nav className = "navbar" >

              <div className = "navbar-icon" >
              <div to = "/"className = "navbar-logo" >
              
               <Link to = "/"className = "navbar-logo" onClick={closeMobileMenu} >
                 <img src="/images/Logo-blue.png" alt="logo"/>
                </Link>  
              
              </div>
                    
              <div className = "menu-icon"
                   onClick = { iconMenu } >
                  <i className = { click ? 'fas fa-times' : 'fas fa-bars' }/>
             </div> 
                    
            <ul className={click ? 'nav-menu active' : 'nav-menu'} >
                <li className = "nav-item" >
                   <Link to = '/Info'
                    className = "nav-links" onClick={closeMobileMenu} > Info 
                   </Link> 
               </li>
               <li className="nav-item" >
                   <Link to = '/Sign In'
                     className = "nav-links"
                     onClick={closeMobileMenu} > Sign In </Link>
                </li>
                <li className = "nav-item" >
                    <Link to='/Sign Up'
                      className = "nav-links"
                      onClick={closeMobileMenu} > Sing Up
                      </Link>
                </li>

                    </ul> 
            </div> 
        </nav> 
     </>
    )
}


export default Navbar