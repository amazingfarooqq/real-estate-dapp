import './App.css';

import { Home } from './home/Home';
import { Contact } from './Contact/Contact';
import { Buy } from './buy/Buy';
import { Sell } from './sell/Sell';
import { DetailsOfPropery } from './subComponents/DetailsOfPropery';
import { Route, Routes } from 'react-router-dom';
import { MarketPlans } from './subComponents/MarketPlans';
import { About } from './about/About';
import { Register } from './register/Register';
import { Login } from './login/Login';
import { Dashboard } from './dashboard/Dashboard';

function App() {

  return (
    <div> 
         <Routes>
            {/* <Route path="/dashboardpractise" element={<Dashboard />} /> */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="buy" element={<Buy />} />
            <Route path="sell" element={<Sell />} />
            <Route path="about" element={<About />}/>
            <Route path='properyDetails' element={<DetailsOfPropery />}/>
            <Route path="marketplans" element={<MarketPlans />}/>
            <Route path="register" element={<Register />}/>
            <Route path="login" element={<Login />}/>
        </Routes>
    </div>
  );
}

export default App;
