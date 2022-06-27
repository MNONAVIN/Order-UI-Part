import { allOrders, cancelOrder, getOrderById, saveOrder } from '../../services/OrderService';
import { ORDER_SAVE, ORDER_BY_ID, ORDER_ALL, ORDER_DELETE, } from './ActionConstants';

export function makeOrder(order) {
    return (dispatch) => {
        return saveOrder(order).then(
            resp => {
                dispatch(makeOrderSuccess(resp.data));
            }
        )
    }
}

export function makeOrderSuccess(data) {
    return {
        type: ORDER_SAVE,
        payload: data
    }
}

export function fetchAllOrder() {
    return (dispatch) => {
        return allOrders().then(
            resp => {
                dispatch(fetchAllOrderSuccess(resp.data))
            }
        )
    }

}

export function fetchAllOrderSuccess(data) {
    return {
        type: ORDER_ALL,
        payload: data
    }
}

export function byId(id) {
    return (dispatch) => {
        return getOrderById(id).then(resp =>{
            dispatch(byIdSuccess(resp.data))
        }
        )
    }
}

export function byIdSuccess(data){
    return{
        type:ORDER_BY_ID,
        payload:data
    }
}

export function cancelMovement(id) {
    return (dispatch) => {
        return cancelOrder(id).then(resp =>{
            dispatch(cancelMovementSuccess(resp.data))})
    }
}

export function cancelMovementSuccess(data){
    return{
        type: ORDER_DELETE,
        payload:data
    }
}