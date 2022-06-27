import React from "react";
import { Link } from "react-router-dom";
import img from "./images/Logo.jpg"
function Order() {
    return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark sticky-top">
            <Link className="navbar-brand" to="#"><img src={img} style={{ width: "35px", height: "35px" }}></img></Link>
            <ul class="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link style={{ fontFamily: "cursive", color: "yellowgreen" }} className="nav-link" to="/order/save" >Add Movement</Link>
                </li>
                <li className="nav-item">
                    <Link style={{ fontFamily: "cursive", color: "yellowgreen" }} className="nav-link" to="/order/all">All Movements</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Order;