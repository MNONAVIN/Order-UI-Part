import React from "react";
import {Link} from 'react-router-dom';

function OrderAll(){
    return(
        <div>
            <Link to="/order/all">My Orders</Link> &nbsp;&nbsp;
            <Link to="/order/save">Place Order</Link>
        </div>
    )
}
export default OrderAll;