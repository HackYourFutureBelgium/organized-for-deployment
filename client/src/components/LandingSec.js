import React from 'react';
import '../App.css';
import { Button } from './Button';
import './LandingSec.css';
import Background from "./assets/Landingpagebackground.jpg"


function LandingSec() {
    return ( 
        <div className = 'sec-container' >
        <h3 > Find The Best School For Your Child </h3> 
        <div className = 'sec-btns' >
            <Button className = 'btns'
                    buttonStyle = 'btn--outline'
                    buttonSize = 'btn--large' >
                    Search For School 
            </Button>
        </div> 
        <div className = "text" >
             <h3 > If You Are School Manager And You Want To Register Your School, Please Sign Up ! </h3> 
        </div> 
        <div className="student">
            <img src={Background} alt="student"/>
        </div>
        
        </div>
    );
}

export default LandingSec
