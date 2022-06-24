import React, { useEffect } from "react";
import { byId } from "../store/actions/AssetActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';


export default function OrderById() {

    const order = useSelector(state => state.assetReducer.order);

    const dispatch = useDispatch();
    const { id } = useParams();

    const getOrderById = () => {
        dispatch(byId(id))
    }

    useEffect(() => {
        getOrderById()
    }, [id]);

    return (
        <div>
           
            <p>{order.orderId}</p>
            <p>{order.orderDate}</p>

        </div>
    )
}