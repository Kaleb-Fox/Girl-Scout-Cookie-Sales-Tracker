import Nav from './assets/comps/nav'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './assets/comps/home'
import Girlscouts from './assets/comps/girlscoutcookies'
import Sales from './assets/comps/sales'
import Inventory from './assets/comps/inventory'
import Locations from './assets/comps/locations'
function App() {

  return (
        <Router>
          <Nav/>
          <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path='/scouts' element={<Girlscouts/>}></Route>
          <Route path='/sales' element={<Sales/>}></Route>
          <Route path='/inventory' element={<Inventory/>}></Route>
          <Route path='/locations' element={<Locations/>}></Route>
          </Routes>
        </Router>
        
        
      
  )
}

export default App
