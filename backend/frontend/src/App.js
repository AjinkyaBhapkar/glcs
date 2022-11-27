import './App.css';
import HomePage from './pages/HomePage';
import {Routes,Route} from 'react-router-dom'
import Charts from './pages/Charts';
import Contact from './pages/Contact';
import Charts2 from './pages/Charts2';
import Rvol from './pages/Rvol';
function App() {
  return (
    <>
    <Routes>

      <Route exact path='/' element={<HomePage />}/>
      <Route exact path='/charts' element={<Charts />}/>
      <Route exact path='/charts2' element={<Charts2 />}/>
      <Route exact path='/rvol' element={<Rvol />}/>
      <Route exact path='/contact' element={<Contact />}/>
      

    </Routes>
    </>
  );
}

export default App;
