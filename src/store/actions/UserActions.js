import axios from "axios"

export function allUser() {
    return (dispatch) => {
        return axios.get("http://localhost:8080/user/all").then(resp =>
            dispatch({
                type: 'user/all',
                payload: resp.data
            }))
    }
}