import React, { useEffect } from 'react';
import { fetchAllOrder } from '../store/actions/AssetActions';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'

export default function FetchAllOrder() {

    const orders = useSelector(state => state.assetReducer.orders);

    const dispatch = useDispatch();

    const getAllOrder = () => {
        dispatch(fetchAllOrder());
    };

    useEffect(() => {
        getAllOrder()
    }, []);

    return (
        <div>
            <h2 style={{ color: "Blue" }}>Order Details:</h2>
            {
                <table style={{ margin: "auto", textAlign: "center" }} border='2' rules='all' cellPadding={"10px"}>
                    <tr>
                        <th>order Id</th>
                        <th>order Date</th>
                        <th>order status</th>
                        <th>order Items</th>
                    </tr>
                    {
                        orders.map(o =>
                            <tr>
                                <td>{o.orderId}</td>
                                <td>{o.orderDate}</td>
                                <td>{o.orderStatus}</td>
                                <td><Link to={`/order/byId/${o.orderId}`}>items</Link></td>
                            </tr>
                        )
                    }
                </table>
            }
        </div>
    )
}                