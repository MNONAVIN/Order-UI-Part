import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUser } from "../store/actions/AssetActions";
import { Link } from 'react-router-dom';

function UserFetchAll() {
    const users = useSelector(state => state.assetReducer.users);

    const dispatch = useDispatch();

    const myFunction = () => {
        dispatch(allUser());
    };

    useEffect(() => {
        myFunction()
    }, []);

    return (
        <div>
            <div className="container-fluid" >
                <div className="row" >
                    {
                        users.map(u =>
                            <div className="col-sm-4"  >
                                <Link to={`/user/find/${u.userId}`}>
                                    <div className="card" style={{ width: "150px", height: "280px" }}>
                                        <div className="card-body" >
                                            <h4 className="card-title">{u.userName}</h4>
                                            <p className="card-text">{u.userPosition}</p>
                                            <p>{u.userId}</p>
                                            <p>{u.mobileNumber}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default UserFetchAll;