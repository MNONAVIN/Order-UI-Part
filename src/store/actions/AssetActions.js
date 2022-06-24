import axios from 'axios';
import { saveOrder } from '../../services/orderService';

export function makeOrder(order) {
    return (dispatch) => {
        return saveOrder(order).then(resp =>
            dispatch({
                type: 'order/save',
                payload: resp.data
            }))
    }
}

export function allUser() {
    return (dispatch) => {
        return axios.get("http://localhost:8080/user/all").then(resp =>
            dispatch({
                type: 'user/all',
                payload: resp.data
            }))
    }
}

export function allWarehouse() {
    return (dispatch) => {
        return axios.get("http://localhost:8080/warehouse/all").then(resp =>
            dispatch({
                type: 'warehouse/all',
                payload: resp.data
            }))
    }
}

export function allAsset(){
    return(dispatch)=>{
        return axios.get("http://localhost:8080/asset/all").then(resp=>
        dispatch({
            type:'asset/all',
            payload:resp.data
        }))
    }
}

export function fetchAllOrder(){
    return(dispatch)=>{
        return axios.get("http://localhost:8080/order/getAll").then(resp=>
        dispatch({
            type:'order/all',
            payload:resp.data
        }))
    }
}

export function byId(id){
    return(dispatch)=>{
        return axios.get("http://localhost:8080/order/getById/"+id).then(resp=>
        dispatch({
            type:'order/byId',
            payload:resp.data
        }))
    }
}