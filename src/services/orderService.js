import axios from "axios";
import {BASE_URL} from '../store/actions/ActionConstants';

export function saveOrder(order){
    return axios.post(BASE_URL+"/order/save",order);
}