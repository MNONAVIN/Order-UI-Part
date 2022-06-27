import axios from "axios";
import {BASE_URL} from '../store/actions/ActionConstants';

export function saveOrder(order){
    return axios.post(BASE_URL+"/order/save",order);
}

export function getOrderById(id){
    return axios.get(BASE_URL+"/order/getById/"+id);
}

export function allOrders(){
    return axios.get(BASE_URL+"/order/getAll");
}

export function cancelOrder(id){
    return axios.delete(BASE_URL+"/order/cancel/"+id);
}
