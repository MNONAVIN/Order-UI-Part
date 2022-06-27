import axios from "axios"

export function allAsset(){
    return(dispatch)=>{
        return axios.get("http://localhost:8080/asset/all").then(resp=>
        dispatch({
            type:'asset/all',
            payload:resp.data
        }))
    }
}