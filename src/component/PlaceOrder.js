import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { allUser } from "../store/actions/UserActions";
import img1 from "./images/order.jpg";
import { useNavigate } from 'react-router-dom';
import { allAsset } from '../store/actions/AssetActions';
import { allWarehouse } from '../store/actions/WarehouseActions';
import { makeOrder } from '../store/actions/OrderActions';


export default function PlaceOrder() {
    const [userId, setUserId] = useState("");
    const [toWId, setToWId] = useState("");
    const [frmWId, setFrmWId] = useState("");
    const [orderAssetQuantity, setOrderAssetQuantity] = useState([{ assetId: '', assetQuantity: '' }]);
    const [formErrors, setFormErrors] = useState({});

    const users = useSelector(state => state.orderReducer.users);

    const warehouse = useSelector(state => state.orderReducer.warehouse);

    const assets = useSelector(state => state.orderReducer.assets);

    const newOrder = useSelector(state => state.orderReducer.newOrder);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const getAllAssets = () => {
        dispatch(allAsset());
    }
    const getallWarehouse = () => {
        dispatch(allWarehouse());
    };

    const myFunction = () => {
        dispatch(allUser());
    };

    useEffect(() => {
        getAllAssets()
    }, []);

    useEffect(() => {
        myFunction()
    }, []);

    useEffect(() => {
        getallWarehouse()
    }, []);

    const addMoreItem = () => {
        setOrderAssetQuantity([
            ...orderAssetQuantity,
            {
                assetId: '',
                assetQuantity: ''
            }
        ])
    }

    const handleSubmit = (index, event) => {
        let errors = {};

        if (!toWId) {
            errors['toWarehouseIdError'] = "To Warehouse Id is required*";
        }
        if (!frmWId) {
            errors['fromWarehouseIdError'] = "From Warehouse Id is required*";
        }
        for(let i=0;i<orderAssetQuantity.length;i++) {
        if (!orderAssetQuantity[i].assetId) {
            errors['assetIdError'] = "Asset Id is required*";
        }

        if (!orderAssetQuantity[i].assetQuantity) {
            errors['assetQuantityError'] = "Quantity is required*";
        }
        else if (orderAssetQuantity[i].assetQuantity <= 0) {
            errors['assetQuantityError'] = "Asset Quantity should not be negative";
        }
    }
        setFormErrors(errors);
        const noErrors = Object.keys(errors).length === 0;

        if (noErrors) {
            const payload = {
                toWarehouseId: toWId,
                fromWarehouseId: frmWId,
                userId: userId,
                orderAssetQuantity: orderAssetQuantity,
            }
            console.log(payload);
            dispatch(makeOrder(payload));
            alert("Order Successfully placed "+newOrder.orderId);
        }
    }

    const handleChange = (e, index) => {
        const list = [...orderAssetQuantity];
        list[index][e.target.name] = e.target.value;
        setOrderAssetQuantity(list)
    }

    const handleRemove = index => {
        const list = [...orderAssetQuantity];
        list.splice(index, 1);
        setOrderAssetQuantity(list);
    }
    return (
        <div >
           
        <div className='container-fluid' style={{backgroundImage:`url(${img1})`}}>
        <h5 style={{fontFamily:"cursive"}} ><b><u>Move an Asset:</u></b></h5>
            <div class="form-group">
                <div class="row-xs-2">
                    <label style={{color:"whitesmoke"}}><i>User ID</i></label>&nbsp;&nbsp;
                    <select className="form-control" onChange={e => setUserId(e.target.value)}>
                        <option>----Select----</option>
                        {
                            users.map(u => (
                                <option name='userId'>{u.userId}</option>
                            ))}
                    </select>
                </div>
                <div class="form-group">
                    <label style={{color:"whitesmoke"}}><i>From Warehouse Id</i></label>&nbsp;&nbsp;
                    <select className="form-control" onChange={e => setFrmWId(e.target.value)}>
                        <option>From Warehouse Id</option>
                        {
                            warehouse.map(w => (
                                <option name='frmWId'>{w.warehouseId}</option>
                            ))}
                    </select>
                    {
                        formErrors.fromWarehouseIdError &&
                        <div style={{ color: 'red' }}>{formErrors.fromWarehouseIdError}</div>
                    }
                </div>
                <div class="form-group">
                    <label style={{color:"whitesmoke"}}><i>To Warehouse Id</i></label>&nbsp;&nbsp;
                    <select className="form-control" onChange={e => setToWId(e.target.value)}>
                        <option>To Warehouse Id</option>
                        {
                            warehouse.map(w => (
                                <option name='toWId'>{w.warehouseId}</option>
                            ))}
                    </select>
                    {
                        formErrors.toWarehouseIdError &&
                        <div style={{ color: 'red' }}>{formErrors.toWarehouseIdError}</div>
                    }
                </div>
                {
                    orderAssetQuantity.map((x, i) => {
                        return (
                            <div>
                                <div class="form-group">
                                    <label style={{color:"whitesmoke"}}><i>Asset Id</i></label>&nbsp;&nbsp;
                                    <select name='assetId' className="form-control" onChange={e => handleChange(e, i)}>
                                        <option>Asset Id</option>
                                        {
                                            assets.map(a => (
                                                <option value={orderAssetQuantity.assetId} >{a.assetId}</option>
                                            ))}
                                    </select>
                                    {
                                        formErrors.assetIdError &&
                                        <div style={{ color: 'red' }}>{formErrors.assetIdError}</div>
                                    }
                                </div>

                                <div class="form-group">
                                    <label style={{color:"whitesmoke"}} htmlFor='assetQuantity'><i>Asset Quantity</i></label>
                                    <input className="form-control" type='text' placeholder='Asset Quantity' value={orderAssetQuantity.assetQuantity} name='assetQuantity' onChange={e => handleChange(e, i)} />
                                    {
                                        formErrors.assetQuantityError &&
                                        <div style={{ color: 'red' }}>{formErrors.assetQuantityError}</div>
                                    }
                                </div>
                                {
                                    orderAssetQuantity.length !== 1 &&
                                    <div className='form-group'>
                                        <button className='btn btn-danger' type="button" onClick={handleRemove}>Remove</button> &nbsp;&nbsp;
                                    </div>
                                }
                                {
                                    orderAssetQuantity.length - 1 == i &&
                                    <div className='form-group'>
                                        <button className='btn btn-primary' type="button" style={{fontFamily:"cursive"}} onClick={addMoreItem}>Add Item</button> &nbsp;&nbsp;
                                    </div>
                                }
                                <button onClick={handleSubmit} className='btn btn-success' style={{fontFamily:"cursive"}}>Order</button> 

                            </div>
                        );
                    })}
            </div>
                  <button className="btn btn-secondary" style={{fontFamily:"cursive"}} onClick={() => navigate(-1)}>Go Back</button>  
        </div>
        </div>
    )
}