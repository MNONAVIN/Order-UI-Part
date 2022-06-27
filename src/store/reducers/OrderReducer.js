import { ORDER_ALL,ORDER_BY_ID,ORDER_DELETE,ORDER_SAVE } from "../actions/ActionConstants"

const initialState = {
    newOrder: null,
    users: [],
    warehouse: [],
    assets: [],
    orders: [],
    order: null,
    product: null
}

export default function OrderReducer(state = initialState, action) {
    if (action.type === ORDER_SAVE) {
        return ({
            ...state,
            newOrder: action.payload
        })
    }
    if (action.type === 'user/all') {
        return ({
            ...state,
            users: action.payload
        })
    }
    if (action.type == 'warehouse/all') {
        return ({
            ...state,
            warehouse: action.payload
        })
    }
    if (action.type == 'asset/all') {
        return ({
            ...state,
            assets: action.payload
        })
    }
    if (action.type == ORDER_ALL) {
        return ({
            ...state,
            orders: action.payload
        })
    }
    if (action.type == ORDER_BY_ID) {
        console.log(action.payload);
        return ({
            ...state,
            order: action.payload
        })
    }
    if (action.type == ORDER_DELETE) {
        return ({
            ...state,
            order: action.payload
        })
    }
    else {
        return state;
    }
}