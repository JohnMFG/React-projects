import React from "react";
import StarImage from '../images/star.png';

export default function Card(props) {
    return (
        <div className="card">
            <img src={props.img} alt="" className="card--image"></img>
            <div className="card--stats">
                <img src={StarImage} alt="Star" className="card--star"></img>
                <span>{props.rating}</span>
                <span className="gray">({props.numberOfRated}) </span>
                <span className="gray">{props.country}</span>
            </div>
            <p>{props.about}</p>
            <p><span className="bold">From {props.price}</span> / person</p>
        </div>
    )
}