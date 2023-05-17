import React from "react"
import AirBNBImage from '../images/airbnb-logo.png';

export default function Navbar() {
    return(
        <nav>
            <img src={AirBNBImage} alt="AirBNB Logo" className=".nav--logo"></img>
        </nav>
    )
}