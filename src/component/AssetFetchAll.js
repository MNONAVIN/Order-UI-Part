import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allAsset } from "../store/actions/AssetActions";

export default function AssetFetchAll() {
    const asset = useSelector(state => state.orderReducer.assets);

    const dispatch = useDispatch();

    const fetchAllAsset = () => {
        dispatch(allAsset());
    };

    useEffect(() => {
        fetchAllAsset()
    }, []);

    return (
        <div>
            {
                asset.map(a =>
                    <div>
                        <p>{a.assetId}</p>
                        <p>{a.assetName}</p>
                    </div>
                )
            }
        </div>
    )
}