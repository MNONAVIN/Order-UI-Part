import React, { useEffect } from 'react';
import { fetchAllOrder } from '../store/actions/OrderActions';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import img1 from "./images/NEuip.jpg"
import img from "./images/movement.jpg"

export default function FetchAllOrder() {

    const orders = useSelector(state => state.orderReducer.orders);

    const dispatch = useDispatch();

    const navigate = useNavigate();
    
    const getAllOrder = () => {
        dispatch(fetchAllOrder());
    };

    useEffect(() => {
        getAllOrder()
    }, []);

    return (
        <div style={{ backgroundImage: `url(${img1})`,height:"800px" }}>
            <div className="container" >
                <h2 style={{ fontFamily: "cursive", color: "whitesmoke" }}><u>Movement Details:</u></h2><br></br>
                <div class="row" >
                    {
                        orders.map(o =>
                            <div className="col-sm-3"  >
                                <Link to={`/order/find/${o.orderId}`}>
                                    <div className="card" style={{ width: "200px", height: "300px", backgroundColor: "transparent" }}>
                                        <img className="card-img-top" height="200px" width="250px" src={img} alt="Card image" />
                                        <div className="card-body" style={{ color: "whitesmoke" }}>
                                            <h4 className="card-title" >{o.orderDate}</h4>
                                            <p className="card-text"    >{o.orderStatus}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    }


                </div>
                <div>
                    <button className="btn btn-secondary" style={{ fontFamily: "cursive" }} onClick={() => navigate("/")}>Go Back</button>
                </div>
            </div>
        </div>
    )
}                