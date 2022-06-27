import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { allWarehouse } from '../store/actions/WarehouseActions';

export default function FetchAllWarehouse() {
    const warehouse = useSelector(state => state.assetReducer.warehouse);

    const dispatch = useDispatch();

    const myFunction = () => {
        dispatch(allWarehouse());
    };

    useEffect(() => {
        myFunction()
    }, []);

    return (
        <div>
            {
                warehouse.map(w =>
                    <div>
                        <p>{w.warehouseId}</p>
                        <p>{w.warehouseName}</p>
                    </div>
                )
            }
        </div>
    )
}