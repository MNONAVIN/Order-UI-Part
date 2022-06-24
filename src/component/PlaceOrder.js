import React, { useState, useEffect } from 'react';
import { allAsset, allWarehouse, makeOrder } from '../store/actions/AssetActions';
import { useDispatch, useSelector } from "react-redux";
import { allUser } from "../store/actions/AssetActions";


export default function PlaceOrder() {
    const [userId, setUserId] = useState("");
    const [toWId, setToWId] = useState("");
    const [frmWId, setFrmWId] = useState("");
    const [orderAssetQuantity, setOrderAssetQuantity] = useState([{ assetId: '', assetQuantity: '' }]);
    const [formErrors, setFormErrors] = useState({});

    const users = useSelector(state => state.assetReducer.users);

    const warehouse = useSelector(state => state.assetReducer.warehouse);

    const assets = useSelector(state => state.assetReducer.assets);

    const newOrder = useSelector(state => state.assetReducer.newOrder);

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
            alert("Order Successfully placed with id: " + newOrder.orderId);
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
        <div className='container'>
            <h5>Place Order</h5>
            <div class="form-group">
                <div class="row-xs-2">
                    <label>UserID</label>&nbsp;&nbsp;
                    <select className="form-control" onChange={e => setUserId(e.target.value)}>
                        <option>----Select----</option>
                        {
                            users.map(u => (
                                <option name='userId'>{u.userId}</option>
                            ))}
                    </select>
                </div>
                <div class="form-group">
                    <label>From Warehouse Id</label>&nbsp;&nbsp;
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
                    <label>To Warehouse Id</label>&nbsp;&nbsp;
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
                                    <label>Asset Id</label>&nbsp;&nbsp;
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
                                    <label htmlFor='assetQuantity'>Asset Quantity</label>
                                    <input className="form-control" type='text' placeholder='Asset Quantity' value={orderAssetQuantity.assetQuantity} name='assetQuantity' onChange={e => handleChange(e, i)} />
                                    {
                                        formErrors.assetQuantityError &&
                                        <div style={{ color: 'red' }}>{formErrors.assetQuantityError}</div>
                                    }
                                </div>
                                {
                                    orderAssetQuantity.length !== 1 &&
                                    <div className='form-group'>
                                        <button className='btn btn-danger' type="button" onClick={handleRemove} >Remove</button> &nbsp;&nbsp;
                                    </div>
                                }
                                {
                                    orderAssetQuantity.length - 1 == i &&
                                    <div className='form-group'>
                                        <button className='btn btn-primary' type="button" onClick={addMoreItem} >Add Item</button> &nbsp;&nbsp;
                                    </div>
                                }
                                <button onClick={handleSubmit} className='btn btn-success'>Order</button> <br /><br />

                            </div>
                        );
                    })}
            </div>

        </div>
    )
}