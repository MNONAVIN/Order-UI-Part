import React, { useEffect } from "react";
import { byId, cancelMovement } from "../store/actions/OrderActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import img1 from "./images/NEuip.jpg"
import img from "./images/orderItems.jpg"

export default function OrderById() {

    const order = useSelector(state => state.orderReducer.order);

    const dispatch = useDispatch();
    const { id } = useParams();

    const getOrderById = () => {
        dispatch(byId(id))
    }
    const navigate = useNavigate();

    useEffect(getOrderById, [id]);

    const cancelOrder = () => {
        dispatch(cancelMovement(id))
        alert("The Asset Movement Succesfully Cancelled with id " + id);
        navigate("/order/all");
    }


    return (
        <div style={{ backgroundImage: `url(${img1})`,height:"800px"}}>
            <div >
                <h3 style={{ fontFamily: "cursive",color:"whitesmoke"}}>Movement of items</h3>
                <div  >
                    {
                        order !== null &&
                        <div className="row">
                            {
                                order.orderitems.map(oi =>
                                    <div className="col-sm-6" style={{color:"whitesmoke"}}>
                                         <img src={img} height="150px" width="150px"></img>
                                        <p>Order Id:{oi.orderItemId}</p>
                                        <p>Asset Id:{oi.assetId}</p>
                                        <p>Quantity:{oi.quantity}</p>
                                    </div>
                                )
                            }
                        </div>
                    }
                </div>
                <button style={{ fontFamily: "cursive" }} className="btn btn-danger" onClick={() => {
                    const confirmBox = window.confirm("Do you really want to cancel this movement?")
                    if (confirmBox === true) {
                        cancelOrder()
                    }
                }}>
                    Cancel Movement</button>&nbsp;&nbsp;&nbsp;
                <button className="btn btn-secondary" onClick={() => navigate(-1)} style={{ fontFamily: "cursive" }}  >Go Back</button>
            </div>
        </div>
    )
}