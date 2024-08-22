import Nav from './assets/comps/nav'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './assets/comps/home'
import Girlscouts from './assets/comps/girlscoutcookies'
import Sales from './assets/comps/sales'
import Locations from './assets/comps/locations'
import FlavorsPage from './assets/comps/inventoryComps/flavorsPage'
import ScoutsPage from './assets/comps/inventoryComps/scoutsPage' 
import SignUp from './assets/sessions/signUp.jsx'
import Blog from './assets/comps/HomePage/Blog.tsx'
import Combineall from './assets/comps/inventoryComps/combineall'
function App() {
  
  return (
        <Router>
          <Nav/>
          <Routes>
          <Route path="/" element={<Blog/>}></Route>
          <Route path='/cookies' element={<Girlscouts/>}></Route>
          <Route path='/sales' element={<Sales/>}></Route>
          <Route path='/locations' element={<Locations/>}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/create' element={<Combineall />}></Route>
          </Routes>
        </Router>
        
        
      
  )
}

export default App
