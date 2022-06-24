import logo from './logo.svg';
import './App.css';
import { SaveOrder } from './store/actions/AssetActions';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import PlaceOrder from './component/PlaceOrder';
import UserFetchAll from './component/UserFetchAll';
import FetchAllWarehouse from './component/FetchAllWarehouse';
import AssetFetchAll from './component/AssetFetchAll';
import FetchAllOrder from './component/FetchAllOrder';
import OrderAll from './component/OrderAll';
import OrderById from './component/OrderById';

function App() {
 
  return (
    <div className="App">
     <Router>
        <Routes>
          <Route path="/order/save" element={<PlaceOrder/>}/>
          <Route path="/user/all" element={<UserFetchAll/>}/>
          <Route path="/warehouse/all" element={<FetchAllWarehouse/>}/>
          <Route path="/asset/all" element={<AssetFetchAll/>}/>
          <Route path="/order/all" element={<FetchAllOrder/>}/>
          <Route path="/order" element={<OrderAll/>}/>
          <Route path="/order/byId/:id" element={<OrderById/>}/>
        </Routes>
      </Router> 
       {/* <UserFetchAll/> */}
      {/* <OrderById/> */}
    </div>
  );
}

export default App;
