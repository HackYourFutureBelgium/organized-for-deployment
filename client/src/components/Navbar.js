import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css';
import Logo from './assets/logo-blue.png';
import AuthService from '../Services/AuthService';
import { AuthContext } from '../Context/AuthContext';
  

const Navbar = props => {

    const {isAuthenticated,user,setIsAuthenticated,setUser} = useContext(AuthContext);
    
    const onClickLogoutHandler = ()=>{
        AuthService.logout().then(data=>{
            if(data.success){
                setUser(data.user);
                setIsAuthenticated(false);
            }
        });
    }

    const [click, setClick] = useState(false);
    
    const iconMenu = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const unauthenticatedNavBar = ()=>{
        return (
            <>
                <li className = "nav-item" >
                   <Link to = '/Info'
                    className = "nav-links" onClick={closeMobileMenu} > Info 
                   </Link> 
               </li>
                <li className = "nav-item" >
                   <Link to = '/searchschool'
                    className = "nav-links" onClick={closeMobileMenu} > Search School 
                   </Link> 
               </li>
               <li className="nav-item" >
                   <Link to = '/login'
                     className = "nav-links"
                     onClick={closeMobileMenu} > Sign In </Link>
                </li>
                <li className = "nav-item" >
                    <Link to='/register'
                      className = "nav-links"
                      onClick={closeMobileMenu} > Sign Up
                      </Link>
                </li>
            </>
        )
    }

    const authenticatedNavBar = ()=>{
        return(
            <>
                <li className = "nav-item" >
                   <Link to = '/Info'
                    className = "nav-links" onClick={closeMobileMenu} > Info 
                   </Link> 
               </li>
               <li className = "nav-item" >
                   <Link to = '/searchschool'
                    className = "nav-links" onClick={closeMobileMenu} > Search School 
                   </Link> 
               </li>
               <li className="nav-item" >
                   <Link to="/myschools"
                     className = "nav-links"
                     onClick={closeMobileMenu} > MySchools </Link>
                </li>
                <li className = "nav-item" >
                {
                    user.role === "admin" ? 
                    <Link to="/admin"
                    className = "nav-links"
                     onClick={closeMobileMenu}> Admin </Link>
                   : null
                } 
                </li>
                <li className = "nav-item" >
                {
                    user.role === "school" ? 
                    <Link to="/addschool"
                    className = "nav-links"
                     onClick={closeMobileMenu}> Add School </Link>
                   : null
                } 
                {
                    user.role === "admin" ? 
                    <Link to="/addschool"
                    className = "nav-links"
                     onClick={closeMobileMenu}> Add School </Link>
                   : null
                } 
                </li>

                <button type="button" 
                        className="btn btn-link nav-item nav-link" 
                        onClick={onClickLogoutHandler}>Logout</button>
            </>
        )
    }

    return ( 
    <>
        <nav className = "navbar" >

              <div className = "navbar-icon" >
              <div to = "/"className = "navbar-logo" >
              
               <Link to = "/"className = "navbar-logo" onClick={closeMobileMenu} >
                 <img src={Logo} alt="logo"/>
                </Link>  
              
              </div>
                    
              <div className = "menu-icon"
                   onClick = { iconMenu } >
                  <i className = { click ? 'fas fa-times' : 'fas fa-bars' }/>
             </div> 
             <ul className={click ? 'nav-menu active' : 'nav-menu'} >
             { !isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()} 
            </ul>
            </div> 
        </nav> 
     </>
    )
}


export default Navbar