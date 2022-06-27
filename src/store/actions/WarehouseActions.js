import axios from "axios";
export function allWarehouse() {
    return (dispatch) => {
        return axios.get("http://localhost:8080/warehouse/all").then(resp =>
            dispatch({
                type: 'warehouse/all',
                payload: resp.data
            }))
    }
}
